<?php
// filepath: Administrador/php/guardar_categoria.php
require_once "Categoria.php";
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
$nombre = $data['nombre_categoria'] ?? '';

if ($nombre) {
    $categoria = new Categoria();
    $ok = $categoria->crear($nombre);
    echo json_encode(['success' => $ok]);
} else {
    echo json_encode(['success' => false, 'error' => 'Nombre vacío']);
}
?>