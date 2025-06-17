<?php
// filepath: php/guardar_alumnos.php
header('Content-Type: application/json');

try {
    require_once "Database.php";
    $db = new Database();
    $conn = $db->getConnection();

    // Selecciona la base de datos si es necesario
    $conn->query("USE extraescolares");

    // Obtiene los datos enviados por POST (JSON)
    $input = json_decode(file_get_contents('php://input'), true);

    if (!is_array($input) || count($input) === 0) {
        echo json_encode(['success' => false, 'message' => 'No hay datos para guardar.']);
        exit;
    }

    // Prepara la consulta para insertar alumnos
    $stmt = $conn->prepare("INSERT INTO alumnos 
        (nombre, id_usuario, numero_control, carrera, semestre)
        VALUES (?, ?, ?, ?, ?)");

    // Prepara la consulta para insertar inscripciones
    $stmtInscripcion = $conn->prepare("INSERT INTO inscripciones 
        (id_alumno, id_actividad, fecha_inscripcion)
        VALUES (?, ?, NOW())");

    foreach ($input as $alumno) {
        // Validación básica
        if (
            empty($alumno['nombre']) ||
            empty($alumno['id_usuario']) ||
            empty($alumno['numero_control']) ||
            empty($alumno['carrera']) ||
            empty($alumno['semestre']) ||
            empty($alumno['id_actividad']) // Validar que venga el id_actividad
        ) {
            echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios.']);
            exit;
        }

        // Insertar alumno
        $stmt->execute([
            $alumno['nombre'],
            $alumno['id_usuario'],
            $alumno['numero_control'],
            $alumno['carrera'],
            $alumno['semestre']
        ]);

        // Obtener el id del alumno recién insertado
        $id_alumno = $conn->lastInsertId();

        // Insertar inscripción
        $stmtInscripcion->execute([
            $id_alumno,
            $alumno['id_actividad']
        ]);
    }

    echo json_encode(['success' => true]);
} catch(Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}