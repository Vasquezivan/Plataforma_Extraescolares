<?php
header('Content-Type: application/json');
require_once 'Database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

try {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['id_semestre']) || !isset($data['nombre']) || !isset($data['fechaInicio']) || !isset($data['fechaFin'])) {
        echo json_encode(['success' => false, 'message' => 'Faltan datos requeridos']);
        exit;
    }

    $db = new Database();
    $conn = $db->getConnection();

    $query = "UPDATE semestres SET nombre = :nombre, fecha_inicio = :fecha_inicio, fecha_fin = :fecha_fin 
              WHERE id_semestre = :id_semestre";
    
    $stmt = $conn->prepare($query);
    
    $stmt->bindParam(':id_semestre', $data['id_semestre']);
    $stmt->bindParam(':nombre', $data['nombre']);
    $stmt->bindParam(':fecha_inicio', $data['fechaInicio']);
    $stmt->bindParam(':fecha_fin', $data['fechaFin']);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Semestre actualizado exitosamente']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al actualizar el semestre']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error al actualizar el semestre: ' . $e->getMessage()]);
}
?>