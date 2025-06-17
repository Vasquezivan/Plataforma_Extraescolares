<?php
header('Content-Type: application/json');
require_once 'conexion.php'; // Asegúrate de usar require_once

$response = ['success' => false, 'message' => ''];

// Verificar método POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response['message'] = 'Método no permitido';
    echo json_encode($response);
    exit;
}

// Obtener y validar datos
$id_alumno = filter_input(INPUT_POST, 'id_alumno', FILTER_VALIDATE_INT);
$nombre = filter_input(INPUT_POST, 'nombre', FILTER_SANITIZE_STRING);
$numero_control = filter_input(INPUT_POST, 'numero_control', FILTER_SANITIZE_STRING);
$carrera = filter_input(INPUT_POST, 'carrera', FILTER_SANITIZE_STRING);
$semestre = filter_input(INPUT_POST, 'semestre', FILTER_SANITIZE_STRING);

// Validaciones adicionales
if (!$id_alumno || !$nombre || !$numero_control || !$carrera || !$semestre) {
    $response['message'] = 'Datos incompletos o inválidos';
    echo json_encode($response);
    exit;
}

try {
    // Preparar consulta
    $stmt = $conn->prepare("UPDATE alumnos SET 
                          nombre = ?, 
                          numero_control = ?, 
                          carrera = ?, 
                          semestre = ? 
                          WHERE id_alumno = ?");
    
    if (!$stmt) {
        throw new Exception("Error en preparación: " . $conn->error);
    }

    $stmt->bind_param("ssssi", $nombre, $numero_control, $carrera, $semestre, $id_alumno);

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            $response['success'] = true;
            $response['message'] = 'Registro actualizado correctamente';
        } else {
            $response['message'] = 'No se realizaron cambios (¿el ID existe?)';
        }
    } else {
        throw new Exception("Error en ejecución: " . $stmt->error);
    }
    
    $stmt->close();
} catch (Exception $e) {
    $response['message'] = 'Error: ' . $e->getMessage();
    error_log($e->getMessage()); // Registrar error en logs
}

$conn->close();
echo json_encode($response);
?>