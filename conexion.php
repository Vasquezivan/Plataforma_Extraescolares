<?php
$servername = "localhost";
$username = "root"; // Usualmente 'root' en entornos de desarrollo
$password = ""; 
$dbname = "alumnos";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode([
        'success' => false,
        'message' => "Conexión fallida: " . $conn->connect_error
    ]));
}

$conn->set_charset("utf8mb4"); // Mejor soporte para caracteres especiales
?>