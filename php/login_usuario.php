<?php
// Incluir archivo de conexión
require_once './php/conexion.php';

// Iniciar sesión si no está iniciada
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Verificar si se recibieron los datos del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoger los datos del formulario
    $contacto = $_POST['contacto'];
    $contrasena = $_POST['contrasena'];
    
    // Preparar la consulta SQL para buscar el usuario
    $sql = "SELECT id_usuario, nombre, contacto, contraseña, rol, unidad_academica FROM usuarios WHERE contacto = ?";
    
    // Preparar la sentencia
    if ($stmt = $conn->prepare($sql)) {
        // Vincular parámetros
        $stmt->bind_param("s", $contacto);
        
        // Ejecutar la consulta
        $stmt->execute();
        
        // Vincular variables de resultado
        $stmt->bind_result($id_usuario, $nombre, $contacto_db, $contrasena_db, $rol, $unidad_academica);
        
        // Obtener resultados
        if ($stmt->fetch()) {
            // Verificar la contraseña (ahora en texto plano)
            if ($contrasena === $contrasena_db) {
                // Contraseña correcta, iniciar sesión
                $_SESSION['id_usuario'] = $id_usuario;
                $_SESSION['nombre'] = $nombre;
                $_SESSION['contacto'] = $contacto_db;
                $_SESSION['rol'] = $rol;
                $_SESSION['unidad_academica'] = $unidad_academica;
                
                // Redireccionar según el rol
                switch ($rol) {
                    case 'administrador':
                    case 'Administrador':
                        echo json_encode(["success" => true, "redirect" => "../Administrador/Principal_Admin.html"]);
                        break;
                    case 'coordinador':
                    case 'Coordinador':
                        echo json_encode(["success" => true, "redirect" => "../Coordinador/Pagina principal.html"]);
                        break;
                    default:
                        echo json_encode(["success" => true, "redirect" => "../index.html"]);
                        break;
                }
            } else {
                // Contraseña incorrecta
                echo json_encode(["success" => false, "message" => "Contraseña incorrecta"]);
            }
        } else {
            // Usuario no encontrado
            echo json_encode(["success" => false, "message" => "Usuario no encontrado"]);
        }
        
        // Cerrar la sentencia
        $stmt->close();
    } else {
        echo json_encode(["success" => false, "message" => "Error en la preparación de la consulta: " . $conn->error]);
    }
    
    // Cerrar la conexión
    $conn->close();
} else {
    // Si no es una solicitud POST, devolver un mensaje de error
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
}
?>