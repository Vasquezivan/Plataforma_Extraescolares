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
if (!isset($datos['nombre']) || !isset($datos['contraseña']) || !isset($datos['rol']) || 
    !isset($datos['contacto']) || !isset($datos['unidad_academica'])) {
    echo json_encode(["success" => false, "message" => "Faltan datos requeridos"]);
    exit;
}

// Almacenar la contraseña en texto plano para usarla después
$contrasena_texto_plano = $datos['contraseña'];

// Crear una columna adicional para almacenar la contraseña en texto plano
try {
    // Verificar si la columna ya existe
    $checkColumn = $conn->query("SHOW COLUMNS FROM usuarios LIKE 'contraseña_texto'");
    if ($checkColumn->num_rows == 0) {
        // La columna no existe, la creamos
        $conn->query("ALTER TABLE usuarios ADD contraseña_texto VARCHAR(255) AFTER contraseña");
    }
} catch (Exception $e) {
    // Si hay algún error, continuamos con el flujo normal
}

// Preparar la consulta SQL para insertar el nuevo usuario
$sql = "INSERT INTO usuarios (nombre, contacto, contraseña, contraseña_texto, rol, unidad_academica) 
        VALUES (?, ?, ?, ?, ?, ?)";

// Preparar la sentencia
if ($stmt = $conn->prepare($sql)) {
    // Vincular parámetros
    $stmt->bind_param("ssssss", $datos['nombre'], $datos['contacto'], $contrasena_texto_plano, $contrasena_texto_plano, $datos['rol'], $datos['unidad_academica']);
    
    // Ejecutar la consulta
    if ($stmt->execute()) {
        // Obtener el ID del usuario recién insertado
        $id_usuario = $conn->insert_id;
        
        // Usuario registrado con éxito
        echo json_encode([
            "success" => true, 
            "message" => "Usuario registrado con éxito",
            "id_usuario" => $id_usuario
        ]);
    } else {
        // Error al registrar el usuario
        echo json_encode([
            "success" => false, 
            "message" => "Error al registrar el usuario: " . $stmt->error
        ]);
    }
    
    // Cerrar la sentencia
    $stmt->close();
} else {
    echo json_encode([
        "success" => false, 
        "message" => "Error en la preparación de la consulta: " . $conn->error
    ]);
}

// Cerrar la conexión
$conn->close();
?>