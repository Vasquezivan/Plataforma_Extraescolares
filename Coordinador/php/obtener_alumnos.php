<?php
header('Content-Type: application/json');

// Configuración de la base de datos
$servername = "localhost";
$username = "root"; 
$password = "";
$dbname = "extraescolares";

try {
    // Crear conexión
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Consulta SQL para obtener los alumnos
    $stmt = $conn->prepare("SELECT id_alumno, nombre, numero_control, carrera, semestre FROM alumnos");
    $stmt->execute();
    
    $alumnos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($alumnos);
    
} catch(PDOException $e) {
    // En caso de error, devolver un array vacío y registrar el error
    error_log("Error en obtener_alumnos.php: " . $e->getMessage());
    echo json_encode([]);
}

$conn = null;
?>