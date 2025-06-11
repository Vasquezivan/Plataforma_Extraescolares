<?php
// Incluir archivo de conexión
require_once 'conexion.php';

// Iniciar sesión si no está iniciada
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Recibir datos en formato JSON
$datos = json_decode(file_get_contents('php://input'), true);

// Verificar si se recibió el ID del usuario a eliminar
if (isset($datos['id_usuario'])) {
    // Recoger el ID del usuario
    $id_usuario = $datos['id_usuario'];
    
    // Preparar la consulta SQL para eliminar el usuario
    $sql = "DELETE FROM usuarios WHERE id_usuario = ?";
    
    // Preparar la sentencia
    if ($stmt = $conn->prepare($sql)) {
        // Vincular parámetros
        $stmt->bind_param("i", $id_usuario);
        
        // Ejecutar la consulta
        if ($stmt->execute()) {
            // Usuario eliminado con éxito
            echo json_encode(["success" => true, "message" => "Usuario eliminado con éxito"]);
        } else {
            // Error al eliminar el usuario
            echo json_encode(["success" => false, "message" => "Error al eliminar el usuario: " . $stmt->error]);
        }
        
        // Cerrar la sentencia
        $stmt->close();
    } else {
        echo json_encode(["success" => false, "message" => "Error en la preparación de la consulta: " . $conn->error]);
    }
    
    // Cerrar la conexión
    $conn->close();
} else {
    // Si no se proporcionó el ID, devolver un mensaje de error
    echo json_encode(["success" => false, "message" => "Datos incompletos: ID de usuario no proporcionado"]);
}
?>