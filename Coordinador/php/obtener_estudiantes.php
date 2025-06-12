<?php
// filepath: php/obtener_estudiantes.php
header('Content-Type: application/json');

// Configuración de conexión (mejor usar un archivo aparte)
$host = "localhost";
$usuario = "root"; // Cambia por tus credenciales reales
$contrasena = ""; // Cambia por tu contraseña real
$basededatos = "extraescolares";

// Conexión a la base de datos
$mysqli = new mysqli($host, $usuario, $contrasena, $basededatos);

// Verificar conexión
if ($mysqli->connect_errno) {
    http_response_code(500);
    echo json_encode([
        "error" => "Error de conexión a la base de datos",
        "details" => $mysqli->connect_error
    ]);
    exit;
}

// Consulta preparada para mayor seguridad
$sql = "SELECT id, nombre, no_control, carrera, semestre, extraescolar FROM estudiantes";
$result = $mysqli->query($sql);

// Manejar errores en la consulta
if (!$result) {
    http_response_code(500);
    echo json_encode([
        "error" => "Error en la consulta SQL",
        "details" => $mysqli->error
    ]);
    exit;
}

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

// Liberar resultados y cerrar conexión
$result->free();
$mysqli->close();

// Enviar respuesta
echo json_encode(["data" => $data]);
?>