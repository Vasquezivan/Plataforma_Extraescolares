<?php
require_once "Actividad.php";
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
$id_actividad = $data['id_actividad'] ?? 0;

if ($id_actividad) {
    $actividad = new Actividad();
    $ok = $actividad->eliminar($id_actividad);
    echo json_encode(['success' => $ok]);
} else {
    echo json_encode(['success' => false]);
}
?>