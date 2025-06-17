<?php
header('Content-Type: application/json');
$host = 'localhost';
$dbname = 'extraescolares';
$username = 'root';
$password = '';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $data = json_decode(file_get_contents("php://input"), true);

    // 1. Guardar resultado
    $stmt = $conn->prepare("INSERT INTO resultados (id_alumno, valor_numerico, nivel_desempeno, observaciones, periodo) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([
        $data['id_alumno'],
        $data['valor_numerico'],
        $data['nivel_desempeno'],
        $data['observaciones'],
        $data['periodo']
    ]);
    $id_resultado = $conn->lastInsertId();

    // 2. Guardar constancia relacionada
    $stmt2 = $conn->prepare("INSERT INTO constancias (id_resultado, archivo_pdf, observaciones, nombre_responsable, nombre_jefe_extra, periodo, valor_numerico, nivel_desempeno) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt2->execute([
        $id_resultado,
        $data['archivo_pdf'] ?? null,
        $data['observaciones'],
        $data['nombre_responsable'],
        $data['nombre_jefe_extra'],
        $data['periodo'],
        $data['valor_numerico'],
        $data['nivel_desempeno']
    ]);

    echo json_encode(['success' => true, 'message' => 'Constancia y resultado guardados']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}