<?php
// --- 1. CONFIGURACIÓN DE LA BASE DE DATOS ---
// Valores actualizados según tu información.
$servername = "localhost";        // Servidor de base de datos (usualmente 'localhost')
$username = "root";               // Tu usuario de MySQL es 'root'
$password = "";                   // No tienes contraseña, así que se deja vacío
$dbname = "Valle_Etla";           // El nombre de tu base de datos

// --- 2. CONEXIÓN Y CONSULTA ---
header('Content-Type: application/json'); // Indicar que la respuesta será en formato JSON

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Establecer el charset a UTF-8 para evitar problemas con tildes y caracteres especiales
$conn->set_charset("utf8");

// Verificar si la conexión falló
if ($conn->connect_error) {
    // Si hay un error, se termina el script y se envía una respuesta de error en JSON
    // Es importante mostrar el error para poder depurar problemas
    echo json_encode(['success' => false, 'message' => 'Error de conexión: ' . $conn->connect_error]);
    exit(); // Detiene la ejecución del script
}

// Consulta SQL para obtener todos los alumnos.
// **Importante**: Asegúrate de que tu tabla se llame 'alumnos'. Si no, cámbiala aquí.
$sql = "SELECT id_alumno, nombre, id_usuario, numero_control, carrera, semestre FROM alumnos";

$result = $conn->query($sql);

// --- 3. PROCESAMIENTO Y RESPUESTA ---
$alumnos = []; // Crear un array para guardar los resultados

// Verificar si la consulta se ejecutó correctamente
if ($result) {
    // Si la consulta devolvió filas
    if ($result->num_rows > 0) {
        // Se recorren las filas una por una
        while($row = $result->fetch_assoc()) {
            // Se añade cada fila (alumno) al array $alumnos
            $alumnos[] = $row;
        }
        // Se envía una respuesta exitosa con la lista de alumnos en formato JSON
        echo json_encode(['success' => true, 'alumnos' => $alumnos]);
    } else {
        // Si no se encontraron alumnos en la tabla
        echo json_encode(['success' => true, 'alumnos' => [], 'message' => 'No se encontraron alumnos en la base de datos.']);
    }
} else {
    // Si hubo un error al ejecutar la consulta SQL
    echo json_encode(['success' => false, 'message' => 'Error en la consulta SQL: ' . $conn->error]);
}


// --- 4. CERRAR LA CONEXIÓN ---
$conn->close();

?>