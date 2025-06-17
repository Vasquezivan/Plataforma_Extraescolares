<?php
header('Content-Type: application/json');
require_once 'conexion.php';

$response = ['success' => false, 'message' => '', 'alumnos' => []];

try {
    // Consulta SQL para obtener todos los alumnos
    $sql = "SELECT 
                id_alumno AS id,
                nombre AS name,
                numero_control AS controlNumber,
                carrera,
                semestre
            FROM alumnos
            ORDER BY nombre ASC";
    
    $result = $conn->query($sql);
    
    if (!$result) {
        throw new Exception("Error en la consulta: " . $conn->error);
    }
    
    while($row = $result->fetch_assoc()) {
        $response['alumnos'][] = [
            'id' => $row['id'],
            'controlNumber' => $row['controlNumber'],
            'name' => $row['name'],
            'carrera' => $row['carrera'],
            'semestre' => $row['semestre'],
            'status' => 'Pendiente' // Valor por defecto
        ];
    }
    
    $response['success'] = true;

} catch (Exception $e) {
    $response['message'] = $e->getMessage();
    error_log("Error en obtener_alumnos.php: " . $e->getMessage());
}

// Para depuración (puedes comentar esto después)
$response['debug'] = [
    'sql' => $sql,
    'num_rows' => $result->num_rows ?? 0
];

echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
$conn->close();
?>