<?php
// Incluir archivo de conexión
require_once 'conexion.php';

// Iniciar sesión si no está iniciada
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Recibir datos en formato JSON
$datos = json_decode(file_get_contents('php://input'), true);

// Verificar que se recibieron los datos necesarios
if (!isset($datos['id_usuario']) || !isset($datos['nombre']) || !isset($datos['contacto']) || 
    !isset($datos['unidad_academica']) || !isset($datos['rol'])) {
    echo json_encode(["success" => false, "message" => "Faltan datos requeridos"]);
    exit;
}

// Verificar si la columna contraseña_texto existe
try {
    $checkColumn = $conn->query("SHOW COLUMNS FROM usuarios LIKE 'contraseña_texto'");
    if ($checkColumn->num_rows == 0) {
        // La columna no existe, la creamos y copiamos los datos de contraseña
        $conn->query("ALTER TABLE usuarios ADD contraseña_texto VARCHAR(255) AFTER contraseña");
        // Copiar los datos existentes de contraseña a contraseña_texto
        $conn->query("UPDATE usuarios SET contraseña_texto = contraseña");
    }
} catch (Exception $e) {
    // Ignorar errores y continuar
}

// Variable para almacenar la consulta SQL
$sql = "";
$stmt = null;

// Verificar si se proporcionó una contraseña nueva
if (isset($datos['contraseña']) && !empty($datos['contraseña']) && !str_contains($datos['contraseña'], '$2y$10$')) {
    // Usar la contraseña en texto plano
    $contrasena_texto_plano = $datos['contraseña'];
    
    // Preparar la consulta SQL para actualizar el usuario incluyendo la contraseña
    $sql = "UPDATE usuarios SET nombre = ?, contacto = ?, contraseña = ?, contraseña_texto = ?, unidad_academica = ?, rol = ? WHERE id_usuario = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssi", $datos['nombre'], $datos['contacto'], $contrasena_texto_plano, $contrasena_texto_plano, $datos['unidad_academica'], $datos['rol'], $datos['id_usuario']);
} else {
    // Preparar la consulta SQL para actualizar el usuario sin cambiar la contraseña
    $sql = "UPDATE usuarios SET nombre = ?, contacto = ?, unidad_academica = ?, rol = ? WHERE id_usuario = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssi", $datos['nombre'], $datos['contacto'], $datos['unidad_academica'], $datos['rol'], $datos['id_usuario']);
}

// Ejecutar la consulta
if ($stmt->execute()) {
    // Usuario actualizado con éxito
    echo json_encode(["success" => true, "message" => "Usuario actualizado con éxito"]);
} else {
    // Error al actualizar el usuario
    echo json_encode(["success" => false, "message" => "Error al actualizar el usuario: " . $stmt->error]);
}

// Cerrar la sentencia y la conexión
$stmt->close();
$conn->close();
?>