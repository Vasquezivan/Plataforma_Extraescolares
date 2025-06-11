<?php
// Mostrar todos los errores para depuración
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Datos de conexión
$host = "localhost";
$usuario = "root";
$contrasena = "";

// Conectar sin seleccionar una base de datos
$conn = new mysqli($host, $usuario, $contrasena);

// Verificar conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

echo "<h2>Comprobando configuración de la base de datos</h2>";

// Crear la base de datos si no existe
$sql = "CREATE DATABASE IF NOT EXISTS extraescolares";
if ($conn->query($sql) === TRUE) {
    echo "<p>✅ Base de datos 'extraescolares' verificada/creada correctamente.</p>";
} else {
    echo "<p>❌ Error al crear la base de datos: " . $conn->error . "</p>";
    die();
}

// Seleccionar la base de datos
$conn->select_db("extraescolares");

// Crear tabla usuarios si no existe
$sql = "CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INT(11) AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    rol VARCHAR(20) NOT NULL,
    unidad_academica VARCHAR(100),
    contacto VARCHAR(100)
)";

if ($conn->query($sql) === TRUE) {
    echo "<p>✅ Tabla 'usuarios' verificada/creada correctamente.</p>";
} else {
    echo "<p>❌ Error al crear la tabla usuarios: " . $conn->error . "</p>";
}

// Verificar si hay algún usuario administrador
$result = $conn->query("SELECT COUNT(*) as total FROM usuarios WHERE rol = 'admin'");
$row = $result->fetch_assoc();

// Si no hay usuarios administradores, crear uno por defecto
if ($row['total'] == 0) {
    $sql = "INSERT INTO usuarios (nombre, contraseña, rol, unidad_academica, contacto) 
            VALUES ('Administrador', 'admin123', 'admin', 'Central', 'admin@example.com')";
    
    if ($conn->query($sql) === TRUE) {
        echo "<p>✅ Usuario administrador creado con éxito. Usuario: 'Administrador', Contraseña: 'admin123'</p>";
    } else {
        echo "<p>❌ Error al crear usuario administrador: " . $conn->error . "</p>";
    }
} else {
    echo "<p>✅ Ya existe al menos un usuario administrador en el sistema.</p>";
}

echo "<p><strong>Estado de la base de datos:</strong></p>";

// Mostrar la estructura de la tabla usuarios
$result = $conn->query("DESCRIBE usuarios");
if ($result->num_rows > 0) {
    echo "<h3>Estructura de la tabla 'usuarios':</h3>";
    echo "<table border='1'>";
    echo "<tr><th>Campo</th><th>Tipo</th><th>Nulo</th><th>Clave</th><th>Predeterminado</th><th>Extra</th></tr>";
    
    while ($row = $result->fetch_assoc()) {
        echo "<tr>";
        echo "<td>" . $row["Field"] . "</td>";
        echo "<td>" . $row["Type"] . "</td>";
        echo "<td>" . $row["Null"] . "</td>";
        echo "<td>" . $row["Key"] . "</td>";
        echo "<td>" . $row["Default"] . "</td>";
        echo "<td>" . $row["Extra"] . "</td>";
        echo "</tr>";
    }
    echo "</table>";
}

// Mostrar usuarios existentes
$result = $conn->query("SELECT id_usuario, nombre, rol, unidad_academica, contacto FROM usuarios");
if ($result->num_rows > 0) {
    echo "<h3>Usuarios existentes:</h3>";
    echo "<table border='1'>";
    echo "<tr><th>ID</th><th>Nombre</th><th>Rol</th><th>Unidad Académica</th><th>Contacto</th></tr>";
    
    while ($row = $result->fetch_assoc()) {
        echo "<tr>";
        echo "<td>" . $row["id_usuario"] . "</td>";
        echo "<td>" . $row["nombre"] . "</td>";
        echo "<td>" . $row["rol"] . "</td>";
        echo "<td>" . $row["unidad_academica"] . "</td>";
        echo "<td>" . $row["contacto"] . "</td>";
        echo "</tr>";
    }
    echo "</table>";
} else {
    echo "<p>No hay usuarios registrados.</p>";
}

// Verificar si obtener_usuarios.php existe y tiene permisos correctos
if (file_exists('obtener_usuarios.php')) {
    echo "<p>✅ El archivo 'obtener_usuarios.php' existe.</p>";
} else {
    echo "<p>❌ El archivo 'obtener_usuarios.php' no existe. Este archivo es necesario para la funcionalidad de la aplicación.</p>";
}

// Verificar si los archivos de manipulación de usuarios existen
$files_to_check = [
    'php/guardar_usuarios.php',
    'php/actualizar_usuario.php',
    'php/eliminar_usuario.php'
];

foreach ($files_to_check as $file) {
    if (file_exists($file)) {
        echo "<p>✅ El archivo '$file' existe.</p>";
    } else {
        echo "<p>❌ El archivo '$file' no existe. Este archivo puede ser necesario para la funcionalidad de la aplicación.</p>";
    }
}

echo "<p>Todo está listo para usar la aplicación. Ahora puedes <a href='index.html'>ir a la página principal</a>.</p>";

$conn->close();
?>