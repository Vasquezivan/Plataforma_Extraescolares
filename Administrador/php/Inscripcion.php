<?php
require_once "Database.php";

class Inscripcion {
    private $conn;

    public function __construct() {
        $db = new Database();
        $this->conn = $db->getConnection();
    }

   public function obtenerAlumnosPorActividad($id_actividad) {
    $sql = "SELECT a.id_alumno, a.nombre, a.numero_control, a.carrera, a.semestre
            FROM inscripciones i
            JOIN alumnos a ON i.id_alumno = a.id_alumno
            WHERE i.id_actividad = ?";
    $stmt = $this->conn->prepare($sql);
    $stmt->execute([$id_actividad]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
}
?>