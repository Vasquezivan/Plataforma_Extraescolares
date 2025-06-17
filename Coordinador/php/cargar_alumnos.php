<?php
header('Content-Type: application/json');

try {
    require_once "Database.php";
    $db = new Database();
    $conn = $db->getConnection();

    // Selecciona la base de datos si es necesario
    $conn->query("USE extraescolares");

    // Obtiene los datos enviados por POST (JSON)
    $input = json_decode(file_get_contents('php://input'), true);

    // Validación básica
    if (
        empty($input['nombre']) ||
        empty($input['id_usuario']) ||
        empty($input['numero_control']) ||
        empty($input['carrera']) ||
        empty($input['semestre'])
    ) {
        echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios.']);
        exit;
    }

    // Prepara la consulta para insertar
    $stmt = $conn->prepare("INSERT INTO alumnos 
        (nombre, id_usuario, numero_control, carrera, semestre)
        VALUES (?, ?, ?, ?, ?)");

    $stmt->execute([
        $input['nombre'],
        $input['id_usuario'],
        $input['numero_control'],
        $input['carrera'],
        $input['semestre']
    ]);

    echo json_encode(['success' => true]);
} catch(Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}