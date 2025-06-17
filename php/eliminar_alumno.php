<?php
header('Content-Type: application/json');
require_once 'conexion.php';

$response = array('success' => false);

$data = json_decode(file_get_contents('php://input'), true);

if(isset($data['id'])) {
    $id = intval($data['id']);
    
    $sql = "DELETE FROM alumnos WHERE id_alumno = $id";
    
    if($conn->query($sql)) {
        $response['success'] = true;
        $response['message'] = 'Alumno eliminado correctamente';
    } else {
        $response['message'] = 'Error al eliminar alumno: ' . $conn->error;
    }
} else {
    $response['message'] = 'ID no proporcionado';
}

echo json_encode($response);
$conn->close();
?>