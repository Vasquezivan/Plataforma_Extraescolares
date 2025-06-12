<?php
// api.php
header('Content-Type: application/json'); // Indicamos que la respuesta será en formato JSON

// 1. Configuración de la Base de Datos
$servidor = "localhost"; // Generalmente es "localhost"
$usuario = "root";       // Usuario por defecto de XAMPP/WAMP (usualmente vacía)
$password = "";          // Contraseña por defecto de XAMPP/WAMP (usualmente vacía)
$basededatos = "plataforma_extraescolares"; // El nombre que le diste en phpMyAdmin

// Crear conexión
$conexion = new mysqli($servidor, $usuario, $password, $basededatos);

// Verificar conexión
if ($conexion->connect_error) {
    // Si hay un error de conexión, devolvemos un JSON con el mensaje de error
    echo json_encode(["exito" => false, "mensaje" => "Error de conexión a la base de datos: " . $conexion->connect_error]);
    exit(); // Detenemos la ejecución del script
}

// 2. Obtener los datos enviados desde el JavaScript (el array de alumnos)
$input = file_get_contents('php://input');
$alumnos_data = json_decode($input, true); // Decodificar el JSON como un array asociativo

// Verificar si hubo un error al decodificar el JSON
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['exito' => false, 'mensaje' => 'Error al decodificar JSON: ' . json_last_error_msg()]);
    exit();
}

// Verificar si se recibieron datos. Si el array está vacío, no hay alumnos que procesar.
if (empty($alumnos_data)) {
    echo json_encode(['exito' => false, 'mensaje' => 'No se recibieron datos de alumnos para guardar.']);
    exit();
}

$inserted_count = 0; // Contador de alumnos insertados exitosamente
$failed_count = 0;   // Contador de alumnos que fallaron al insertarse
$errors = [];        // Array para almacenar detalles de errores

// 3. Preparar la sentencia INSERT para evitar Inyección SQL (¡MUY IMPORTANTE!)
$sql = "INSERT INTO alumnos (numero_control, nombre_completo, carrera, semestre, actividad, correo_electronico) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conexion->prepare($sql);

// Verificar si la preparación de la sentencia fue exitosa
if ($stmt === false) {
    echo json_encode(['exito' => false, 'mensaje' => 'Error al preparar la consulta: ' . $conexion->error]);
    exit();
}

// 4. Iterar sobre cada alumno en el array recibido y ejecutar la inserción
foreach ($alumnos_data as $alumno) {
    // Verificar que los datos necesarios existan en cada objeto de alumno
    // Las claves deben coincidir exactamente con las que envías desde tu JavaScript (ej. 'numeroControl', 'nombre')
    if (
        !isset($alumno['numeroControl']) ||
        !isset($alumno['nombre']) ||
        !isset($alumno['carrera']) ||
        !isset($alumno['semestre']) ||
        !isset($alumno['correo']) ||
        !isset($alumno['actividad'])
    ) {
        $failed_count++;
        $errors[] = [
            'alumno' => $alumno,
            'error' => 'Datos incompletos para este alumno en el archivo Excel.'
        ];
        continue; // Saltar a la siguiente iteración del bucle y no intentar insertar este alumno
    }

    // Sanitizar y validar los datos antes de insertarlos
    // FILTER_SANITIZE_STRING es obsoleto en PHP 8.1+, considera FILTER_UNSAFE_RAW o htmlentities()
    // Sin embargo, para este ejemplo, lo mantenemos como estaba en el contexto anterior.
    $numero_control = filter_var($alumno['numeroControl'], FILTER_SANITIZE_STRING);
    $nombre_completo = filter_var($alumno['nombre'], FILTER_SANITIZE_STRING);
    $carrera = filter_var($alumno['carrera'], FILTER_SANITIZE_STRING);
    $semestre = filter_var($alumno['semestre'], FILTER_SANITIZE_STRING);
    $actividad = filter_var($alumno['actividad'], FILTER_SANITIZE_STRING);
    $correo_electronico = filter_var($alumno['correo'], FILTER_VALIDATE_EMAIL); // Valida el formato del correo electrónico

    // Vincular los parámetros a la sentencia preparada
    // Las 's' indican que cada parámetro es de tipo string
    $stmt->bind_param("ssssss", $numero_control, $nombre_completo, $carrera, $semestre, $actividad, $correo_electronico);

    // Ejecutar la sentencia preparada
    if ($stmt->execute()) {
        $inserted_count++;
    } else {
        $failed_count++;
        $errors[] = [
            'alumno' => $alumno,
            'error' => $stmt->error // Captura el error específico de MySQL para depuración
        ];
    }
    // Después de cada execute, es una buena práctica "resetear" el stmt si vas a reutilizarlo en el mismo bucle
    // $stmt->reset(); // Esto no es estrictamente necesario si solo cambias bind_param
}

// 5. Cerrar la sentencia preparada y la conexión a la base de datos
$stmt->close();
$conexion->close();

// 6. Devolver la respuesta final al cliente (JavaScript)
if ($inserted_count > 0 && $failed_count === 0) {
    echo json_encode(['exito' => true, 'mensaje' => "$inserted_count alumnos guardados exitosamente en la base de datos."]);
} elseif ($inserted_count > 0 && $failed_count > 0) {
    echo json_encode(['exito' => true, 'mensaje' => "$inserted_count alumnos guardados, $failed_count fallidos.", 'errores' => $errors]);
} else {
    echo json_encode(['exito' => false, 'mensaje' => "No se pudo guardar ningún alumno en la base de datos.", 'errores' => $errors]);
}

?>