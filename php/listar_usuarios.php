<?php
// Incluir archivo de conexión
require_once './php/conexion.php';

// Iniciar sesión si no está iniciada
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Verificar si el usuario está autenticado y tiene permisos de administrador o coordinador
if (!isset($_SESSION['id_usuario']) || ($_SESSION['rol'] != 'administrador' && $_SESSION['rol'] != 'coordinador')) {
    echo json_encode(["success" => false, "message" => "No tienes permisos para ver esta información"]);
    exit;
}

// Preparar la consulta SQL para obtener todos los usuarios
$sql = "SELECT id_usuario, nombre, contacto, rol, unidad_academica FROM usuarios";

// Si el usuario es coordinador, mostrar solo los usuarios de su unidad académica
if ($_SESSION['rol'] == 'coordinador') {
    $sql .= " WHERE unidad_academica = ?";
}

// Preparar la sentencia
if ($stmt = $conn->prepare($sql)) {
    
    // Si es coordinador, vincular el parámetro de unidad académica
    if ($_SESSION['rol'] == 'coordinador') {
        $stmt->bind_param("s", $_SESSION['unidad_academica']);
    }
    
    // Ejecutar la consulta
    $stmt->execute();
    
    // Vincular variables de resultado
    $resultado = $stmt->get_result();
    
    // Comprobar si hay resultados
    if ($resultado->num_rows > 0) {
        $usuarios = [];
        
        // Obtener datos de cada fila
        while ($fila = $resultado->fetch_assoc()) {
            $usuarios[] = $fila;
        }
        
        // Devolver los usuarios en formato JSON
        echo json_encode(["success" => true, "usuarios" => $usuarios]);
    } else {
        echo json_encode(["success" => true, "usuarios" => [], "message" => "No hay usuarios registrados"]);
    }
    
    // Cerrar la sentencia
    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Error en la preparación de la consulta: " . $conn->error]);
}

// Cerrar la conexión
$conn->close();
?>