<?php
header('Content-Type: application/json');
require_once 'Database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

try {
    $data = json_decode(file_get_contents('php://input'), true);

    // Obtener el ID (aceptamos id_semestre o id)
    $idInput = null;
    if (isset($data['id_semestre'])) $idInput = $data['id_semestre'];
    elseif (isset($data['id'])) $idInput = $data['id'];

    if (empty($idInput)) {
        echo json_encode(['success' => false, 'message' => 'ID de semestre no proporcionado']);
        exit;
    }

    $db = new Database();
    $conn = $db->getConnection();

    // Detectar el nombre de la columna primaria en la tabla 'semestres'
    $pkColumn = null;
    try {
        $colsStmt = $conn->prepare("SHOW COLUMNS FROM semestres");
        $colsStmt->execute();
        $columns = $colsStmt->fetchAll(PDO::FETCH_ASSOC);
        $colNames = array_map(function($c){ return $c['Field']; }, $columns);
        if (in_array('id_semestre', $colNames)) $pkColumn = 'id_semestre';
        elseif (in_array('id', $colNames)) $pkColumn = 'id';
        else $pkColumn = $colNames[0]; // fallback al primer campo
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error al inspeccionar la tabla semestres: ' . $e->getMessage()]);
        exit;
    }

    // Preparar consultas usando la columna detectada
    // Detectar columna FK en tablas relacionadas (actividades, inscripciones)
    $fkCandidates = ['id_semestre', 'semestre_id', 'id'];
    $actividadFK = null;
    $inscripcionFK = null;
    try {
        // Actividades
        $colsActStmt = $conn->prepare("SHOW COLUMNS FROM actividades");
        $colsActStmt->execute();
        $colsAct = array_map(function($c){ return $c['Field']; }, $colsActStmt->fetchAll(PDO::FETCH_ASSOC));
        foreach ($fkCandidates as $cand) { if (in_array($cand, $colsAct)) { $actividadFK = $cand; break; } }

        // Inscripciones
        $colsInsStmt = $conn->prepare("SHOW COLUMNS FROM inscripciones");
        $colsInsStmt->execute();
        $colsIns = array_map(function($c){ return $c['Field']; }, $colsInsStmt->fetchAll(PDO::FETCH_ASSOC));
        foreach ($fkCandidates as $cand) { if (in_array($cand, $colsIns)) { $inscripcionFK = $cand; break; } }
    } catch (PDOException $e) {
        // Si alguna tabla no existe o hay error, asumimos 0 dependencias
        $actividadFK = null;
        $inscripcionFK = null;
    }

    // Construir subconsultas seguras (si no se detecta la FK, devolveremos 0 para evitar fallos)
    $subAct = ($actividadFK) ? "(SELECT COUNT(*) FROM actividades WHERE `".$actividadFK."` = :id)" : "0";
    $subIns = ($inscripcionFK) ? "(SELECT COUNT(*) FROM inscripciones WHERE `".$inscripcionFK."` = :id)" : "0";

    $queryCheck = "SELECT " . $subAct . " as actividades, " . $subIns . " as inscripciones";

    $stmtCheck = $conn->prepare($queryCheck);
    // bindParam solo si alguna subconsulta utiliza :id
    if ($actividadFK || $inscripcionFK) {
        $stmtCheck->bindParam(':id', $idInput);
    }
    $stmtCheck->execute();
    $result = $stmtCheck->fetch(PDO::FETCH_ASSOC);

    if ($result && ($result['actividades'] > 0 || $result['inscripciones'] > 0)) {
        echo json_encode(['success' => false, 'message' => 'No se puede eliminar el semestre porque tiene actividades o inscripciones asociadas']);
        exit;
    }

    // Si no hay registros asociados, proceder con la eliminación
    $query = "DELETE FROM semestres WHERE `" . $pkColumn . "` = :id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':id', $idInput);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Semestre eliminado exitosamente']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al eliminar el semestre']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error al eliminar el semestre: ' . $e->getMessage()]);
}
?>