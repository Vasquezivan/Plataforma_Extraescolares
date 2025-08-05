<?php
session_start();
require_once 'conexion.php'; // Archivo con la conexión a la BD

if (!isset($_SESSION['usuario_id'])) {
    die(json_encode(['error' => 'No autenticado']));
}

$usuarioId = $_SESSION['usuario_id'];

try {
    // Obtener nombre y unidad académica del usuario
    $stmt = $pdo->prepare("SELECT nombre, unidad_academica FROM usuarios WHERE id = :usuario_id");
    $stmt->bindParam(':usuario_id', $usuarioId, PDO::PARAM_INT);
    $stmt->execute();
    
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($usuario) {
        echo json_encode([
            'nombre' => $usuario['nombre'],
            'unidad_academica' => $usuario['unidad_academica']
        ]);
    } else {
        echo json_encode(['error' => 'Usuario no encontrado']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error en la base de datos: ' . $e->getMessage()]);
}
?>
