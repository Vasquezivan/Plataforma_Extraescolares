<?php
session_start();
require_once 'conexion.php'; // Archivo con la conexión a la BD

// Determinar la acción solicitada
$accion = $_GET['accion'] ?? '';

// Configuración de unidades académicas
$unidades = [
    'CIDERS' => 'CIDERS unión Hidalgo',
    'Ingeniería' => 'Facultad de Ingeniería',
    'Ciencias' => 'Facultad de Ciencias',
    // agrega las que tengas...
];

// 🚩 Verificar sesión y rol
if (!isset($_SESSION['rol'])) {
    echo "No has iniciado sesión.";
    exit;
}

$rol = $_SESSION['rol'];
$unidad_usuario = $_SESSION['unidad'] ?? null; // Esto lo guardas al iniciar sesión del coordinador

// Consultar según rol
$query = "";
if ($rol === "Administrador") {
    // Puede ver todo
    $query = "SELECT * FROM estudiantes";
} elseif ($rol === "Coordinador" && $unidad_usuario) {
    // Solo puede ver SU unidad
    $query = "SELECT * FROM estudiantes WHERE unidad = '$unidad_usuario'";
} else {
    echo "No tienes permisos para acceder a esta información.";
    exit;
}

// Ejecutar consulta
$resultado = $conn->query($query);

// Mostrar tabla
echo "<table border='1' class='table table-bordered'>";
echo "<tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Unidad</th>
        <th>Opción</th>
      </tr>";

while ($fila = $resultado->fetch_assoc()) {
    echo "<tr>
            <td>{$fila['id']}</td>
            <td>{$fila['nombre']}</td>
            <td>{$fila['unidad']}</td>
            <td><a href='detalle.php?id={$fila['id']}'>Ver más</a></td>
          </tr>";
}
echo "</table>";
?>
