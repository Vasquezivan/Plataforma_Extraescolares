<?php
// filepath: Administrador/editar_actividad.php
require_once "Actividad.php";
header('Content-Type: application/json');

$id_actividad = $_POST['id_actividad'] ?? 0;
$nombre = $_POST['nombre'] ?? '';
$descripcion = $_POST['descripcion'] ?? '';
$id_categoria = $_POST['id_categoria'] ?? 0;
$id_unidad = 4;
$id_asesor = 1;

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

// Cambia la validación: la imagen NO es obligatoria al editar
if ($id_actividad && $nombre && $descripcion && $id_categoria) {
    $actividad = new Actividad();
    $ok = $actividad->editar($id_actividad, $nombre, $descripcion, $imagen_url, $id_unidad, $id_asesor, $id_categoria);
    echo json_encode(['success' => $ok]);
} else {
    echo json_encode(['success' => false, 'error' => 'Faltan datos']);
}
?>