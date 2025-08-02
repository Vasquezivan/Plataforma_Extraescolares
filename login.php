<?php
// Habilitar cabecera para recibir JSON
header("Content-Type: application/json");

// Recibe datos del frontend
$data = json_decode(file_get_contents("php://input"), true);
$email = $data["email"];
$password = $data["password"];

// Conexión a la base de datos
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "extraescolares";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Error de conexión"]);
    exit();
}

// Cambia la consulta y los nombres de columnas
$stmt = $conn->prepare("SELECT contraseña, rol, unidad_academica FROM usuarios WHERE nombre = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $stmt->bind_result($db_password, $rol, $unidad_academica);
    $stmt->fetch();

    if ($password === $db_password) {
        echo json_encode([
            "success" => true,
            "role" => $rol,
            "unidad_academica" => $unidad_academica
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Contraseña incorrecta"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Usuario no encontrado"]);
}

$stmt->close();
$conn->close();
?>
