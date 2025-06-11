<?php
require_once "Actividad.php";
header('Content-Type: application/json');

$id_categoria = $_GET['id_categoria'] ?? 0;
$id_unidad = 1;

$actividad = new Actividad();
$actividades = $actividad->obtenerPorCategoria($id_categoria, $id_unidad);
echo json_encode($actividades);
?>