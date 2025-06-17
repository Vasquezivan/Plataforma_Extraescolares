<?php
// filepath: php/obtener_estudiantes.php
header('Content-Type: application/json');

try {
    require_once "Database.php";
    $db = new Database();
    $conn = $db->getConnection();

    // Selecciona la base de datos si es necesario
    $conn->query("USE extraescolares");

    // Consulta todos los campos de la tabla alumnos
    $sql = "SELECT id_alumno, nombre, id_usuario, numero_control, carrera, semestre FROM alumnos";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $alumnos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($alumnos, JSON_UNESCAPED_UNICODE);

} catch(Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'message' => $e->getMessage()
    ]);
}
?>