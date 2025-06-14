<?php
require_once "Database.php";
require_once "Inscripcion.php";
header('Content-Type: application/json');

// Verificar que se reciba el id_actividad
if (!isset($_GET['id_actividad']) || empty($_GET['id_actividad'])) {
    echo json_encode([
        "error" => true,
        "message" => "Se requiere el ID de la actividad"
    ]);
    exit;
}

$id_actividad = intval($_GET['id_actividad']);

// Verificamos la conexión a la base de datos
$db = new Database();
$conn = $db->getConnection();

if ($conn === null) {
    // Error de conexión
    echo json_encode([
        "error" => true,
        "message" => "Error de conexión a la base de datos. Por favor, verifique su configuración."
    ]);
    exit;
}

try {
    // Crear instancia de inscripción
    $inscripcion = new Inscripcion();
    
    // Obtener alumnos inscritos en la actividad - Cambiamos la función a obtenerAlumnosPorActividad que es la que existe en la clase Inscripcion
    $alumnosInscritos = $inscripcion->obtenerAlumnosPorActividad($id_actividad);
    
    // Devolver los resultados como JSON
    echo json_encode($alumnosInscritos);
} catch (Exception $e) {
    error_log("Error al obtener alumnos inscritos: " . $e->getMessage());
    echo json_encode([
        "error" => true,
        "message" => "Error al procesar la solicitud: " . $e->getMessage()
    ]);
}
?>