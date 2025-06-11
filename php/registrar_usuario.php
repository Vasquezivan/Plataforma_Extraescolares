<?php
// Incluir archivo de conexión
require_once './php/conexion.php';

// Verificar si se recibieron los datos del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoger los datos del formulario
    $nombre = $_POST['nombre'];
    $contacto = $_POST['contacto'];
    $contrasena = $_POST['contrasena'];
    $rol = $_POST['rol'];
    $unidad_academica = $_POST['unidad_academica'];
    
    // Encriptar la contraseña
    $contrasena_hash = password_hash($contrasena, PASSWORD_DEFAULT);
    
    // Preparar la consulta SQL para insertar el nuevo usuario
    $sql = "INSERT INTO usuarios (nombre, contacto, contraseña, rol, unidad_academica) 
            VALUES (?, ?, ?, ?, ?)";
    
    // Preparar la sentencia
    if ($stmt = $conn->prepare($sql)) {
        // Vincular parámetros
        $stmt->bind_param("sssss", $nombre, $contacto, $contrasena_hash, $rol, $unidad_academica);
        
        // Ejecutar la consulta
        if ($stmt->execute()) {
            // Usuario registrado con éxito
            echo json_encode(["success" => true, "message" => "Usuario registrado con éxito"]);
        } else {
            // Error al registrar el usuario
            echo json_encode(["success" => false, "message" => "Error al registrar el usuario: " . $stmt->error]);
        }
        
        // Cerrar la sentencia
        $stmt->close();
    } else {
        echo json_encode(["success" => false, "message" => "Error en la preparación de la consulta: " . $conn->error]);
    }
    
    // Cerrar la conexión
    $conn->close();
} else {
    // Si no es una solicitud POST, devolver un mensaje de error
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
}
?>