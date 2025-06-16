<?php
header('Content-Type: application/json');

// Configuración de la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "extraescolares";

try {
    // Crear conexión
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Selecciona la base de datos correcta
    $conn->exec("USE extraescolares");

    // Obtener los datos del cuerpo de la solicitud
    $input = json_decode(file_get_contents('php://input'), true);

    if (!is_array($input) || count($input) === 0) {
        echo json_encode(['success' => false, 'message' => 'No hay datos para cargar.']);
        exit;
    }

    $stmt = $conn->prepare("SELECT * FROM estudiantes WHERE numero_control = :numero_control");
    
    foreach ($input as $alumno) {
        // Validación de campos en PHP
        if (empty($alumno['numeroControl'])) {
            echo json_encode(['success' => false, 'message' => 'El número de control es obligatorio.']);
            exit;
        }

        $stmt->execute(['numero_control' => $alumno['numeroControl']]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            echo json_encode(['success' => true, 'data' => $result]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Estudiante no encontrado.']);
        }
    }
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}