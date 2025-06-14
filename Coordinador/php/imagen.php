<?php
// imagen.php?id=123
include 'conexion.php'; // tu archivo de conexión

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);

    $stmt = $conn->prepare("SELECT imagen, tipo_mime FROM actividades WHERE id_actividad = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 1) {
        $stmt->bind_result($imagen, $tipo);
        $stmt->fetch();
        header("Content-type: $tipo");
        echo $imagen;
    } else {
        // Imagen no encontrada
        header("HTTP/1.0 404 Not Found");
        readfile("img/actividades/default.jpg");
    }
    $stmt->close();
} else {
    header("HTTP/1.0 400 Bad Request");
}
$conn->close();
