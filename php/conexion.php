<?php
// Parámetros de conexión a la base de datos
$servidor = "localhost";
$usuario = "root";
$password = "";
$basedatos = "extraescolares";

// Crear la conexión
$conn = new mysqli($servidor, $usuario, $password, $basedatos);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Establecer juego de caracteres UTF-8
$conn->set_charset("utf8");

// Opcional: establecer zona horaria
date_default_timezone_set('America/Mexico_City');

// Nota: No cerrar la conexión aquí, se cerrará en cada archivo que la use
?>