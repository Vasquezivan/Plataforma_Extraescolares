<?php
require_once "Database.php";

class Inscripcion {
    private $conn;

    public function __construct() {
        $db = new Database();
        $this->conn = $db->getConnection();
    }

    public function obtenerAlumnosPorActividad($id_actividad) {
        $sql = "SELECT u.nombre, u.correo, a.numero_control, a.carrera, a.semestre
                FROM inscripciones i
                JOIN alumnos a ON i.id_alumno = a.id_alumno
                JOIN usuarios u ON a.id_usuario = u.id_usuario
                WHERE i.id_actividad = :id_actividad";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":id_actividad", $id_actividad, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>