<?php

header('Content-Type: application/json');
ob_start();

try {
    require_once "Database.php";
    
    $db = new Database();
    $conn = $db->getConnection();
    
    $id_unidad = isset($_GET['id_unidad']) ? (int)$_GET['id_unidad'] : 4;
    
    // Consulta para categorías
    $stmt = $conn->query("SELECT id_categoria, nombre_categoria FROM categorias");
    $categorias = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $resultado = [];
    
    foreach ($categorias as $cat) {
        $stmt = $conn->prepare("SELECT * FROM actividades WHERE id_categoria = ? AND id_unidad = ?");
        $stmt->execute([$cat['id_categoria'], $id_unidad]);
        $actividades = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        if ($actividades) {
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