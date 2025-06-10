<?php
// filepath: Administrador/php/Actividad.php
require_once "Database.php";

class Actividad {
    private $conn;

    public function __construct() {
        $db = new Database();
        $this->conn = $db->getConnection();
    }

    public function crear($nombre, $descripcion, $imagen_url, $id_unidad, $id_asesor, $id_categoria) {
        $sql = "INSERT INTO actividades (nombre_actividad, descripcion, imagen_url, id_unidad, id_asesor, id_categoria)
                VALUES (:nombre, :descripcion, :imagen, :id_unidad, :id_asesor, :id_categoria)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":nombre", $nombre);
        $stmt->bindParam(":descripcion", $descripcion);
        $stmt->bindParam(":imagen", $imagen_url);
        $stmt->bindParam(":id_unidad", $id_unidad);
        $stmt->bindParam(":id_asesor", $id_asesor);
        $stmt->bindParam(":id_categoria", $id_categoria);
        return $stmt->execute();
    }
}
?>