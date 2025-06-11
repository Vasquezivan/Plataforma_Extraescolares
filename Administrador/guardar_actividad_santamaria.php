<?php
// filepath: Administrador/guardar_actividad_santamaria.php
require_once "Actividad.php";
header('Content-Type: application/json');

$nombre = $_POST['nombre'] ?? '';
$descripcion = $_POST['descripcion'] ?? '';
$id_categoria = $_POST['id_categoria'] ?? 0;
$id_unidad = 3; // Santa María Tlahuitoltepec
$id_asesor = 1; // Cambia según tu lógica

$imagen_url = '';
if (isset($_FILES['imagen']) && $_FILES['imagen']['size'] > 0) {
    $carpeta = "uploads/";
    if (!file_exists($carpeta)) mkdir($carpeta, 0777, true);
    $nombreArchivo = uniqid() . "_" . basename($_FILES["imagen"]["name"]);
    $ruta = $carpeta . $nombreArchivo;
    if (move_uploaded_file($_FILES["imagen"]["tmp_name"], $ruta)) {
        $imagen_url = $ruta;
    }
}

if ($nombre && $descripcion && $imagen_url && $id_categoria) {
    $actividad = new Actividad();
    $ok = $actividad->crear($nombre, $descripcion, $imagen_url, $id_unidad, $id_asesor, $id_categoria);
    echo json_encode(['success' => $ok]);
} else {
    echo json_encode(['success' => false, 'error' => 'Datos incompletos']);
}
?>