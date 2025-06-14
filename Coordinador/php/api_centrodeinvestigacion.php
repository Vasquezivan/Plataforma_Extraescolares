<?php

header('Content-Type: application/json');
ob_start();

try {
    require_once "Database.php";
    $db = new Database();
    $conn = $db->getConnection();

    // Para Centro de Investigación, id_unidad = 5
    $id_unidad = 5;

    // Ruta base para las imágenes - ajusta según tu estructura de directorios
    $baseUrl = "http://localhost/Proyectoextras/Administrador/";

    // Consulta para categorías
    $stmt = $conn->query("SELECT id_categoria, nombre_categoria FROM categorias");
    $categorias = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $resultado = [];

    foreach ($categorias as $cat) {
        $stmt = $conn->prepare("SELECT * FROM actividades WHERE id_categoria = ? AND id_unidad = ?");
        $stmt->execute([$cat['id_categoria'], $id_unidad]);
        $actividades = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($actividades as &$actividad) {
            if (!empty($actividad['imagen_url'])) {
                // Elimina el prefijo 'uploads/' si ya está incluido en la ruta de la base de datos
                $ruta_imagen = $actividad['imagen_url'];
                if (strpos($ruta_imagen, 'uploads/') === 0) {
                    $ruta_imagen = substr($ruta_imagen, strlen('uploads/'));
                }
                // Construimos ruta completa
                $actividad['imagen_url'] = $baseUrl . 'uploads/' . rawurlencode($ruta_imagen);
            } else {
                $actividad['imagen_url'] = 'https://via.placeholder.com/370x100?text=Actividad';
            }
        }

        if ($actividades) {
            $cat['actividades'] = $actividades;
            $resultado[] = $cat;
        }
    }

    ob_end_clean();
    echo json_encode($resultado, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    exit;

} catch(Exception $e) {
    ob_end_clean();
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'message' => $e->getMessage()
    ]);
    exit;
}