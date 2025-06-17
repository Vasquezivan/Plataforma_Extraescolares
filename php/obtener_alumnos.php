<?php
header('Content-Type: application/json');
$host = 'localhost';
$dbname = 'extraescolares';
$username = 'root';
$password = '';
try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $conn->prepare("SELECT id_alumno, nombre, numero_control, carrera, semestre FROM alumnos");
    $stmt->execute();
    $alumnos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode([
        'success' => true,
        'alumnos' => $alumnos
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error al conectar o consultar la base de datos: ' . $e->getMessage()
    ]);
}