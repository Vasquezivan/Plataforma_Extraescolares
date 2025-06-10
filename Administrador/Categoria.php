<?php
// filepath: Administrador/php/Categoria.php
require_once "Database.php";

class Categoria {
    private $conn;

    public function __construct() {
        $db = new Database();
        $this->conn = $db->getConnection();
    }

    public function crear($nombre_categoria) {
        $sql = "INSERT INTO categorias (nombre_categoria) VALUES (:nombre)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":nombre", $nombre_categoria);
        return $stmt->execute();
    }

    public function obtenerTodas() {
        $sql = "SELECT * FROM categorias";
        $stmt = $this->conn->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>