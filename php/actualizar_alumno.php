<?php
header('Content-Type: application/json');
require_once 'conexion.php';

$response = array('success' => false);

$data = json_decode(file_get_contents('php://input'), true);

if(isset($data['id']) && isset($data['controlNumber']) && isset($data['name'])) {
    $id = intval($data['id']);
    $numero_control = $conn->real_escape_string($data['controlNumber']);
    $nombre = $conn->real_escape_string($data['name']);
    
    $sql = "UPDATE alumnos SET numero_control = '$numero_control', nombre = '$nombre' WHERE id_alumno = $id";
    
    if($conn->query($sql)) {
        $response['success'] = true;
        $response['message'] = 'Alumno actualizado correctamente';
    } else {
        $response['message'] = 'Error al actualizar alumno: ' . $conn->error;
    }
} else {
    $response['message'] = 'Datos incompletos';
}

echo json_encode($response);
$conn->close();
?>