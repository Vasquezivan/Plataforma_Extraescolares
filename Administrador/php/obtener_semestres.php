<?php
header('Content-Type: application/json');
require_once 'Database.php';

try {
    $db = new Database();
    $conn = $db->getConnection();

    // Establecer la zona horaria para asegurar consistencia
    date_default_timezone_set('America/Mexico_City');
    
    // Detectar columna primaria para ordenar (id_semestre o id)
    $orderBy = 'fecha_creacion';
    try {
        $colsStmt = $conn->prepare("SHOW COLUMNS FROM semestres");
        $colsStmt->execute();
        $cols = array_map(function($c){ return $c['Field']; }, $colsStmt->fetchAll(PDO::FETCH_ASSOC));
        if (in_array('id_semestre', $cols)) $orderBy = 'id_semestre';
        elseif (in_array('id', $cols)) $orderBy = 'id';
    } catch (PDOException $e) {
        // Si falla, usamos fecha_creacion
        $orderBy = 'fecha_creacion';
    }

    $query = "SELECT id_semestre, nombre, DATE_FORMAT(fecha_inicio, '%Y-%m-%d') as fecha_inicio, 
              DATE_FORMAT(fecha_fin, '%Y-%m-%d') as fecha_fin, fecha_creacion 
              FROM semestres ORDER BY " . $orderBy . " DESC";
    $stmt = $conn->prepare($query);
    $stmt->execute();

    $semestres = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Agregar información adicional para cada semestre
    foreach ($semestres as &$semestre) {
        // Usar id_semestre como id y convertirlo a string
        $semestre['id'] = (string)$semestre['id_semestre'];
        unset($semestre['id_semestre']);
        
        try {
            // Obtener cantidad de alumnos inscritos en el semestre
            $queryAlumnos = "SELECT COUNT(DISTINCT id_alumno) as total_alumnos FROM inscripciones WHERE id_semestre = :id";
            $stmtAlumnos = $conn->prepare($queryAlumnos);
            $stmtAlumnos->bindParam(':id', $semestre['id']);
            $stmtAlumnos->execute();
            $totalAlumnos = $stmtAlumnos->fetch(PDO::FETCH_ASSOC)['total_alumnos'];
        } catch (PDOException $e) {
            // Si hay error, asumimos que la tabla no existe o no hay registros
            $totalAlumnos = 0;
        }

        try {
            // Obtener cantidad de actividades en el semestre
            $queryActividades = "SELECT COUNT(DISTINCT id) as total_actividades FROM actividades WHERE id_semestre = :id";
            $stmtActividades = $conn->prepare($queryActividades);
            $stmtActividades->bindParam(':id', $semestre['id']);
            $stmtActividades->execute();
            $totalActividades = $stmtActividades->fetch(PDO::FETCH_ASSOC)['total_actividades'];
        } catch (PDOException $e) {
            // Si hay error, asumimos que la tabla no existe o no hay registros
            $totalActividades = 0;
        }

        // Agregar los campos necesarios para la interfaz
        $semestre['alumnos'] = (int)$totalAlumnos;
        $semestre['actividades'] = (int)$totalActividades;
        $semestre['estado'] = 'activo';
        
        // Convertir fechas al formato esperado por el frontend
        $semestre['fechaInicio'] = $semestre['fecha_inicio'];
        $semestre['fechaFin'] = $semestre['fecha_fin'];
        unset($semestre['fecha_inicio'], $semestre['fecha_fin']);
    }

    // Si se solicita modo debug, incluir información sobre el campo usado para ordenar
    $debug = isset($_GET['debug']) && $_GET['debug'] == '1';
    if ($debug) {
        echo json_encode(['success' => true, 'data' => $semestres, 'debug_order_by' => $orderBy]);
    } else {
        echo json_encode(['success' => true, 'data' => $semestres]);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error al obtener los semestres: ' . $e->getMessage()]);
}
?>
