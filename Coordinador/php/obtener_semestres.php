<?php
header('Content-Type: application/json');
require_once 'Database.php';

try {
    $db = new Database();
    $conn = $db->getConnection();

    if (!$conn) {
        throw new Exception('No se pudo establecer conexión con la base de datos');
    }

    // Asegurar zona horaria
    date_default_timezone_set('America/Mexico_City');

    // Detectar columna primaria para ordenar (id_semestre o id)
    $orderBy = 'fecha_creacion';
    $cols = [];
    try {
        $colsStmt = $conn->prepare("SHOW COLUMNS FROM semestres");
        $colsStmt->execute();
        $cols = array_map(function($c){ return $c['Field']; }, $colsStmt->fetchAll(PDO::FETCH_ASSOC));
        if (in_array('id_semestre', $cols)) $orderBy = 'id_semestre';
        elseif (in_array('id', $cols)) $orderBy = 'id';
    } catch (PDOException $e) {
        // Mantener fecha_creacion si algo falla
        $orderBy = 'fecha_creacion';
    }

    // Construir filtro opcional por unidad (si la columna existe)
    $filterSql = '';
    $filterParams = [];
    if (isset($_GET['unidad']) && $_GET['unidad'] !== '') {
        // Posibles nombres de columna donde podría almacenarse la unidad
        $possibleCols = ['unidad', 'id_unidad', 'unidad_academica', 'unidad_nombre'];
        $found = null;
        foreach ($possibleCols as $pc) {
            if (in_array($pc, $cols)) { $found = $pc; break; }
        }
        if ($found) {
            $filterSql = " WHERE $found = :unidad";
            $filterParams[':unidad'] = $_GET['unidad'];
        }
    }

    $query = "SELECT id_semestre, nombre, DATE_FORMAT(fecha_inicio, '%Y-%m-%d') as fecha_inicio, 
              DATE_FORMAT(fecha_fin, '%Y-%m-%d') as fecha_fin, fecha_creacion 
              FROM semestres" . $filterSql . " ORDER BY " . $orderBy . " DESC";

    $stmt = $conn->prepare($query);
    // Vincular parámetros de filtro si existen
    foreach ($filterParams as $k => $v) {
        $stmt->bindValue($k, $v);
    }
    $stmt->execute();

    $semestres = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Agregar información adicional para cada semestre (alumnos, actividades)
    foreach ($semestres as &$semestre) {
        $semestre['id'] = isset($semestre['id_semestre']) ? (string)$semestre['id_semestre'] : (isset($semestre['id']) ? (string)$semestre['id'] : null);
        if (isset($semestre['id_semestre'])) unset($semestre['id_semestre']);

        try {
            $queryAlumnos = "SELECT COUNT(DISTINCT id_alumno) as total_alumnos FROM inscripciones WHERE id_semestre = :id";
            $stmtAlumnos = $conn->prepare($queryAlumnos);
            $stmtAlumnos->bindParam(':id', $semestre['id']);
            $stmtAlumnos->execute();
            $totalAlumnos = $stmtAlumnos->fetch(PDO::FETCH_ASSOC)['total_alumnos'];
        } catch (PDOException $e) {
            $totalAlumnos = 0;
        }

        try {
            $queryActividades = "SELECT COUNT(DISTINCT id) as total_actividades FROM actividades WHERE id_semestre = :id";
            $stmtActividades = $conn->prepare($queryActividades);
            $stmtActividades->bindParam(':id', $semestre['id']);
            $stmtActividades->execute();
            $totalActividades = $stmtActividades->fetch(PDO::FETCH_ASSOC)['total_actividades'];
        } catch (PDOException $e) {
            $totalActividades = 0;
        }

        $semestre['alumnos'] = (int)$totalAlumnos;
        $semestre['actividades'] = (int)$totalActividades;
        $semestre['estado'] = 'activo';

        // Formatear fechas para el frontend
        $semestre['fechaInicio'] = isset($semestre['fecha_inicio']) ? $semestre['fecha_inicio'] : null;
        $semestre['fechaFin'] = isset($semestre['fecha_fin']) ? $semestre['fecha_fin'] : null;
        if (isset($semestre['fecha_inicio'])) unset($semestre['fecha_inicio']);
        if (isset($semestre['fecha_fin'])) unset($semestre['fecha_fin']);
    }

    $debug = isset($_GET['debug']) && $_GET['debug'] == '1';
    if ($debug) {
        echo json_encode(['success' => true, 'data' => $semestres, 'debug_order_by' => $orderBy]);
    } else {
        echo json_encode(['success' => true, 'data' => $semestres]);
    }

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error al obtener los semestres: ' . $e->getMessage()]);
}
?>
