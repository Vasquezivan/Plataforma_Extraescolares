<?php
// filepath: Administrador/php/Categoria.php
require_once "Database.php";

class Categoria {
    private $conn;

    public function __construct() {
        $db = new Database();
        $this->conn = $db->getConnection();
    }

    public function crear($nombre_categoria, $id_unidad) {
        $sql = "INSERT INTO categorias (nombre_categoria, id_unidad) VALUES (:nombre, :id_unidad)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":nombre", $nombre_categoria);
        $stmt->bindParam(":id_unidad", $id_unidad, PDO::PARAM_INT);
        return $stmt->execute();
    }

    public function obtenerTodas() {
        $sql = "SELECT * FROM categorias";
        $stmt = $this->conn->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function obtenerPorUnidad($id_unidad) {
        $sql = "SELECT * FROM categorias WHERE id_unidad = :id_unidad";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":id_unidad", $id_unidad, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>