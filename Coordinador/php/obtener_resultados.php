<?php
header('Content-Type: application/json');
$host = 'localhost';
$dbname = 'extraescolares';
$username = 'root';
$password = '';
try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $conn->prepare("
        SELECT r.id_resultado, a.nombre, a.numero_control, a.carrera, a.semestre,
               r.valor_numerico, r.nivel_desempeno, r.observaciones, r.periodo,
               c.fecha_generacion, c.nombre_responsable, c.nombre_jefe_extra
        FROM resultados r
        JOIN alumnos a ON r.id_alumno = a.id_alumno
        LEFT JOIN constancias c ON c.id_resultado = r.id_resultado
        ORDER BY r.id_resultado DESC
    ");
    $stmt->execute();
    $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'resultados' => $resultados]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}