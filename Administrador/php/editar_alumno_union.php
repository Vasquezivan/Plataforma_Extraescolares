<?php
require_once 'Database.php';
header('Content-Type: application/json');

if (!isset($_POST['id_alumno'], $_POST['nombre'], $_POST['numero_control'], $_POST['carrera'], $_POST['semestre'])) {
    echo json_encode(['success' => false, 'message' => 'Faltan datos']);
    exit;
}

$db = new Database();
$conn = $db->getConnection();

$id_alumno = $_POST['id_alumno'];
$nombre = $_POST['nombre'];
$numero_control = $_POST['numero_control'];
$carrera = $_POST['carrera'];
$semestre = $_POST['semestre'];

$sql = "UPDATE alumnos SET nombre = ?, numero_control = ?, carrera = ?, semestre = ? WHERE id_alumno = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$nombre, $numero_control, $carrera, $semestre, $id_alumno]);

if ($stmt->rowCount() > 0) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'No se actualizó ningún registro']);
}
?>