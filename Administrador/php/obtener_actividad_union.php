<?php
require_once "Actividad.php";
header('Content-Type: application/json');

$id_actividad = $_GET['id_actividad'] ?? 0;
$actividad = new Actividad();
$datos = $actividad->obtenerPorId($id_actividad);
echo json_encode($datos);
?>