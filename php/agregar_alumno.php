<?php
header('Content-Type: application/json');
require_once 'conexion.php';

$response = array('success' => false);

$data = json_decode(file_get_contents('php://input'), true);

if(isset($data['controlNumber']) && isset($data['name'])) {
    $numero_control = $conn->real_escape_string($data['controlNumber']);
    $nombre = $conn->real_escape_string($data['name']);
    
    // Verificar si ya existe el número de control
    $check_sql = "SELECT id_alumno FROM alumnos WHERE numero_control = '$numero_control'";
    $check_result = $conn->query($check_sql);
    
    if($check_result->num_rows > 0) {
        $response['message'] = 'Ya existe un alumno con ese número de control';
    } else {
        $sql = "INSERT INTO alumnos (numero_control, nombre) VALUES ('$numero_control', '$nombre')";
        
        if($conn->query($sql) {
            $response['success'] = true;
            $response['id'] = $conn->insert_id;
            $response['message'] = 'Alumno agregado correctamente';
        } else {
            $response['message'] = 'Error al agregar alumno: ' . $conn->error;
        }
    }
} else {
    $response['message'] = 'Datos incompletos';
}

echo json_encode($response);
$conn->close();
?>