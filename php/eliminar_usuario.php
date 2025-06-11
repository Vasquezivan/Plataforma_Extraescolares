<?php
// Configuración de cabecera para recibir y devolver JSON
header('Content-Type: application/json');

// Obtener los datos enviados por POST en formato JSON
$datos = json_decode(file_get_contents('php://input'), true);

// Verificar si se recibieron los datos correctamente
if (!$datos || !isset($datos['id_usuario'])) {
    echo json_encode([
        'success' => false,
        'message' => 'ID de usuario no proporcionado'
    ]);
    exit();
}

// Conexión a la base de datos
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "extraescolares";

$conn = new mysqli($host, $user, $pass, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    echo json_encode([
        'success' => false,
        'message' => 'Error de conexión a la base de datos: ' . $conn->connect_error
    ]);
    exit();
}

// Limpiar y validar el ID
$id_usuario = $conn->real_escape_string($datos['id_usuario']);

// Preparar la consulta SQL para eliminar el usuario
$sql = "DELETE FROM usuarios WHERE id_usuario = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode([
        'success' => false,
        'message' => 'Error al preparar la consulta: ' . $conn->error
    ]);
    exit();
}

// Vincular los parámetros y ejecutar la consulta
$stmt->bind_param("i", $id_usuario);

// Ejecutar la consulta
if ($stmt->execute()) {
    // Verificar si se eliminó algún registro
    if ($stmt->affected_rows > 0) {
        echo json_encode([
            'success' => true,
            'message' => 'Usuario eliminado correctamente'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'No se encontró el usuario con ID: ' . $id_usuario
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Error al eliminar el usuario: ' . $stmt->error
    ]);
}

// Cerrar la conexión
$stmt->close();
$conn->close();
?>