<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Considera restringir esto al origen de tu frontend en producción

// Parámetros de conexión a la base de datos (reemplaza con tus credenciales reales)
$servername = "localhost";
$username = "root"; // Tu nombre de usuario de la base de datos
$password = ""; // Tu contraseña de la base de datos
$dbname = "extraescolares"; // Tu nombre de la base de datos (asegúrate de que esta base de datos y la tabla 'estudiantes' existan)

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode(["exito" => false, "mensaje" => "Fallo en la conexión: " . $conn->connect_error]));
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    // Manejar la solicitud POST (guardar estudiantes desde Excel)
    $data = json_decode(file_get_contents("php://input"), true);

    if (empty($data)) {
        echo json_encode(["exito" => false, "mensaje" => "No se recibieron datos."]);
        exit;
    }

    $exito = true;
    $errores = [];
    $alumnosGuardados = 0;

    foreach ($data as $student) {
        // Asegurarse de que las claves coincidan con lo enviado desde JavaScript y limpiar espacios
        $numeroControl = $conn->real_escape_string(trim($student['numeroControl'] ?? ''));
        $nombre = $conn->real_escape_string(trim($student['nombre'] ?? ''));
        $carrera = $conn->real_escape_string(trim($student['carrera'] ?? ''));
        $semestre = $conn->real_escape_string(trim($student['semestre'] ?? ''));
        $actividad = $conn->real_escape_string(trim($student['actividad'] ?? ''));
        $correo = $conn->real_escape_string(trim($student['correo'] ?? ''));

        // Validación básica (añade más según sea necesario)
        if (empty($numeroControl) || empty($nombre) || empty($actividad)) {
            $errores[] = "Faltan datos requeridos para un estudiante (No. Control, Nombre o Actividad).";
            continue;
        }

        // Verificar si el estudiante con este número de control ya existe para esta actividad
        $check_sql = "SELECT COUNT(*) FROM estudiantes WHERE numeroControl = '$numeroControl' AND actividad = '$actividad'";
        $result = $conn->query($check_sql);
        $row = $result->fetch_row();

        if ($row[0] > 0) {
            // Estudiante ya registrado para esta actividad, omitir o actualizar
            $errores[] = "Alumno con No. Control '{$numeroControl}' ya está registrado en '{$actividad}'.";
            // Opcional: Actualizar el registro existente en lugar de omitirlo
            // $update_sql = "UPDATE estudiantes SET nombre = '$nombre', carrera = '$carrera', semestre = '$semestre', correo = '$correo' WHERE numeroControl = '$numeroControl' AND actividad = '$actividad'";
            // if (!$conn->query($update_sql)) {
            //     $errores[] = "Error al actualizar alumno '{$nombre}': " . $conn->error;
            // }
            continue;
        }

        // Insertar nuevo estudiante
        $sql = "INSERT INTO estudiantes (numeroControl, nombre, carrera, semestre, actividad, correo) VALUES ('$numeroControl', '$nombre', '$carrera', '$semestre', '$actividad', '$correo')";

        if ($conn->query($sql) === TRUE) {
            $alumnosGuardados++;
        } else {
            $errores[] = "Error al insertar alumno '{$nombre}': " . $conn->error;
            $exito = false;
        }
    }

    if ($exito && empty($errores)) {
        echo json_encode(["exito" => true, "mensaje" => "Todos los {$alumnosGuardados} alumnos se guardaron correctamente."]);
    } else {
        echo json_encode([
            "exito" => false,
            "mensaje" => "Se guardaron {$alumnosGuardados} alumnos, pero hubo errores con otros. " . (empty($errores) ? "Error desconocido." : implode(", ", $errores)),
            "errores" => $errores
        ]);
    }

} elseif ($method === 'GET') {
    // Manejar la solicitud GET (obtener todos los estudiantes o filtrar por actividad)
    $activity_filter = isset($_GET['actividad']) ? $conn->real_escape_string($_GET['actividad']) : '';

    $sql = "SELECT * FROM estudiantes";
    if (!empty($activity_filter)) {
        $sql .= " WHERE actividad = '$activity_filter'";
    }
    $sql .= " ORDER BY nombre ASC"; // Ordenar por nombre para una mejor visualización

    $result = $conn->query($sql);

    $students = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $students[] = $row;
        }
    }

    echo json_encode(["exito" => true, "data" => $students, "mensaje" => "Datos de alumnos recuperados exitosamente."]);

} else {
    // Manejar otros métodos HTTP
    http_response_code(405); // Método no permitido
    echo json_encode(["exito" => false, "mensaje" => "Método no permitido."]);
}

$conn->close();
?>