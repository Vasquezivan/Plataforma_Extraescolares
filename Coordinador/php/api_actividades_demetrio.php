<?php

header('Content-Type: application/json');
ob_start();

try {
    require_once "Database.php";
    $db = new Database();
    $conn = $db->getConnection();

    // Para Demetrio Vallejo, id_unidad = 4
    $id_unidad = 2;

    // Consulta para categorías
    $stmt = $conn->query("SELECT id_categoria, nombre_categoria FROM categorias");
    $categorias = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $resultado = [];

    foreach ($categorias as $cat) {
        $stmt = $conn->prepare("SELECT * FROM actividades WHERE id_categoria = ? AND id_unidad = ?");
        $stmt->execute([$cat['id_categoria'], $id_unidad]);
        $actividades = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($actividades) {
            // Procesar imagen_url si es necesario
            foreach ($actividades as &$actividad) {
                if (empty($actividad['imagen_url'])) {
                    $actividad['imagen_url'] = 'https://via.placeholder.com/370x100?text=Actividad';
                }
            }
            $cat['actividades'] = $actividades;
            $resultado[] = $cat;
        }
    }

    ob_end_clean();
    echo json_encode($resultado);
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
?>