<?php
$host = 'localhost';
$dbname = 'extraescolares';
$user = 'root';
$pass = '';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ATTR_ERRMODE_EXCEPTION);
    
    // Test 1: Contar categorías
    $stmt = $conn->query("SELECT COUNT(*) FROM categorias");
    echo "<h2>Categorías: " . $stmt->fetchColumn() . "</h2>";
    
    // Test 2: Contar actividades para unidad 4
    $stmt = $conn->query("SELECT COUNT(*) FROM actividades WHERE id_unidad = 4");
    echo "<h2>Actividades (unidad 4): " . $stmt->fetchColumn() . "</h2>";
    
    // Test 3: Mostrar algunas actividades
    $stmt = $conn->query("SELECT * FROM actividades WHERE id_unidad = 4 LIMIT 3");
    echo "<h3>Ejemplo de actividades:</h3>";
    echo "<pre>";
    print_r($stmt->fetchAll(PDO::FETCH_ASSOC));
    echo "</pre>";
    
} catch(PDOException $e) {
    echo "<h2 style='color:red'>Error de conexión:</h2>";
    echo "<p>" . $e->getMessage() . "</p>";
}