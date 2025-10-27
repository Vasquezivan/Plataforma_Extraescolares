<?php
header('Content-Type: application/json');
require_once 'Database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

try {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['nombre']) || !isset($data['fechaInicio']) || !isset($data['fechaFin'])) {
        echo json_encode(['success' => false, 'message' => 'Faltan datos requeridos']);
        exit;
    }

    $db = new Database();
    $conn = $db->getConnection();

    // La fecha_creacion se establecerá automáticamente por MySQL
    $query = "INSERT INTO semestres (nombre, fecha_inicio, fecha_fin) VALUES (:nombre, :fecha_inicio, :fecha_fin)";
    $stmt = $conn->prepare($query);

    $stmt->bindParam(':nombre', $data['nombre']);
    $stmt->bindParam(':fecha_inicio', $data['fechaInicio']);
    $stmt->bindParam(':fecha_fin', $data['fechaFin']);

    if ($stmt->execute()) {
        $id_semestre = $conn->lastInsertId();
        echo json_encode(['success' => true, 'message' => 'Semestre creado exitosamente', 'id' => $id_semestre]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al crear el semestre']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error al crear el semestre: ' . $e->getMessage()]);
}
?>
