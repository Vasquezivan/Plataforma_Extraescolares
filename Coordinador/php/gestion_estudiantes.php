<?php
session_start();
require_once 'conexion.php'; // Archivo con la conexión a la BD

// Determinar la acción solicitada
$accion = $_GET['accion'] ?? '';

// Configuración de unidades académicas
$unidades = [
    'CIDERS' => 'CIDERS unión Hidalgo',
    'Demetrio' => 'Unidad Demetrio Vallejo en el Espinal',
    'Tlahuitoltepec' => 'Unidad Académica Tlahuitoltepec',
    'ValleEtla' => 'Valle de Etla'
];

switch ($accion) {
    case 'obtener_estudiantes':
        obtenerEstudiantes();
        break;
    case 'obtener_inscritos':
        obtenerInscritos();
        break;
    case 'actualizar_estudiante':
        actualizarEstudiante();
        break;
    case 'obtener_usuario':
        obtenerUsuario();
        break;
    default:
        echo json_encode([
            "success" => false,
            "message" => "Acción no válida. Acciones disponibles: obtener_estudiantes, obtener_inscritos, actualizar_estudiante, obtener_usuario"
        ]);
        exit;
}

// Función para obtener información del usuario actual
function obtenerUsuario() {
    global $pdo;
    
    // Obtener usuario desde POST en lugar de sesión para mayor seguridad
    $usuarioNombre = $_POST['usuario'] ?? '';
    
    if (empty($usuarioNombre)) {
        echo json_encode(['success' => false, 'message' => 'No se proporcionó usuario']);
        exit;
    }

    try {
        // Obtener información completa del usuario
        $stmt = $pdo->prepare("SELECT id, nombre, rol, unidad_academica FROM usuarios WHERE nombre = :usuario_nombre");
        $stmt->bindParam(':usuario_nombre', $usuarioNombre, PDO::PARAM_STR);
        $stmt->execute();
        
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($usuario) {
            echo json_encode([
                'success' => true,
                'id' => $usuario['id'],
                'nombre' => $usuario['nombre'],
                'rol' => $usuario['rol'],
                'unidad_academica' => $usuario['unidad_academica']
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Usuario no encontrado']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error en la base de datos: ' . $e->getMessage()]);
    }
}

// Función para obtener estudiantes según rol y unidad académica
function obtenerEstudiantes() {
    global $pdo;
    
    // Obtener rol y unidad académica del parámetro POST
    $rol = $_POST['rol'] ?? '';
    $unidad = $_POST['unidad'] ?? '';
    
    try {
        // Construir consulta según rol y filtro de unidad
        if ($rol === 'Administrador') {
            // Administrador ve todos los estudiantes
            $stmt = $pdo->prepare("
                SELECT id_alumno, nombre, id_usuario, numero_control, carrera, semestre, unidad_academica 
                FROM estudiantes 
                ORDER BY nombre
            ");
        } else if ($rol === 'Coordinador' && !empty($unidad)) {
            // Coordinador ve solo estudiantes de su unidad
            $stmt = $pdo->prepare("
                SELECT id_alumno, nombre, id_usuario, numero_control, carrera, semestre, unidad_academica 
                FROM estudiantes 
                WHERE unidad_academica = :unidad
                ORDER BY nombre
            ");
            $stmt->bindParam(':unidad', $unidad);
        } else {
            // Por defecto, no mostrar nada si no hay permisos claros
            echo json_encode([]);
            return;
        }
        
        $stmt->execute();
        $estudiantes = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode($estudiantes);
        
    } catch (PDOException $e) {
        error_log("Error al obtener estudiantes: " . $e->getMessage());
        echo json_encode([
            "error" => true,
            "message" => "Error al obtener los estudiantes: " . $e->getMessage()
        ]);
    }
}

// Función para obtener alumnos inscritos en una actividad
function obtenerInscritos() {
    global $pdo;
    
    // Verificar que se reciba el id_actividad
    if (!isset($_GET['id_actividad']) || empty($_GET['id_actividad'])) {
        echo json_encode([
            "success" => false,
            "message" => "Se requiere el ID de la actividad"
        ]);
        exit;
    }
    
    $id_actividad = intval($_GET['id_actividad']);
    
    try {
        // Obtener alumnos inscritos en la actividad
        $stmt = $pdo->prepare("
            SELECT e.id_alumno, e.nombre, e.numero_control, e.carrera, e.semestre
            FROM estudiantes e
            INNER JOIN inscripciones i ON e.id_alumno = i.id_alumno
            WHERE i.id_actividad = :id_actividad
            ORDER BY e.nombre
        ");
        $stmt->bindParam(':id_actividad', $id_actividad, PDO::PARAM_INT);
        $stmt->execute();
        
        $alumnosInscritos = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode($alumnosInscritos);
    } catch (PDOException $e) {
        error_log("Error al obtener alumnos inscritos: " . $e->getMessage());
        echo json_encode([
            "success" => false,
            "message" => "Error al procesar la solicitud: " . $e->getMessage()
        ]);
    }
}

// Función para actualizar datos de estudiante
function actualizarEstudiante() {
    global $pdo;
    
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        echo json_encode([
            "success" => false,
            "message" => "Método no permitido. Use POST."
        ]);
        exit;
    }
    
    // Validar datos requeridos
    $campos_requeridos = ['id_alumno', 'nombre', 'numero_control', 'carrera', 'semestre', 'usuario_rol'];
    foreach ($campos_requeridos as $campo) {
        if (!isset($_POST[$campo]) || empty($_POST[$campo])) {
            echo json_encode([
                "success" => false,
                "message" => "El campo $campo es requerido."
            ]);
            exit;
        }
    }
    
    $usuario_rol = $_POST['usuario_rol'];
    $usuario_unidad = $_POST['usuario_unidad'] ?? '';
    $id_alumno = intval($_POST['id_alumno']);
    
    try {
        // Verificar permisos según el rol
        if ($usuario_rol === 'Coordinador') {
            // Coordinador solo puede editar estudiantes de su unidad
            $stmt = $pdo->prepare("SELECT unidad_academica FROM estudiantes WHERE id_alumno = :id");
            $stmt->bindParam(':id', $id_alumno, PDO::PARAM_INT);
            $stmt->execute();
            
            $estudiante = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if (!$estudiante || $estudiante['unidad_academica'] !== $usuario_unidad) {
                echo json_encode([
                    "success" => false,
                    "message" => "No tiene permisos para modificar estudiantes de otra unidad académica."
                ]);
                exit;
            }
        } else if ($usuario_rol !== 'Administrador') {
            // Solo administradores y coordinadores pueden editar
            echo json_encode([
                "success" => false,
                "message" => "No tiene permisos para modificar estudiantes."
            ]);
            exit;
        }
        
        // Actualizar datos del estudiante
        $stmt = $pdo->prepare("
            UPDATE estudiantes 
            SET nombre = :nombre, numero_control = :numero_control, 
                carrera = :carrera, semestre = :semestre 
            WHERE id_alumno = :id_alumno
        ");
        
        $stmt->bindParam(':nombre', $_POST['nombre']);
        $stmt->bindParam(':numero_control', $_POST['numero_control']);
        $stmt->bindParam(':carrera', $_POST['carrera']);
        $stmt->bindParam(':semestre', $_POST['semestre']);
        $stmt->bindParam(':id_alumno', $id_alumno, PDO::PARAM_INT);
        
        if ($stmt->execute()) {
            echo json_encode([
                "success" => true,
                "message" => "Registro actualizado correctamente."
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "Error al actualizar el registro."
            ]);
        }
        
    } catch (PDOException $e) {
        error_log("Error al actualizar estudiante: " . $e->getMessage());
        echo json_encode([
            "success" => false,
            "message" => "Error al actualizar el estudiante: " . $e->getMessage()
        ]);
    }
}
?>