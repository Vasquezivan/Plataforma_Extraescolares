<?php
require_once "Actividad.php";
$actividad = new Actividad();
$result = $actividad->crear("Prueba", "Descripción de prueba", "uploads/prueba.jpg", 4, 1, 1);
var_dump($result);
?>