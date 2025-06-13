<?php
require_once "Actividad.php";
require_once "Database.php";

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

try {
    if (!isset($_GET['id_actividad'])) {
        throw new Exception("Se requiere el parámetro id_actividad");
    }

    $id_actividad = (int)$_GET['id_actividad'];
    $db = new Database();
    $conn = $db->getConnection();

    // Configuración base URL para imágenes
    $base_url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
    $base_path = dirname($_SERVER['SCRIPT_NAME']);
    $image_base_url = $base_url . $base_path . '/img/actividades/';

    // Obtener detalles de la actividad
    $stmt = $conn->prepare("
        SELECT a.*, c.nombre_categoria 
        FROM actividades a
        JOIN categorias c ON a.id_categoria = c.id_categoria
        WHERE a.id_actividad = :id_actividad
    ");
    $stmt->execute(['id_actividad' => $id_actividad]);
    $actividad = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$actividad) {
        throw new Exception("Actividad no encontrada");
    }

    // Procesar URL de imagen
    if (!empty($actividad['imagen_url'])) {
        if (!filter_var($actividad['imagen_url'], FILTER_VALIDATE_URL)) {
            $actividad['imagen_url'] = $image_base_url . basename($actividad['imagen_url']);
        }
    } else {
        $actividad['imagen_url'] = $image_base_url . 'default.jpg';
    }

    echo json_encode($actividad);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Error de base de datos',
        'message' => $e->getMessage()
    ]);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Error de aplicación',
        'message' => $e->getMessage()
    ]);
}
?>