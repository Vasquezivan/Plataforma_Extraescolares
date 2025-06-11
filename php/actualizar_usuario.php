<?php
// Configuración de cabecera para recibir y devolver JSON
header('Content-Type: application/json');

// Obtener los datos enviados por POST en formato JSON
$datos = json_decode(file_get_contents('php://input'), true);

// Verificar si se recibieron los datos correctamente
if (!$datos) {
    echo json_encode([
        'success' => false,
        'message' => 'No se recibieron datos'
    ]);
    exit();
}

// Verificar que todos los campos obligatorios estén presentes, incluyendo el ID del usuario
$camposRequeridos = ['id_usuario', 'nombre', 'contraseña', 'rol', 'unidad_academica', 'contacto'];
foreach ($camposRequeridos as $campo) {
    if (!isset($datos[$campo]) || empty($datos[$campo])) {
        echo json_encode([
            'success' => false,
            'message' => "Campo requerido no proporcionado: {$campo}"
        ]);
        exit();
    }
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

// Limpiar y validar los datos
$id_usuario = $conn->real_escape_string($datos['id_usuario']);
$nombre = $conn->real_escape_string($datos['nombre']);
$contraseña = $conn->real_escape_string($datos['contraseña']);
$rol = $conn->real_escape_string($datos['rol']);
$unidad_academica = $conn->real_escape_string($datos['unidad_academica']);
$contacto = $conn->real_escape_string($datos['contacto']);

// Verificar que el rol sea uno de los valores permitidos
if ($rol !== 'Administrador' && $rol !== 'Coordinador') {
    echo json_encode([
        'success' => false,
        'message' => 'El rol debe ser Administrador o Coordinador'
    ]);
    exit();
}

// Preparar la consulta SQL para actualizar el usuario
$sql = "UPDATE usuarios SET nombre = ?, contraseña = ?, rol = ?, unidad_academica = ?, contacto = ? WHERE id_usuario = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode([
        'success' => false,
        'message' => 'Error al preparar la consulta: ' . $conn->error
    ]);
    exit();
}

// Vincular los parámetros y ejecutar la consulta
$stmt->bind_param("sssssi", $nombre, $contraseña, $rol, $unidad_academica, $contacto, $id_usuario);

// Ejecutar la consulta
if ($stmt->execute()) {
    // Verificar si se actualizó algún registro
    if ($stmt->affected_rows > 0) {
        echo json_encode([
            'success' => true,
            'message' => 'Usuario actualizado correctamente',
            'id_usuario' => $id_usuario,
            'nombre' => $nombre,
            'rol' => $rol,
            'unidad_academica' => $unidad_academica,
            'contacto' => $contacto
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
        'message' => 'Error al actualizar el usuario: ' . $stmt->error
    ]);
}

// Cerrar la conexión
$stmt->close();
$conn->close();
?>