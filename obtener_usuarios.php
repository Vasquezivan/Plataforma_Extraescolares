<?php
include 'conexion.php';

$sql = "SELECT id_usuario, nombre, contraseña, rol FROM usuarios";
$result = $conn->query($sql);

$datos = array();

while ($fila = $result->fetch_assoc()) {
    $datos[] = $fila;
}

echo json_encode(["data" => $datos]);
?>
