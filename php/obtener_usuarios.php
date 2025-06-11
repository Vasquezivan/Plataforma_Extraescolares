<?php
// Incluir archivo de conexión
require_once 'conexion.php';

// Iniciar sesión si no está iniciada
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Verificar si la columna contraseña_texto existe
try {
    $checkColumn = $conn->query("SHOW COLUMNS FROM usuarios LIKE 'contraseña_texto'");
    if ($checkColumn->num_rows == 0) {
        // La columna no existe, la creamos y copiamos los datos de contraseña
        $conn->query("ALTER TABLE usuarios ADD contraseña_texto VARCHAR(255) AFTER contraseña");
        // Copiar los datos existentes de contraseña a contraseña_texto
        $conn->query("UPDATE usuarios SET contraseña_texto = contraseña");
    }
} catch (Exception $e) {
    // Ignorar errores y continuar
}

// Preparar la consulta SQL para obtener SOLO los campos específicos que necesitamos
// Especificamos los campos exactos para evitar campos no deseados como "rar"
$sql = "SELECT id_usuario, nombre, unidad_academica, contacto, contraseña_texto AS contraseña, rol FROM usuarios ORDER BY id_usuario ASC";

// Si el usuario es coordinador, mostrar solo los usuarios de su unidad académica
if (isset($_SESSION['rol']) && $_SESSION['rol'] == 'coordinador') {
    $sql = "SELECT id_usuario, nombre, unidad_academica, contacto, contraseña_texto AS contraseña, rol FROM usuarios WHERE unidad_academica = ? ORDER BY id_usuario ASC";
}

// Preparar la sentencia
if ($stmt = $conn->prepare($sql)) {
    
    // Si es coordinador, vincular el parámetro de unidad académica
    if (isset($_SESSION['rol']) && $_SESSION['rol'] == 'coordinador') {
        $stmt->bind_param("s", $_SESSION['unidad_academica']);
    }
    
    // Ejecutar la consulta
    $stmt->execute();
    
    // Vincular variables de resultado
    $resultado = $stmt->get_result();
    
    // Comprobar si hay resultados
    if ($resultado->num_rows > 0) {
        $usuarios = [];
        $contador = 1; // Contador para ID secuencial visual
        
        // Obtener datos de cada fila
        while ($fila = $resultado->fetch_assoc()) {
            // Guardamos el ID real en un campo separado para operaciones CRUD
            $id_real = $fila['id_usuario'];
            // Sobrescribimos con el contador secuencial para visualización
            $fila['id_visual'] = $contador++;
            $fila['id_usuario'] = $id_real; // Mantener el ID real para operaciones CRUD
            $usuarios[] = $fila;
        }
        
        // Devolver los usuarios en formato JSON
        echo json_encode(["success" => true, "data" => $usuarios]);
    } else {
        echo json_encode(["success" => true, "data" => [], "message" => "No hay usuarios registrados"]);
    }
    
    // Cerrar la sentencia
    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Error en la preparación de la consulta: " . $conn->error]);
}

// Cerrar la conexión
$conn->close();
?>