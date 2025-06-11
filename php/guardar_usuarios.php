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

// Verificar que todos los campos obligatorios estén presentes
$camposRequeridos = ['nombre', 'contraseña', 'rol', 'unidad_academica', 'contacto'];
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

// Preparar la consulta SQL para insertar el usuario
$sql = "INSERT INTO usuarios (nombre, contraseña, rol, unidad_academica, contacto) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode([
        'success' => false,
        'message' => 'Error al preparar la consulta: ' . $conn->error
    ]);
    exit();
}

// Vincular los parámetros y ejecutar la consulta
$stmt->bind_param("sssss", $nombre, $contraseña, $rol, $unidad_academica, $contacto);

// Ejecutar la consulta
if ($stmt->execute()) {
    // Obtener el ID del usuario recién insertado
    $id_usuario = $conn->insert_id;
    
    echo json_encode([
        'success' => true,
        'message' => 'Usuario guardado correctamente',
        'id_usuario' => $id_usuario,
        'nombre' => $nombre,
        'rol' => $rol,
        'unidad_academica' => $unidad_academica,
        'contacto' => $contacto
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Error al guardar el usuario: ' . $stmt->error
    ]);
}

// Cerrar la conexión
$stmt->close();
$conn->close();
?>