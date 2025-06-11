<?php
// filepath: Administrador/obtener_categorias.php
require_once "Categoria.php";
header('Content-Type: application/json');

$id_unidad = 4; // VALLE DE ETLA
$categoria = new Categoria();
$categorias = $categoria->obtenerPorUnidad($id_unidad);
echo json_encode($categorias);
?>