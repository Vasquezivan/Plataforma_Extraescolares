<?php
// filepath: Administrador/php/Database.php
class Database {
    private $host = "localhost";
    private $db_name = "extraescolares";
    private $username = "root";
    private $password = ""; // Cambia si tienes contraseña
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=utf8",
                $this->username, $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            // En lugar de terminar la ejecución, registrar el error y devolver null
            error_log("Error de conexión a la base de datos: " . $exception->getMessage());
            return null;
        }
        return $this->conn;
    }
}
?>