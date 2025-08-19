<?php
// Administrador/php/eliminar_alumno_union.php
require_once 'Database.php';
header('Content-Type: application/json');

if (!isset($_POST['id_alumno'], $_POST['id_actividad'])) {
    echo json_encode(['success' => false, 'message' => 'Faltan datos']);
    exit;
}

$db = new Database();
$conn = $db->getConnection();

$id_alumno = $_POST['id_alumno'];
$id_actividad = $_POST['id_actividad'];

try {
    // 1. Elimina la inscripción
    $sql = "DELETE FROM inscripciones WHERE id_alumno = ? AND id_actividad = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$id_alumno, $id_actividad]);

    // 2. Elimina el alumno de la tabla alumnos
    $sql = "DELETE FROM alumnos WHERE id_alumno = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$id_alumno]);

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>