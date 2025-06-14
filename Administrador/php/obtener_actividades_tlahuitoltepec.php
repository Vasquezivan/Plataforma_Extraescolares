<?php
require_once "Actividad.php";
require_once "Database.php";
header('Content-Type: application/json');

// Primero verificamos la conexión a la base de datos
$db = new Database();
$conn = $db->getConnection();

if ($conn === null) {
    // Error de conexión
    echo json_encode([
        "error" => true,
        "message" => "Error de conexión a la base de datos. Por favor, verifique su configuración."
    ]);
    exit;
}

$id_categoria = isset($_GET['id_categoria']) ? intval($_GET['id_categoria']) : null;
$id_unidad = 3; // Santa María Tlahuitoltepec

try {
    $actividad = new Actividad();
    
    // Si se proporciona un id_categoria específico, filtramos por esa categoría
    // De lo contrario, obtenemos todas las actividades de la unidad
    if ($id_categoria !== null && $id_categoria > 0) {
        $actividades = $actividad->obtenerPorCategoria($id_categoria, $id_unidad);
    } else {
        $actividades = $actividad->obtenerPorUnidad($id_unidad);
    }
    
    echo json_encode($actividades);
} catch (Exception $e) {
    error_log("Error al obtener actividades: " . $e->getMessage());
    echo json_encode([
        "error" => true,
        "message" => "Error al procesar la solicitud: " . $e->getMessage()
    ]);
}
?>