<?php
require_once "Database.php";

class Actividad {
    private $conn;

    public function __construct($dbConnection) {
        $this->conn = $dbConnection;
    }

    // Métodos específicos para coordinador
    public function getActividadesAprobadas($id_unidad) {
        $sql = "SELECT a.*, c.nombre_categoria 
                FROM actividades a
                JOIN categorias c ON a.id_categoria = c.id_categoria
                WHERE a.id_unidad = :unidad 
                AND a.estado = 'aprobado'
                ORDER BY a.fecha_creacion DESC";
        
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":unidad", $id_unidad, PDO::PARAM_INT);
        $stmt->execute();
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getActividadesPorCategoria($id_categoria, $id_unidad) {
        $sql = "SELECT * FROM actividades 
                WHERE id_categoria = :categoria 
                AND id_unidad = :unidad
                AND estado = 'aprobado'
                ORDER BY nombre_actividad";
        
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":categoria", $id_categoria, PDO::PARAM_INT);
        $stmt->bindParam(":unidad", $id_unidad, PDO::PARAM_INT);
        $stmt->execute();
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Otros métodos necesarios para coordinador...
}
?>