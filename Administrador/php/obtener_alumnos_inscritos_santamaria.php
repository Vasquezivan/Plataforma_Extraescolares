<?php
require_once "Inscripcion.php";
header('Content-Type: application/json');

$id_actividad = $_GET['id_actividad'] ?? 0;
$inscripcion = new Inscripcion();
$alumnos = $inscripcion->obtenerAlumnosPorActividad($id_actividad);
echo json_encode($alumnos);
?>