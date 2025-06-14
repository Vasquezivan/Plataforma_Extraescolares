<?php
// filepath: Administrador/Actividad.php
require_once "Database.php";

class Actividad {
    private $conn;

    public function __construct() {
        $db = new Database();
        $this->conn = $db->getConnection();
        
        // Verificar si la conexión se ha establecido correctamente
        if ($this->conn === null) {
            throw new Exception("No se pudo establecer conexión con la base de datos");
        }
    }

    public function crear($nombre, $descripcion, $imagen_url, $id_unidad, $id_asesor, $id_categoria) {
        // Verificar conexión antes de ejecutar la consulta
        if (!$this->conn) {
            return false;
        }
        
        $sql = "INSERT INTO actividades (nombre_actividad, descripcion, imagen_url, id_unidad, id_asesor, id_categoria)
                VALUES (:nombre, :descripcion, :imagen, :id_unidad, :id_asesor, :id_categoria)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":nombre", $nombre);
        $stmt->bindParam(":descripcion", $descripcion);
        $stmt->bindParam(":imagen", $imagen_url);
        $stmt->bindParam(":id_unidad", $id_unidad, PDO::PARAM_INT);
        $stmt->bindParam(":id_asesor", $id_asesor, PDO::PARAM_INT);
        $stmt->bindParam(":id_categoria", $id_categoria, PDO::PARAM_INT);
        return $stmt->execute();
    }

    public function obtenerPorCategoria($id_categoria, $id_unidad) {
        // Verificar conexión antes de ejecutar la consulta
        if (!$this->conn) {
            return [];
        }
        
        $sql = "SELECT * FROM actividades WHERE id_categoria = :id_categoria AND id_unidad = :id_unidad";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":id_categoria", $id_categoria, PDO::PARAM_INT);
        $stmt->bindParam(":id_unidad", $id_unidad, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function obtenerPorUnidad($id_unidad) {
        // Verificar conexión antes de ejecutar la consulta
        if (!$this->conn) {
            return [];
        }
        
        $sql = "SELECT * FROM actividades WHERE id_unidad = :id_unidad";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":id_unidad", $id_unidad, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function eliminar($id_actividad) {
        // Verificar conexión antes de ejecutar la consulta
        if (!$this->conn) {
            return false;
        }
        
        $sql = "DELETE FROM actividades WHERE id_actividad = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":id", $id_actividad, PDO::PARAM_INT);
        return $stmt->execute();
    }

    public function editar($id_actividad, $nombre, $descripcion, $imagen_url, $id_unidad, $id_asesor, $id_categoria) {
        // Verificar conexión antes de ejecutar la consulta
        if (!$this->conn) {
            return false;
        }
        
        $sql = "UPDATE actividades SET nombre_actividad = :nombre, descripcion = :descripcion, id_unidad = :id_unidad, id_asesor = :id_asesor, id_categoria = :id_categoria";
        if ($imagen_url) {
            $sql .= ", imagen_url = :imagen";
        }
        $sql .= " WHERE id_actividad = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":nombre", $nombre);
        $stmt->bindParam(":descripcion", $descripcion);
        $stmt->bindParam(":id_unidad", $id_unidad, PDO::PARAM_INT);
        $stmt->bindParam(":id_asesor", $id_asesor, PDO::PARAM_INT);
        $stmt->bindParam(":id_categoria", $id_categoria, PDO::PARAM_INT);
        if ($imagen_url) {
            $stmt->bindParam(":imagen", $imagen_url);
        }
        $stmt->bindParam(":id", $id_actividad, PDO::PARAM_INT);
        return $stmt->execute();
    }

    public function obtenerPorId($id_actividad) {
        // Verificar conexión antes de ejecutar la consulta
        if (!$this->conn) {
            return null;
        }
        
        $sql = "SELECT * FROM actividades WHERE id_actividad = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":id", $id_actividad, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
?>