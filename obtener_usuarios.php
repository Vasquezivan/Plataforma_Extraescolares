<?php
// Activar el reporte de errores para depuración
ini_set('display_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Usar el archivo de conexión existente
require_once 'conexion.php';

// Verificar si la conexión ya está establecida
if (!isset($conn) || $conn->connect_error) {
    http_response_code(500);
    echo json_encode([
        "success" => false, 
        "message" => "Error de conexión a la base de datos: " . ($conn->connect_error ?? "No se pudo establecer conexión")
    ]);
    exit();
}

try {
    // Comprobar si la base de datos existe
    $check_db = $conn->query("SELECT DATABASE()");
    $db_name = $check_db->fetch_row()[0];
    
    if ($db_name != 'extraescolares') {
        throw new Exception("La base de datos 'extraescolares' no está seleccionada. Base de datos actual: " . $db_name);
    }
    
    // Comprobar si la tabla usuarios existe
    $check_table = $conn->query("SHOW TABLES LIKE 'usuarios'");
    if ($check_table->num_rows == 0) {
        throw new Exception("La tabla 'usuarios' no existe en la base de datos 'extraescolares'.");
    }

    $sql = "SELECT id_usuario, nombre, contraseña, rol, unidad_academica, contacto FROM usuarios";
    $result = $conn->query($sql);

    if (!$result) {
        throw new Exception("Error en la consulta SQL: " . $conn->error);
    }
    
    $datos = array();
    while ($fila = $result->fetch_assoc()) {
        $datos[] = $fila;
    }
    
    echo json_encode([
        "success" => true,
        "data" => $datos
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false, 
        "message" => $e->getMessage(),
        "solution" => "Verifique que la base de datos 'extraescolares' y la tabla 'usuarios' estén correctamente configuradas."
    ]);
}

$conn->close();
?>
