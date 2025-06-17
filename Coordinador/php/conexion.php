<?php
// Configuración de la conexión a la base de datos
$servername = "localhost";  // Servidor de la base de datos
$username = "root";   // Nombre de usuario de MySQL
$password = ""; // Contraseña de MySQL
$database = "extraescolares"; // Nombre de la base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $database);

// Verificar conexión
if ($conn->connect_error) {
    // Si hay error en la conexión, mostrar mensaje y terminar ejecución
    die("Error de conexión: " . $conn->connect_error);
}

// Configurar el conjunto de caracteres a utf8 (opcional pero recomendado)
$conn->set_charset("utf8");

// Nota: Este archivo debe ser incluido en los otros scripts PHP que necesiten acceso a la base de datos
?>