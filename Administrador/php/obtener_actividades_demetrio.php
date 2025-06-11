<?php
require_once "Actividad.php";
header('Content-Type: application/json');

$id_categoria = $_GET['id_categoria'] ?? 0;
$id_unidad = 2; // Demetria Vallejo Martínez en el Espinal

$actividad = new Actividad();
$actividades = $actividad->obtenerPorCategoria($id_categoria, $id_unidad);
echo json_encode($actividades);
?>