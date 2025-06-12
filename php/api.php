<?php
die("El script api.php se está ejecutando.");
header("Content-Type: application/json"); // Indicamos que la respuesta será en formato JSON

// --- Configuración de la Base de Datos ---
$servidor = "localhost";   // Generalmente es "localhost"
$usuario = "root";         // Usuario por defecto de XAMPP/MAMP
$password = "";            // Contraseña por defecto de XAMPP/MAMP (usualmente vacía)
$basededatos = "Plataforma_Extraescolares"; // El nombre que le diste en phpMyAdmin

// Crear la conexión
$conexion = new mysqli($servidor, $usuario, $password, $basededatos);

// Verificar la conexión
if ($conexion->connect_error) {
    die(json_encode(["exito" => false, "mensaje" => "Error de conexión: " . $conexion->connect_error]));
}

// Obtener los datos enviados desde el JavaScript
$datos = json_decode(file_get_contents("php://input"), true);

// Validar que los datos necesarios existan
if (!isset($datos['numeroControl']) || !isset($datos['nombre'])) {
    die(json_encode(["exito" => false, "mensaje" => "Datos incompletos."]));
}

// --- Preparar la consulta para evitar Inyección SQL (¡MUY IMPORTANTE!) ---
$sql = "INSERT INTO alumnos (numero_control, nombre_completo, carrera, semestre, correo_electronico, actividad) VALUES (?, ?, ?, ?, ?, ?)";

$stmt = $conexion->prepare($sql);

if ($stmt === false) {
    die(json_encode(["exito" => false, "mensaje" => "Error al preparar la consulta: " . $conexion->error]));
}

// Vincular los parámetros
$stmt->bind_param(
    "sssiis", // s = string, i = integer
    $datos['numeroControl'],
    $datos['nombre'],
    $datos['carrera'],
    $datos['semestre'],
    $datos['correo'],
    $datos['actividad']
);

// Ejecutar la consulta
if ($stmt->execute()) {
    echo json_encode(["exito" => true, "mensaje" => "Alumno registrado con éxito."]);
} else {
    echo json_encode(["exito" => false, "mensaje" => "Error al registrar el alumno: " . $stmt->error]);
}

// Cerrar la conexión
$stmt->close();
$conexion->close();

?>