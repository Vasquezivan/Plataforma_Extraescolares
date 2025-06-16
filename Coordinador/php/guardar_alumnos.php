<?php
// filepath: php/guardar_estudiantes.php
header('Content-Type: application/json');

try {
    require_once "Database.php";
    $db = new Database();
    $conn = $db->getConnection();

    // Selecciona la base de datos correcta (opcional si ya está en Database.php)
    $conn->query("USE extraescolares");

    $input = json_decode(file_get_contents('php://input'), true);

    if (!is_array($input) || count($input) === 0) {
        echo json_encode(['success' => false, 'message' => 'No hay datos para guardar.']);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO estudiantes
        (numero_control, nombre_completo, carrera, semestre, actividad, correo_electronico)
        VALUES (?, ?, ?, ?, ?, ?)");

    foreach ($input as $alumno) {
        // Validación de campos en PHP
        if (
            empty($alumno['numeroControl']) ||
            empty($alumno['nombre']) ||
            empty($alumno['carrera']) ||
            empty($alumno['semestre']) ||
            empty($alumno['actividad']) ||
            empty($alumno['correo'])
        ) {
            echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios.']);
            exit;
        }
        if (!filter_var($alumno['correo'], FILTER_VALIDATE_EMAIL)) {
            echo json_encode(['success' => false, 'message' => 'Correo electrónico inválido para: ' . $alumno['nombre']]);
            exit;
        }

        $stmt->execute([
            $alumno['numeroControl'],
            $alumno['nombre'],
            $alumno['carrera'],
            $alumno['semestre'],
            $alumno['actividad'],
            $alumno['correo']
        ]);
    }

    echo json_encode(['success' => true]);
} catch(Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}