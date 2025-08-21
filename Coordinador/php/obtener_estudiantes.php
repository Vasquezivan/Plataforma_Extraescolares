<?php
require_once 'conexion.php';

header('Content-Type: application/json; charset=utf-8');

$unidad = isset($_GET['unidad']) ? $_GET['unidad'] : '';

$sql = "SELECT a.id_alumno, 
               a.nombre, 
               a.id_usuario, 
               a.numero_control, 
               a.carrera, 
               a.semestre,
               act.nombre_actividad AS extraescolar
        FROM alumnos a
        LEFT JOIN inscripciones i ON a.id_alumno = i.id_alumno
        LEFT JOIN actividades act ON i.id_actividad = act.id_actividad";

if (!empty($unidad)) {
    $sql .= " WHERE a.unidad_academica = ?";
}

$stmt = $conn->prepare($sql);

if (!empty($unidad)) {
    $stmt->bind_param("s", $unidad);
}

$stmt->execute();
$result = $stmt->get_result();

$alumnos = [];
while ($row = $result->fetch_assoc()) {
    $alumnos[] = $row;
}

echo json_encode($alumnos, JSON_UNESCAPED_UNICODE);
