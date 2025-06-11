<?php
// Incluir archivo de conexión
require_once './php/conexion.php';

// Iniciar sesión si no está iniciada
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Verificar si el usuario está autenticado
if (!isset($_SESSION['id_usuario'])) {
    echo json_encode(["success" => false, "message" => "No has iniciado sesión"]);
    exit;
}

// Verificar si se recibieron los datos del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoger los datos del formulario
    $id_usuario = $_POST['id_usuario'];
    $nombre = $_POST['nombre'];
    $contacto = $_POST['contacto'];
    $unidad_academica = $_POST['unidad_academica'];
    
    // Variable para almacenar la consulta SQL
    $sql = "";
    
    // Verificar si se proporcionó una contraseña nueva
    if (isset($_POST['contrasena']) && !empty($_POST['contrasena'])) {
        // Encriptar la nueva contraseña
        $contrasena_hash = password_hash($_POST['contrasena'], PASSWORD_DEFAULT);
        
        // Preparar la consulta SQL para actualizar el usuario incluyendo la contraseña
        $sql = "UPDATE usuarios SET nombre = ?, contacto = ?, contraseña = ?, unidad_academica = ? WHERE id_usuario = ?";
        
        // Preparar la sentencia
        if ($stmt = $conn->prepare($sql)) {
            // Vincular parámetros
            $stmt->bind_param("ssssi", $nombre, $contacto, $contrasena_hash, $unidad_academica, $id_usuario);
            
            // Ejecutar la consulta
            if ($stmt->execute()) {
                // Usuario actualizado con éxito
                echo json_encode(["success" => true, "message" => "Usuario actualizado con éxito"]);
            } else {
                // Error al actualizar el usuario
                echo json_encode(["success" => false, "message" => "Error al actualizar el usuario: " . $stmt->error]);
            }
        }
    } else {
        // Preparar la consulta SQL para actualizar el usuario sin cambiar la contraseña
        $sql = "UPDATE usuarios SET nombre = ?, contacto = ?, unidad_academica = ? WHERE id_usuario = ?";
        
        // Preparar la sentencia
        if ($stmt = $conn->prepare($sql)) {
            // Vincular parámetros
            $stmt->bind_param("sssi", $nombre, $contacto, $unidad_academica, $id_usuario);
            
            // Ejecutar la consulta
            if ($stmt->execute()) {
                // Usuario actualizado con éxito
                echo json_encode(["success" => true, "message" => "Usuario actualizado con éxito"]);
            } else {
                // Error al actualizar el usuario
                echo json_encode(["success" => false, "message" => "Error al actualizar el usuario: " . $stmt->error]);
            }
        }
    }
    
    // Cerrar la sentencia y la conexión
    if (isset($stmt)) {
        $stmt->close();
    }
    $conn->close();
} else {
    // Si no es una solicitud POST, devolver un mensaje de error
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
}
?>