// Datos iniciales 
let unidadesAcademicas = [
  "CIDERS unión Hidalgo",
  "Unidad Demetrio Vallejo en el Espinal", 
  "Unidad académica Tlahuitoltepec",
  "Valle de Etla"
];

const datosUnidades = {
  "CIDERS unión Hidalgo": {
    actividades: ["Basquetbol", "Danza", "Escolta"],
    alumnos: {
      Basquetbol: [
        { nombre: "Juan Pérez", control: "20500123", semestre: "4º", carrera: "Ingeniería Electrónica" },
        { nombre: "Laura González", control: "20500130", semestre: "3º", carrera: "Ingeniería Mecánica" }
      ],
      Danza: [
        { nombre: "Carlos Méndez", control: "20500124", semestre: "3º", carrera: "Ingeniería Industrial" },
        { nombre: "Silvia Ramos", control: "20500140", semestre: "4º", carrera: "Ingeniería Biomédica" }
      ],
      Escolta: [
        { nombre: "Ana Gómez", control: "20500125", semestre: "5º", carrera: "Ingeniería Mecánica" }
      ]
    }
  },
  "Unidad Demetrio Vallejo en el Espinal": {
    actividades: ["Futbol", "Atletismo"],
    alumnos: {
      Futbol: [
        { nombre: "Luis Fernández", control: "20500126", semestre: "2º", carrera: "Ingeniería en Sistemas Computacionales" },
        { nombre: "Jorge Sánchez", control: "20500135", semestre: "3º", carrera: "Ingeniería Industrial" }
      ],
      Atletismo: [
        { nombre: "Roberto Díaz", control: "20500127", semestre: "6º", carrera: "Ingeniería Civil" },
        { nombre: "Patricia Pérez", control: "20500160", semestre: "5º", carrera: "Ingeniería Electrónica" }
      ]
    }
  },
  "Unidad académica Tlahuitoltepec": {
    actividades: ["Escolta", "Danza"],
    alumnos: {
      Escolta: [
        { nombre: "José López", control: "20500150", semestre: "2º", carrera: "Ingeniería Civil" },
        { nombre: "Ana Gómez", control: "20500125", semestre: "5º", carrera: "Ingeniería Mecánica" }
      ],
      Danza: [
        { nombre: "Carlos Méndez", control: "20500124", semestre: "3º", carrera: "Ingeniería Industrial" },
        { nombre: "Silvia Ramos", control: "20500140", semestre: "4º", carrera: "Ingeniería Biomédica" }
      ]
    }
  },
  "Valle de Etla": {
    actividades: ["Basquetbol", "Futbol"],
    alumnos: {
      Basquetbol: [
        { nombre: "Laura González", control: "20500130", semestre: "3º", carrera: "Ingeniería Mecánica" },
        { nombre: "Juan Pérez", control: "20500123", semestre: "4º", carrera: "Ingeniería Electrónica" }
      ],
      Futbol: [
        { nombre: "Luis Fernández", control: "20500126", semestre: "2º", carrera: "Ingeniería en Sistemas Computacionales" },
        { nombre: "Jorge Sánchez", control: "20500135", semestre: "3º", carrera: "Ingeniería Industrial" }
      ]
    }
  }
};

// Variables para el manejo de unidades académicas
let modoEdicion = false;
let unidadSeleccionada = null;

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
  const mainContent = document.querySelector('.main-content');

  // Mostrar contenido de inicio al cargar la página
  mostrarInicio();

  // Configurar navegación en el dashboard
  document.querySelector('.inicio-dashboard').addEventListener('click', function() {
    mostrarInicio();
  });

  // Configurar navegación para Gestión de Usuarios
  const gestionUsuarios = document.querySelector('.gestion-usuarios');
  if (gestionUsuarios) {
    gestionUsuarios.addEventListener('click', function() {
      mostrarGestionUsuarios();
    });
  }

  // Evento global para botones agregar, editar y eliminar usuarios
  document.addEventListener('click', function(event) {
    // Manejar botón para agregar usuario
    const btnAgregarUsuario = event.target.closest('#btnAgregarUsuario');
    if (btnAgregarUsuario) {
      mostrarModalAgregarUsuario();
    }

    // Manejar botón para editar usuario
    const btnEditarUsuario = event.target.closest('.fa-edit');
    if (btnEditarUsuario) {
      const filaUsuario = btnEditarUsuario.closest('tr');
      editarUsuario(filaUsuario);
    }

    // Manejar botón para eliminar usuario
    const btnEliminarUsuario = event.target.closest('.fa-trash');
    if (btnEliminarUsuario) {
      const filaUsuario = btnEliminarUsuario.closest('tr');
      eliminarUsuario(filaUsuario);
    }
  });

  // Evento para cerrar modales
  document.addEventListener('click', function(event) {
    // Cerrar modal de agregar usuario
    if (event.target.id === 'btnCerrarModal') {
      cerrarModalUsuario();
    }

    // Cerrar modal de editar usuario
    if (event.target.id === 'btnCerrarModalEditar') {
      const modal = document.getElementById('modalEditarUsuario');
      if (modal) {
        modal.parentNode.removeChild(modal);
      }
    }
  });
});

// Función para mostrar la página de inicio
function mostrarInicio() {
  const mainContent = document.querySelector('.main-content');
  mainContent.innerHTML = `
    <div class="bienvenida-panel" style="text-align: center; margin-top: 50px;">
      <h1 style="font-family: 'Segoe UI', sans-serif; color:#1B396A; font-size: 36px;">Bienvenido al Panel Administrador</h1>
      <p style="font-family: 'Segoe UI', sans-serif; color: #555; font-size: 18px; margin-top: 20px;">Aquí podrás gestionar las actividades extraescolares, administrar usuarios y mucho más.</p>
      <img src="./assets/img/Logo TecNM.png" alt="Logo TecNM" style="width: 150px; margin-top: 30px;">
      <div style="margin-top: 25px;">
        <!-- Botón Panel Coordinador -->
        <a href="../Coordinador/Pagina principal.html" class="btn-coordinador" style="background-color: #ff7f00; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; transition: background-color 0.3s; display: inline-flex; align-items: center; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
          <i class="fas fa-user-cog" style="margin-right: 8px;"></i>Panel Coordinador
        </a>
      </div>
    </div>
  `;
}

// Función para mostrar la sección de gestión de usuarios
function mostrarGestionUsuarios() {
  const mainContent = document.querySelector('.main-content');
  
  mainContent.innerHTML = `
    <div class="gestion-usuarios" style="margin-top: 20px;">
      <h1 class="titulo-recuadro" style="font-family: 'Segoe UI', sans-serif; color: #1B396A; font-size: 24px; text-align: center;">G E S T I Ó N &nbsp; D E &nbsp; U S U A R I O S</h1>
      <p class="mb-4" style="font-family: 'Segoe UI', sans-serif; color: #555; font-size: 16px; text-align: center; margin-top: 10px;">Administra de forma sencilla la información de los usuarios. Agrega, edita o elimina perfiles, y controla los accesos al sistema de manera eficiente y segura.</p>

      <div class="card shadow mb-4" style="margin: 0 auto; max-width: 90%;">
        <div class="card-header py-3 encabezado-con-boton" style="display: flex; justify-content: space-between; align-items: center; background-color: #1B396A; color: white; padding: 10px; border-radius: 5px;">
          <h6 class="m-0 font-weight-bold text-primary" style="font-family: 'Segoe UI', sans-serif; font-size: 18px; color: white;">Tabla de datos</h6>
          <button class="btn btn-personalizado btn-sm btn-agregar-usuario" id="btnAgregarUsuario" style="background-color: #ff7f00; color: white; padding: 5px 10px; border: none; border-radius: 5px; font-size: 14px; cursor: pointer;">
            <i class="fas fa-user-plus"></i> Agregar
          </button>
        </div>

        <div class="card-body" style="padding: 15px; background-color: white;">
          <!-- Añadido nuevo campo de búsqueda para usuarios -->
          <div style="margin-bottom: 15px;">
            <input type="text" id="busquedaUsuarios" placeholder="Buscar usuario..." style="width: 50%; padding: 10px; border: 1px solid #ccc; border-radius: 5px; font-size: 14px;" onkeyup="filtrarUsuarios()">
          </div>
          
          <div class="table-responsive" style="overflow-x: auto;">
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0" style="font-family: 'Segoe UI', sans-serif; font-size: 14px;">
              <thead>
                <tr style="background-color: #1B396A; color: white;">
                  <th>Nombre</th>
                  <th>Contacto</th>
                  <th>Contraseña</th>
                  <th>Unidad Académica</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody id="tablaUsuarios">
                <!-- Los usuarios se cargarán desde la base de datos -->
                <tr>
                  <td colspan="6" style="text-align: center; padding: 20px;">
                    <i class="fas fa-spinner fa-spin" style="font-size: 30px; color: #1B396A;"></i>
                    <p style="margin-top: 10px;">Cargando usuarios...</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Cargar usuarios
  cargarUsuariosDesdeBaseDeDatos();
}

// Función para mostrar información de una unidad académica
function mostrarInformacionUnidad(unidad) {
  // Si es la unidad de Unión Hidalgo, obtenemos los datos de la base de datos
  if (unidad === "CIDERS unión Hidalgo") {
    cargarDatosUnionHidalgo();
    return;
  } else if (unidad === "Unidad Demetrio Vallejo en el Espinal") {
    cargarDatosDemetrioVallejo();
    return;
  } else if (unidad === "Unidad académica Tlahuitoltepec") {
    cargarDatosTlahuitoltepec();
    return;
  } else if (unidad === "Valle de Etla") {
    cargarDatosValleEtla();
    return;
  }
  
  // Para las demás unidades, seguimos usando los datos estáticos
  const datosUnidad = datosUnidades[unidad];
  if (!datosUnidad) {
    console.error("No se encontraron datos para la unidad:", unidad);
    return;
  }

  // Determinar el archivo HTML correcto según la unidad
  let archivoHTML = '';
  if (unidad === "Unidad Demetrio Vallejo en el Espinal") {
    archivoHTML = "U_Demetrio.html";
  } else if (unidad === "Unidad académica Tlahuitoltepec") {
    archivoHTML = "U_SantaMaria.html";
  } else if (unidad === "Valle de Etla") {
    archivoHTML = "U_ValleEtla.html";
  }

  const mainContent = document.querySelector('.main-content');
  mainContent.innerHTML = `
    <div class="encabezado-modal">
      <img src="./assets/img/Logo TecNM.png" alt="Logo TecNM" class="logo-modal">
      <h2 class="titulo-modal">Actividades Extraescolares - ${unidad}</h2>
    </div>

    <div class="barra-actividades">
      ${datosUnidad.actividades.map((actividad, index) => 
        `<button class="boton-actividad${index === 0 ? ' activo' : ''}" data-actividad="${actividad}">${actividad}</button>`
      ).join('')}
    </div>

    <div class="seccion-alumnos">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h3 class="titulo-centrado" id="tituloActividad">Alumnos inscritos a ${datosUnidad.actividades[0]}</h3>
        
        <!-- Botón Vista Previa más pequeño y a la derecha -->
        <a href="./${archivoHTML}" class="btn-vista-previa" style="background-color: #ff7f00; color: white; padding: 8px 15px; text-decoration: none; border-radius: 4px; font-weight: bold; transition: background-color 0.3s; display: inline-flex; align-items: center; box-shadow: 0 2px 5px rgba(0,0,0,0.2); font-size: 13px;">
          <i class="fas fa-eye" style="margin-right: 5px;"></i>Vista Previa
        </a>
      </div>

      <div class="contenedor-busqueda">
        <input type="text" id="busquedaAlumnos" placeholder="Buscar alumno..." class="busqueda-input" onkeyup="filtrarTabla()">
        <div class="contador-alumnos" id="contadorAlumnos">
          <span class="numero">${datosUnidad.alumnos[datosUnidad.actividades[0]].length}</span> alumnos inscritos
        </div>
      </div>

      <div class="contenedor-tabla">
        <table class="tabla-alumnos">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>No. de Control</th>
              <th>Semestre</th>
              <th>Carrera</th>
            </tr>
          </thead>
          <tbody id="cuerpoTablaAlumnos">
            ${datosUnidad.alumnos[datosUnidad.actividades[0]].map((alumno, index) => 
              `<tr class="alumno-${datosUnidad.actividades[0].toLowerCase()}">
                <td>${index + 1}</td>
                <td>${alumno.nombre}</td>
                <td>${alumno.control}</td>
                <td>${alumno.semestre}</td>
                <td>${alumno.carrera}</td>
              </tr>`
            ).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
  
  // Configurar eventos para botones de actividades
  configurarEventosUnidad(unidad);
}

// Función para cargar los datos de la unidad de Unión Hidalgo desde la base de datos
function cargarDatosUnionHidalgo() {
  const mainContent = document.querySelector('.main-content');
  
  // Mostrar indicador de carga
  mainContent.innerHTML = `
    <div class="cargando" style="text-align: center; padding: 50px;">
      <i class="fas fa-spinner fa-spin" style="font-size: 40px; color: #1B396A;"></i>
      <p style="margin-top: 20px; color: #555; font-size: 18px;">Cargando actividades de CIDERS unión Hidalgo...</p>
    </div>
  `;

  // Primero obtenemos las actividades disponibles para esta unidad
  fetch('./php/obtener_actividades_union.php')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener actividades');
      }
      return response.json();
    })
    .then(actividades => {
      if (!actividades || actividades.length === 0) {
        mostrarMensajeNoActividades();
        return;
      }
      
      // Ya tenemos las actividades, ahora construimos la interfaz
      construirInterfazUnionHidalgo(actividades);
      
      // Seleccionamos la primera actividad por defecto
      if (actividades.length > 0) {
        cargarAlumnosActividad(actividades[0].id_actividad, actividades[0].nombre_actividad);
      }
    })
    .catch(error => {
      console.error('Error al cargar actividades:', error);
      mostrarErrorCarga();
    });
}

// Función para mostrar mensaje cuando no hay actividades
function mostrarMensajeNoActividades() {
  const mainContent = document.querySelector('.main-content');
  mainContent.innerHTML = `
    <div class="encabezado-modal">
      <img src="./assets/img/Logo TecNM.png" alt="Logo TecNM" class="logo-modal">
      <h2 class="titulo-modal">Actividades Extraescolares - CIDERS unión Hidalgo</h2>
    </div>
    
    <div class="sin-actividades" style="text-align: center; padding: 50px; background-color: white; border-radius: 8px; margin-top: 20px;">
      <i class="fas fa-exclamation-circle" style="font-size: 50px; color: #ff7f00; margin-bottom: 20px;"></i>
      <h3 style="color: #1B396A; margin-bottom: 15px;">No hay actividades registradas</h3>
      <p style="color: #555; font-size: 16px;">No se encontraron actividades extraescolares para esta unidad académica.</p>
      <a href="./U_CentrodeInvestigacion.html" class="btn-vista-previa" style="background-color: #ff7f00; color: white; padding: 8px 15px; text-decoration: none; border-radius: 4px; font-weight: bold; transition: background-color 0.3s; display: inline-flex; align-items: center; margin-top: 20px; justify-content: center; max-width: 200px; margin-left: auto; margin-right: auto;">
        <i class="fas fa-plus" style="margin-right: 5px;"></i>Ir a gestión de actividades
      </a>
    </div>
  `;
}

// Función para mostrar mensaje de error
function mostrarErrorCarga() {
  const mainContent = document.querySelector('.main-content');
  mainContent.innerHTML = `
    <div class="encabezado-modal">
      <img src="./assets/img/Logo TecNM.png" alt="Logo TecNM" class="logo-modal">
      <h2 class="titulo-modal">Actividades Extraescolares - CIDERS unión Hidalgo</h2>
    </div>
    
    <div class="error" style="text-align: center; padding: 50px; background-color: white; border-radius: 8px; margin-top: 20px;">
      <i class="fas fa-exclamation-triangle" style="font-size: 50px; color: #d33; margin-bottom: 20px;"></i>
      <h3 style="color: #1B396A; margin-bottom: 15px;">Error de conexión</h3>
      <p style="color: #555; font-size: 16px;">No se pudieron cargar las actividades desde la base de datos. Por favor, verifique su conexión e intente nuevamente.</p>
      <button onclick="cargarDatosUnionHidalgo()" class="btn-reintentar" style="background-color: #1B396A; color: white; border: none; padding: 10px 20px; border-radius: 5px; margin-top: 20px; cursor: pointer;">
        <i class="fas fa-sync-alt" style="margin-right: 5px;"></i>Reintentar
      </button>
    </div>
  `;
}

// Función para construir la interfaz con las actividades obtenidas
function construirInterfazUnionHidalgo(actividades) {
  const mainContent = document.querySelector('.main-content');
  
  // Construimos los botones de actividades
  const botonesActividades = actividades.map((actividad, index) => 
    `<button class="boton-actividad${index === 0 ? ' activo' : ''}" data-id="${actividad.id_actividad}" data-nombre="${actividad.nombre_actividad}">${actividad.nombre_actividad}</button>`
  ).join('');
  
  mainContent.innerHTML = `
    <div class="encabezado-modal">
      <img src="./assets/img/Logo TecNM.png" alt="Logo TecNM" class="logo-modal">
      <h2 class="titulo-modal">Actividades Extraescolares - CIDERS unión Hidalgo</h2>
    </div>

    <div class="barra-actividades">
      ${botonesActividades}
    </div>

    <div class="seccion-alumnos">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h3 class="titulo-centrado" id="tituloActividad">Alumnos inscritos a ${actividades[0].nombre_actividad}</h3>
        
        <!-- Botón Vista Previa más pequeño y a la derecha -->
        <a href="./U_CentrodeInvestigacion.html" class="btn-vista-previa" style="background-color: #ff7f00; color: white; padding: 8px 15px; text-decoration: none; border-radius: 4px; font-weight: bold; transition: background-color 0.3s; display: inline-flex; align-items: center; box-shadow: 0 2px 5px rgba(0,0,0,0.2); font-size: 13px;">
          <i class="fas fa-eye" style="margin-right: 5px;"></i>Vista Previa
        </a>
      </div>

      <div class="contenedor-busqueda">
        <input type="text" id="busquedaAlumnos" placeholder="Buscar alumno..." class="busqueda-input" onkeyup="filtrarTabla()">
        <div class="contador-alumnos" id="contadorAlumnos">
          <i class="fas fa-spinner fa-spin" style="margin-right: 5px;"></i> Cargando alumnos...
        </div>
      </div>

      <div class="contenedor-tabla">
        <table class="tabla-alumnos">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>No. de Control</th>
              <th>Semestre</th>
              <th>Carrera</th>
            </tr>
          </thead>
          <tbody id="cuerpoTablaAlumnos">
            <tr>
              <td colspan="5" style="text-align: center; padding: 20px;">
                <i class="fas fa-spinner fa-spin" style="font-size: 30px; color: #1B396A;"></i>
                <p style="margin-top: 10px;">Cargando alumnos...</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
  
  // Configurar eventos para los botones de actividades
  configurarEventosUnidadHidalgo(actividades);
}

// Función para cargar los alumnos de una actividad específica
function cargarAlumnosActividad(idActividad, nombreActividad) {
  // Actualizar título
  const tituloActividad = document.getElementById('tituloActividad');
  if (tituloActividad) {
    tituloActividad.textContent = `Alumnos inscritos a ${nombreActividad}`;
  }
  
  // Mostrar spinner mientras se cargan los alumnos
  const cuerpoTabla = document.getElementById('cuerpoTablaAlumnos');
  const contadorAlumnos = document.getElementById('contadorAlumnos');
  
  if (cuerpoTabla) {
    cuerpoTabla.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; padding: 20px;">
          <i class="fas fa-spinner fa-spin" style="font-size: 30px; color: #1B396A;"></i>
          <p style="margin-top: 10px;">Cargando alumnos...</p>
        </td>
      </tr>
    `;
  }
  
  if (contadorAlumnos) {
    contadorAlumnos.innerHTML = `<i class="fas fa-spinner fa-spin" style="margin-right: 5px;"></i> Cargando alumnos...`;
  }
  
  // Hacer la solicitud para obtener los alumnos inscritos en esta actividad
  fetch(`./php/obtener_alumnos_inscritos_union.php?id_actividad=${idActividad}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener alumnos');
      }
      return response.json();
    })
    .then(alumnos => {
      if (cuerpoTabla) {
        if (!alumnos || alumnos.length === 0) {
          cuerpoTabla.innerHTML = `
            <tr>
              <td colspan="5" style="text-align: center; padding: 20px; color: #666;">
                No hay estudiantes registrados en esta actividad
              </td>
            </tr>
          `;
          
          if (contadorAlumnos) {
            contadorAlumnos.innerHTML = `<span class="numero">0</span> alumnos inscritos`;
          }
          
          return;
        }
        
        // Llenar la tabla con los alumnos
        cuerpoTabla.innerHTML = alumnos.map((alumno, index) => `
          <tr class="alumno-${nombreActividad.toLowerCase()}">
            <td>${index + 1}</td>
            <td>${alumno.nombre}</td>
            <td>${alumno.control}</td>
            <td>${alumno.semestre}</td>
            <td>${alumno.carrera}</td>
          </tr>
        `).join('');
        
        // Actualizar contador
        if (contadorAlumnos) {
          contadorAlumnos.innerHTML = `<span class="numero">${alumnos.length}</span> alumnos inscritos`;
        }
      }
    })
    .catch(error => {
      console.error('Error al cargar alumnos:', error);
      if (cuerpoTabla) {
        cuerpoTabla.innerHTML = `
          <tr>
            <td colspan="5" style="text-align: center; padding: 20px; color: #d33;">
              <i class="fas fa-exclamation-triangle" style="margin-right: 10px;"></i>
              Error al cargar los estudiantes. Por favor, intente nuevamente.
            </td>
          </tr>
        `;
      }
      
      if (contadorAlumnos) {
        contadorAlumnos.innerHTML = `<span class="numero">0</span> alumnos inscritos`;
      }
    });
}

// Función para cargar los datos de la Unidad Demetrio Vallejo desde la base de datos
function cargarDatosDemetrioVallejo() {
  const mainContent = document.querySelector('.main-content');
  
  // Mostrar indicador de carga
  mainContent.innerHTML = `
    <div class="cargando" style="text-align: center; padding: 50px;">
      <i class="fas fa-spinner fa-spin" style="font-size: 40px; color: #1B396A;"></i>
      <p style="margin-top: 20px; color: #555; font-size: 18px;">Cargando actividades de Unidad Demetrio Vallejo en el Espinal...</p>
    </div>
  `;

  // Obtenemos las actividades disponibles para esta unidad
  fetch('./php/obtener_actividades_demetrio.php')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener actividades');
      }
      return response.json();
    })
    .then(actividades => {
      if (!actividades || actividades.length === 0) {
        mostrarMensajeNoActividadesDemetrio();
        return;
      }
      
      // Ya tenemos las actividades, ahora construimos la interfaz
      construirInterfazDemetrioVallejo(actividades);
      
      // Seleccionamos la primera actividad por defecto
      if (actividades.length > 0) {
        cargarAlumnosActividadDemetrio(actividades[0].id_actividad, actividades[0].nombre_actividad);
      }
    })
    .catch(error => {
      console.error('Error al cargar actividades de Demetrio Vallejo:', error);
      mostrarErrorCargaDemetrio();
    });
}

// Función para mostrar mensaje cuando no hay actividades en Demetrio Vallejo
function mostrarMensajeNoActividadesDemetrio() {
  const mainContent = document.querySelector('.main-content');
  mainContent.innerHTML = `
    <div class="encabezado-modal">
      <img src="./assets/img/Logo TecNM.png" alt="Logo TecNM" class="logo-modal">
      <h2 class="titulo-modal">Actividades Extraescolares - Unidad Demetrio Vallejo en el Espinal</h2>
    </div>
    
    <div class="sin-actividades" style="text-align: center; padding: 50px; background-color: white; border-radius: 8px; margin-top: 20px;">
      <i class="fas fa-exclamation-circle" style="font-size: 50px; color: #ff7f00; margin-bottom: 20px;"></i>
      <h3 style="color: #1B396A; margin-bottom: 15px;">No hay actividades registradas</h3>
      <p style="color: #555; font-size: 16px;">No se encontraron actividades extraescolares para esta unidad académica.</p>
      <a href="./U_CentrodeInvestigacion.html" class="btn-vista-previa" style="background-color: #ff7f00; color: white; padding: 8px 15px; text-decoration: none; border-radius: 4px; font-weight: bold; transition: background-color 0.3s; display: inline-flex; align-items: center; margin-top: 20px; justify-content: center; max-width: 200px; margin-left: auto; margin-right: auto;">
        <i class="fas fa-plus" style="margin-right: 5px;"></i>Ir a gestión de actividades
      </a>
    </div>
  `;
}

// Función para mostrar mensaje de error en carga de Demetrio Vallejo
function mostrarErrorCargaDemetrio() {
  const mainContent = document.querySelector('.main-content');
  mainContent.innerHTML = `
    <div class="encabezado-modal">
      <img src="./assets/img/Logo TecNM.png" alt="Logo TecNM" class="logo-modal">
      <h2 class="titulo-modal">Actividades Extraescolares - Unidad Demetrio Vallejo en el Espinal</h2>
    </div>
    
    <div class="error" style="text-align: center; padding: 50px; background-color: white; border-radius: 8px; margin-top: 20px;">
      <i class="fas fa-exclamation-triangle" style="font-size: 50px; color: #d33; margin-bottom: 20px;"></i>
      <h3 style="color: #1B396A; margin-bottom: 15px;">Error de conexión</h3>
      <p style="color: #555; font-size: 16px;">No se pudieron cargar las actividades desde la base de datos. Por favor, verifique su conexión e intente nuevamente.</p>
      <button onclick="cargarDatosDemetrioVallejo()" class="btn-reintentar" style="background-color: #1B396A; color: white; border: none; padding: 10px 20px; border-radius: 5px; margin-top: 20px; cursor: pointer;">
        <i class="fas fa-sync-alt" style="margin-right: 5px;"></i>Reintentar
      </button>
    </div>
  `;
}

// Función para construir la interfaz con las actividades obtenidas para Demetrio Vallejo
function construirInterfazDemetrioVallejo(actividades) {
  const mainContent = document.querySelector('.main-content');
  
  // Construimos los botones de actividades
  const botonesActividades = actividades.map((actividad, index) => 
    `<button class="boton-actividad${index === 0 ? ' activo' : ''}" data-id="${actividad.id_actividad}" data-nombre="${actividad.nombre_actividad}">${actividad.nombre_actividad}</button>`
  ).join('');
  
  mainContent.innerHTML = `
    <div class="encabezado-modal">
      <img src="./assets/img/Logo TecNM.png" alt="Logo TecNM" class="logo-modal">
      <h2 class="titulo-modal">Actividades Extraescolares - Unidad Demetrio Vallejo en el Espinal</h2>
    </div>

    <div class="barra-actividades">
      ${botonesActividades}
    </div>

    <div class="seccion-alumnos">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h3 class="titulo-centrado" id="tituloActividad">Alumnos inscritos a ${actividades[0].nombre_actividad}</h3>
        
        <!-- Botón Vista Previa más pequeño y a la derecha -->
        <a href="./U_Demetrio.html" class="btn-vista-previa" style="background-color: #ff7f00; color: white; padding: 8px 15px; text-decoration: none; border-radius: 4px; font-weight: bold; transition: background-color 0.3s; display: inline-flex; align-items: center; box-shadow: 0 2px 5px rgba(0,0,0,0.2); font-size: 13px;">
          <i class="fas fa-eye" style="margin-right: 5px;"></i>Vista Previa
        </a>
      </div>

      <div class="contenedor-busqueda">
        <input type="text" id="busquedaAlumnos" placeholder="Buscar alumno..." class="busqueda-input" onkeyup="filtrarTabla()">
        <div class="contador-alumnos" id="contadorAlumnos">
          <i class="fas fa-spinner fa-spin" style="margin-right: 5px;"></i> Cargando alumnos...
        </div>
      </div>

      <div class="contenedor-tabla">
        <table class="tabla-alumnos">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>No. de Control</th>
              <th>Semestre</th>
              <th>Carrera</th>
            </tr>
          </thead>
          <tbody id="cuerpoTablaAlumnos">
            <tr>
              <td colspan="5" style="text-align: center; padding: 20px;">
                <i class="fas fa-spinner fa-spin" style="font-size: 30px; color: #1B396A;"></i>
                <p style="margin-top: 10px;">Cargando alumnos...</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
  
  // Configurar eventos para los botones de actividades
  configurarEventosUnidadHidalgo(actividades);
}

// Función para cargar los alumnos de una actividad específica en Demetrio Vallejo
function cargarAlumnosActividadDemetrio(idActividad, nombreActividad) {
  // Actualizar título
  const tituloActividad = document.getElementById('tituloActividad');
  if (tituloActividad) {
    tituloActividad.textContent = `Alumnos inscritos a ${nombreActividad}`;
  }
  
  // Mostrar spinner mientras se cargan los alumnos
  const cuerpoTabla = document.getElementById('cuerpoTablaAlumnos');
  const contadorAlumnos = document.getElementById('contadorAlumnos');
  
  if (cuerpoTabla) {
    cuerpoTabla.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; padding: 20px;">
          <i class="fas fa-spinner fa-spin" style="font-size: 30px; color: #1B396A;"></i>
          <p style="margin-top: 10px;">Cargando alumnos...</p>
        </td>
      </tr>
    `;
  }
  
  if (contadorAlumnos) {
    contadorAlumnos.innerHTML = `<i class="fas fa-spinner fa-spin" style="margin-right: 5px;"></i> Cargando alumnos...`;
  }
  
  // Hacer la solicitud para obtener los alumnos inscritos en esta actividad
  fetch(`./php/obtener_alumnos_inscritos_demetrio.php?id_actividad=${idActividad}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener alumnos');
      }
      return response.json();
    })
    .then(alumnos => {
      if (cuerpoTabla) {
        if (!alumnos || alumnos.length === 0) {
          cuerpoTabla.innerHTML = `
            <tr>
              <td colspan="5" style="text-align: center; padding: 20px; color: #666;">
                No hay estudiantes registrados en esta actividad
              </td>
            </tr>
          `;
          
          if (contadorAlumnos) {
            contadorAlumnos.innerHTML = `<span class="numero">0</span> alumnos inscritos`;
          }
          
          return;
        }
        
        // Llenar la tabla con los alumnos
        cuerpoTabla.innerHTML = alumnos.map((alumno, index) => `
          <tr class="alumno-${nombreActividad.toLowerCase()}">
            <td>${index + 1}</td>
            <td>${alumno.nombre}</td>
            <td>${alumno.numero_control}</td>
            <td>${alumno.semestre}</td>
            <td>${alumno.carrera}</td>
          </tr>
        `).join('');
        
        // Actualizar contador
        if (contadorAlumnos) {
          contadorAlumnos.innerHTML = `<span class="numero">${alumnos.length}</span> alumnos inscritos`;
        }
      }
    })
    .catch(error => {
      console.error('Error al cargar alumnos:', error);
      if (cuerpoTabla) {
        cuerpoTabla.innerHTML = `
          <tr>
            <td colspan="5" style="text-align: center; padding: 20px; color: #d33;">
              <i class="fas fa-exclamation-triangle" style="margin-right: 10px;"></i>
              Error al cargar los estudiantes. Por favor, intente nuevamente.
            </td>
          </tr>
        `;
      }
      
      if (contadorAlumnos) {
        contadorAlumnos.innerHTML = `<span class="numero">0</span> alumnos inscritos`;
      }
    });
}

// Función para cargar los datos de la unidad académica Tlahuitoltepec desde la base de datos
function cargarDatosTlahuitoltepec() {
  const mainContent = document.querySelector('.main-content');
  
  // Mostrar indicador de carga
  mainContent.innerHTML = `
    <div class="cargando" style="text-align: center; padding: 50px;">
      <i class="fas fa-spinner fa-spin" style="font-size: 40px; color: #1B396A;"></i>
      <p style="margin-top: 20px; color: #555; font-size: 18px;">Cargando actividades de Unidad académica Tlahuitoltepec...</p>
    </div>
  `;

  // Obtenemos las actividades disponibles para esta unidad
  fetch('./php/obtener_actividades_tlahuitoltepec.php')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener actividades');
      }
      return response.json();
    })
    .then(actividades => {
      if (!actividades || actividades.length === 0) {
        mostrarMensajeNoActividadesTlahuitoltepec();
        return;
      }
      
      // Ya tenemos las actividades, ahora construimos la interfaz
      construirInterfazTlahuitoltepec(actividades);
      
      // Seleccionamos la primera actividad por defecto
      if (actividades.length > 0) {
        cargarAlumnosActividadTlahuitoltepec(actividades[0].id_actividad, actividades[0].nombre_actividad);
      }
    })
    .catch(error => {
      console.error('Error al cargar actividades de Tlahuitoltepec:', error);
      mostrarErrorCargaTlahuitoltepec();
    });
}

// Función para mostrar mensaje cuando no hay actividades en Tlahuitoltepec
function mostrarMensajeNoActividadesTlahuitoltepec() {
  const mainContent = document.querySelector('.main-content');
  mainContent.innerHTML = `
    <div class="encabezado-modal">
      <img src="./assets/img/Logo TecNM.png" alt="Logo TecNM" class="logo-modal">
      <h2 class="titulo-modal">Actividades Extraescolares - Unidad académica Tlahuitoltepec</h2>
    </div>
    
    <div class="sin-actividades" style="text-align: center; padding: 50px; background-color: white; border-radius: 8px; margin-top: 20px;">
      <i class="fas fa-exclamation-circle" style="font-size: 50px; color: #ff7f00; margin-bottom: 20px;"></i>
      <h3 style="color: #1B396A; margin-bottom: 15px;">No hay actividades registradas</h3>
      <p style="color: #555; font-size: 16px;">No se encontraron actividades extraescolares para esta unidad académica.</p>
      <a href="./U_CentrodeInvestigacion.html" class="btn-vista-previa" style="background-color: #ff7f00; color: white; padding: 8px 15px; text-decoration: none; border-radius: 4px; font-weight: bold; transition: background-color 0.3s; display: inline-flex; align-items: center; margin-top: 20px; justify-content: center; max-width: 200px; margin-left: auto; margin-right: auto;">
        <i class="fas fa-plus" style="margin-right: 5px;"></i>Ir a gestión de actividades
      </a>
    </div>
  `;
}

// Función para mostrar mensaje de error en carga de Tlahuitoltepec
function mostrarErrorCargaTlahuitoltepec() {
  const mainContent = document.querySelector('.main-content');
  mainContent.innerHTML = `
    <div class="encabezado-modal">
      <img src="./assets/img/Logo TecNM.png" alt="Logo TecNM" class="logo-modal">
      <h2 class="titulo-modal">Actividades Extraescolares - Unidad académica Tlahuitoltepec</h2>
    </div>
    
    <div class="error" style="text-align: center; padding: 50px; background-color: white; border-radius: 8px; margin-top: 20px;">
      <i class="fas fa-exclamation-triangle" style="font-size: 50px; color: #d33; margin-bottom: 20px;"></i>
      <h3 style="color: #1B396A; margin-bottom: 15px;">Error de conexión</h3>
      <p style="color: #555; font-size: 16px;">No se pudieron cargar las actividades desde la base de datos. Por favor, verifique su conexión e intente nuevamente.</p>
      <button onclick="cargarDatosTlahuitoltepec()" class="btn-reintentar" style="background-color: #1B396A; color: white; border: none; padding: 10px 20px; border-radius: 5px; margin-top: 20px; cursor: pointer;">
        <i class="fas fa-sync-alt" style="margin-right: 5px;"></i>Reintentar
      </button>
    </div>
  `;
}

// Función para construir la interfaz con las actividades obtenidas para Tlahuitoltepec
function construirInterfazTlahuitoltepec(actividades) {
  const mainContent = document.querySelector('.main-content');
  
  // Construimos los botones de actividades
  const botonesActividades = actividades.map((actividad, index) => 
    `<button class="boton-actividad${index === 0 ? ' activo' : ''}" data-id="${actividad.id_actividad}" data-nombre="${actividad.nombre_actividad}">${actividad.nombre_actividad}</button>`
  ).join('');
  
  mainContent.innerHTML = `
    <div class="encabezado-modal">
      <img src="./assets/img/Logo TecNM.png" alt="Logo TecNM" class="logo-modal">
      <h2 class="titulo-modal">Actividades Extraescolares - Unidad académica Tlahuitoltepec</h2>
    </div>

    <div class="barra-actividades">
      ${botonesActividades}
    </div>

    <div class="seccion-alumnos">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h3 class="titulo-centrado" id="tituloActividad">Alumnos inscritos a ${actividades[0].nombre_actividad}</h3>
        
        <!-- Botón Vista Previa más pequeño y a la derecha -->
        <a href="./U_SantaMaria.html" class="btn-vista-previa" style="background-color: #ff7f00; color: white; padding: 8px 15px; text-decoration: none; border-radius: 4px; font-weight: bold; transition: background-color 0.3s; display: inline-flex; align-items: center; box-shadow: 0 2px 5px rgba(0,0,0,0.2); font-size: 13px;">
          <i class="fas fa-eye" style="margin-right: 5px;"></i>Vista Previa
        </a>
      </div>

      <div class="contenedor-busqueda">
        <input type="text" id="busquedaAlumnos" placeholder="Buscar alumno..." class="busqueda-input" onkeyup="filtrarTabla()">
        <div class="contador-alumnos" id="contadorAlumnos">
          <i class="fas fa-spinner fa-spin" style="margin-right: 5px;"></i> Cargando alumnos...
        </div>
      </div>

      <div class="contenedor-tabla">
        <table class="tabla-alumnos">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>No. de Control</th>
              <th>Semestre</th>
              <th>Carrera</th>
            </tr>
          </thead>
          <tbody id="cuerpoTablaAlumnos">
            <tr>
              <td colspan="5" style="text-align: center; padding: 20px;">
                <i class="fas fa-spinner fa-spin" style="font-size: 30px; color: #1B396A;"></i>
                <p style="margin-top: 10px;">Cargando alumnos...</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
  
  // Configurar eventos para los botones de actividades
  configurarEventosUnidadHidalgo(actividades);
}

// Función para cargar los alumnos de una actividad específica en Tlahuitoltepec
function cargarAlumnosActividadTlahuitoltepec(idActividad, nombreActividad) {
  // Actualizar título
  const tituloActividad = document.getElementById('tituloActividad');
  if (tituloActividad) {
    tituloActividad.textContent = `Alumnos inscritos a ${nombreActividad}`;
  }
  
  // Mostrar spinner mientras se cargan los alumnos
  const cuerpoTabla = document.getElementById('cuerpoTablaAlumnos');
  const contadorAlumnos = document.getElementById('contadorAlumnos');
  
  if (cuerpoTabla) {
    cuerpoTabla.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; padding: 20px;">
          <i class="fas fa-spinner fa-spin" style="font-size: 30px; color: #1B396A;"></i>
          <p style="margin-top: 10px;">Cargando alumnos...</p>
        </td>
      </tr>
    `;
  }
  
  if (contadorAlumnos) {
    contadorAlumnos.innerHTML = `<i class="fas fa-spinner fa-spin" style="margin-right: 5px;"></i> Cargando alumnos...`;
  }
  
  // Hacer la solicitud para obtener los alumnos inscritos en esta actividad
  fetch(`./php/obtener_alumnos_inscritos_tlahuitoltepec.php?id_actividad=${idActividad}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener alumnos');
      }
      return response.json();
    })
    .then(alumnos => {
      if (cuerpoTabla) {
        if (!alumnos || alumnos.length === 0) {
          cuerpoTabla.innerHTML = `
            <tr>
              <td colspan="5" style="text-align: center; padding: 20px; color: #666;">
                No hay estudiantes registrados en esta actividad
              </td>
            </tr>
          `;
          
          if (contadorAlumnos) {
            contadorAlumnos.innerHTML = `<span class="numero">0</span> alumnos inscritos`;
          }
          
          return;
        }
        
        // Llenar la tabla con los alumnos
        cuerpoTabla.innerHTML = alumnos.map((alumno, index) => `
          <tr class="alumno-${nombreActividad.toLowerCase()}">
            <td>${index + 1}</td>
            <td>${alumno.nombre}</td>
            <td>${alumno.numero_control}</td>
            <td>${alumno.semestre}</td>
            <td>${alumno.carrera}</td>
          </tr>
        `).join('');
        
        // Actualizar contador
        if (contadorAlumnos) {
          contadorAlumnos.innerHTML = `<span class="numero">${alumnos.length}</span> alumnos inscritos`;
        }
      }
    })
    .catch(error => {
      console.error('Error al cargar alumnos:', error);
      if (cuerpoTabla) {
        cuerpoTabla.innerHTML = `
          <tr>
            <td colspan="5" style="text-align: center; padding: 20px; color: #d33;">
              <i class="fas fa-exclamation-triangle" style="margin-right: 10px;"></i>
              Error al cargar los estudiantes. Por favor, intente nuevamente.
            </td>
          </tr>
        `;
      }
      
      if (contadorAlumnos) {
        contadorAlumnos.innerHTML = `<span class="numero">0</span> alumnos inscritos`;
      }
    });
}

// Función unificada para filtrar tablas de alumnos - REEMPLAZA TODAS LAS FUNCIONES DE FILTRADO
function filtrarTabla() {
  const input = document.getElementById('busquedaAlumnos');
  if (!input) return; // Protección por si el elemento no existe
  
  const filtro = input.value.toLowerCase();
  const filas = document.querySelectorAll('#cuerpoTablaAlumnos tr');
  let alumnosVisibles = 0;
  
  filas.forEach(fila => {
    const celdas = fila.querySelectorAll('td');
    let coincide = false;

    for (let i = 0; i < celdas.length; i++) {
      if (celdas[i] && celdas[i].textContent.toLowerCase().includes(filtro)) {
        coincide = true;
        break;
      }
    }

    fila.style.display = coincide ? '' : 'none';
    if (coincide) alumnosVisibles++;
  });

  // Actualizar contador de alumnos
  const contadorAlumnos = document.getElementById('contadorAlumnos');
  if (contadorAlumnos) {
    contadorAlumnos.innerHTML = `<span class="numero">${alumnosVisibles}</span> alumnos mostrados`;
  }
}

// Función para filtrar la tabla de usuarios
function filtrarUsuarios() {
  const input = document.getElementById('busquedaUsuarios');
  const filtro = input.value.toLowerCase();
  const filas = document.querySelectorAll('#tablaUsuarios tr');
  
  filas.forEach(fila => {
    const celdas = fila.querySelectorAll('td');
    let coincide = false;

    for (let i = 0; i < celdas.length; i++) {
      if (celdas[i] && celdas[i].textContent.toLowerCase().includes(filtro)) {
        coincide = true;
        break;
      }
    }

    fila.style.display = coincide ? '' : 'none';
  });
}

// Función para cargar usuarios desde la base de datos
function cargarUsuariosDesdeBaseDeDatos() {
  // Mostrar indicador de carga
  const tablaUsuarios = document.getElementById('tablaUsuarios');
  if (tablaUsuarios) {
    tablaUsuarios.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 20px;">
          <i class="fas fa-spinner fa-spin" style="font-size: 30px; color: #1B396A;"></i>
          <p style="margin-top: 10px;">Cargando usuarios...</p>
        </td>
      </tr>
    `;
    
    // Realizar la solicitud para obtener usuarios
    fetch('../php/obtener_usuarios.php')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then(result => {
        if (result.success) {
          // Limpiar la tabla
          tablaUsuarios.innerHTML = '';
          
          // Verificar si hay usuarios
          if (result.data && result.data.length > 0) {
            // Agregar cada usuario a la tabla
            result.data.forEach(usuario => {
              const fila = document.createElement('tr');
              fila.setAttribute('data-id', usuario.id_usuario);

              fila.innerHTML = `
                <td>${usuario.nombre || 'Sin nombre'}</td>
                <td>${usuario.contacto || 'No especificado'}</td>
                <td style="position:relative;">
                  <span class="password-oculta">••••••••</span>
                  <span class="password-real" style="display:none;">${usuario.contraseña || ''}</span>
                  <i class="fas fa-eye-slash ver-password" style="cursor:pointer; position:absolute; right:10px; top:50%; transform:translateY(-50%); color:#1B396A;" title="Ver contraseña"></i>
                </td>
                <td>${usuario.unidad_academica || 'No especificada'}</td>
                <td>${usuario.rol || 'No especificado'}</td>
                <td>
                  <i class="fas fa-edit" style="cursor: pointer; color: #1B396A; margin-right: 10px; font-size: 18px;"></i>
                  <i class="fas fa-trash" style="cursor: pointer; color: #d33; font-size: 18px;"></i>
                </td>
              `;
              tablaUsuarios.appendChild(fila);

              // Evento para mostrar/ocultar contraseña
              const iconoVer = fila.querySelector('.ver-password');
              if (iconoVer) {
                iconoVer.addEventListener('click', function() {
                  const spanOculta = fila.querySelector('.password-oculta');
                  const spanReal = fila.querySelector('.password-real');
                  if (spanOculta.style.display === 'none') {
                    spanOculta.style.display = '';
                    spanReal.style.display = 'none';
                    iconoVer.classList.remove('fa-eye');
                    iconoVer.classList.add('fa-eye-slash');
                    iconoVer.title = "Ver contraseña";
                  } else {
                    spanOculta.style.display = 'none';
                    spanReal.style.display = '';
                    iconoVer.classList.remove('fa-eye-slash');
                    iconoVer.classList.add('fa-eye');
                    iconoVer.title = "Ocultar contraseña";
                  }
                });
              }
            });
          } else {
            tablaUsuarios.innerHTML = `
              <tr>
                <td colspan="7" style="text-align: center; padding: 20px;">
                  No hay usuarios registrados.
                </td>
              </tr>
            `;
          }
        } else {
          console.error('Error al obtener usuarios:', result.message);
          tablaUsuarios.innerHTML = `
            <tr>
              <td colspan="7" style="text-align: center; padding: 20px; color: #d33;">
                <i class="fas fa-exclamation-triangle" style="margin-right: 10px;"></i>
                Error al cargar usuarios. Por favor, intente nuevamente.
              </td>
            </tr>
          `;
        }
      })
      .catch(error => {
        console.error('Error:', error);
        tablaUsuarios.innerHTML = `
          <tr>
            <td colspan="7" style="text-align: center; padding: 20px; color: #d33;">
              <i class="fas fa-exclamation-triangle" style="margin-right: 10px;"></i>
              Error de conexión. Por favor, verifique su conexión a internet o al servidor. (${error.message})
            </td>
          </tr>
        `;
      });
  }
}

// Función para mostrar el modal para agregar usuario
function mostrarModalAgregarUsuario() {
  const modalHTML = `
    <div id="modalAgregarUsuario" class="modal" style="display: block; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.7); z-index: 999;">
      <div class="modal-contenido" style="background-color: white; margin: auto; padding: 30px; width: 35%; border-radius: 15px; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
        <h2 style="font-family: 'Segoe UI', sans-serif; color: #1B396A; text-align: center; margin-bottom: 20px;">Agregar Usuario</h2>
        <form id="formAgregarUsuario">
          <div style="margin-bottom: 20px;">
            <label for="nombreUsuario" style="font-family: 'Segoe UI', sans-serif; font-size: 16px; font-weight: bold;">Nombre:</label>
            <input type="text" id="nombreUsuario" name="nombreUsuario" style="width: 95%; padding: 10px; border: 1px solid #ccc; border-radius: 5px; font-size: 14px;">
            <span id="errorNombre" style="color: red; font-size: 12px; display: none;">
              <i class="fas fa-exclamation-circle" style="margin-right: 5px;"></i> Este campo es obligatorio.
            </span>
          </div>
          <div style="margin-bottom: 20px;">
            <label for="passwordUsuario" style="font-family: 'Segoe UI', sans-serif; font-size: 16px; font-weight: bold;">Contraseña:</label>
            <div style="position: relative;">
              <input type="password" id="passwordUsuario" name="passwordUsuario" style="width: 95%; padding: 10px; border: 1px solid #ccc; border-radius: 5px; font-size: 14px;">
            </div>
            <span id="errorPassword" style="color: red; font-size: 12px; display: none;">
              <i class="fas fa-exclamation-circle" style="margin-right: 5px;"></i> Este campo es obligatorio.
            </span>
          </div>
          <div style="margin-bottom: 20px;">
            <label for="unidadUsuario" style="font-family: 'Segoe UI', sans-serif; font-size: 16px; font-weight: bold;">Unidad Académica:</label>
            <select id="unidadUsuario" name="unidadUsuario" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px; font-size: 14px;">
              <option value="">Seleccione una opción</option>
              <option value="CIDERS unión Hidalgo">CIDERS unión Hidalgo</option>
              <option value="Unidad Demetrio Vallejo en el Espinal">Unidad Demetrio Vallejo en el Espinal</option>
              <option value="Unidad académica Tlahuitoltepec">Unidad académica Tlahuitoltepec</option>
              <option value="Valle de Etla">Valle de Etla</option>
            </select>
            <span id="errorUnidad" style="color: red; font-size: 12px; display: none;">
              <i class="fas fa-exclamation-circle" style="margin-right: 5px;"></i> Este campo es obligatorio.
            </span>
          </div>
          <div style="margin-bottom: 20px;">
            <label for="contactoUsuario" style="font-family: 'Segoe UI', sans-serif; font-size: 16px; font-weight: bold;">Contacto:</label>
            <input type="email" id="contactoUsuario" name="contactoUsuario" style="width: 95%; padding: 10px; border: 1px solid #ccc; border-radius: 5px; font-size: 14px;">
            <span id="errorContacto" style="color: red; font-size: 12px; display: none;">
              <i class="fas fa-exclamation-circle" style="margin-right: 5px;"></i> Este campo es obligatorio.
            </span>
          </div>
          <div style="margin-bottom: 20px;">
            <label for="rolUsuario" style="font-family: 'Segoe UI', sans-serif; font-size: 16px; font-weight: bold;">Rol:</label>
            <select id="rolUsuario" name="rolUsuario" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px; font-size: 14px;">
              <option value="">Seleccione una opción</option>
              <option value="Administrador">Administrador</option>
              <option value="Coordinador">Coordinador</option>
            </select>
            <span id="errorRol" style="color: red; font-size: 12px; display: none;">
              <i class="fas fa-exclamation-circle" style="margin-right: 5px;"></i> Este campo es obligatorio.
            </span>
          </div>
          <div style="text-align: center;">
            <button type="button" id="btnConfirmarAgregar" style="background-color: #1B396A; color: white; padding: 12px 25px; border: none; border-radius: 5px; font-size: 16px; cursor: pointer; margin-right: 10px;">Agregar</button>
            <button type="button" id="btnCerrarModal" style="background-color: #d33; color: white; padding: 12px 25px; border: none; border-radius: 5px; font-size: 16px; cursor: pointer;">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // Configurar evento para cerrar el modal
  const btnCerrarModal = document.getElementById('btnCerrarModal');
  if (btnCerrarModal) {
    btnCerrarModal.addEventListener('click', cerrarModalUsuario);
  }

  // Configurar evento para guardar el usuario
  const btnConfirmarAgregar = document.getElementById('btnConfirmarAgregar');
  if (btnConfirmarAgregar) {
    btnConfirmarAgregar.addEventListener('click', guardarNuevoUsuario);
  }
}

// Función para cerrar el modal de usuario
function cerrarModalUsuario() {
  const modal = document.getElementById('modalAgregarUsuario');
  if (modal) {
    modal.parentNode.removeChild(modal);
  }
}

// Función para guardar un nuevo usuario
function guardarNuevoUsuario() {
  const nombre = document.getElementById('nombreUsuario').value;
  const unidad = document.getElementById('unidadUsuario').value;
  const contacto = document.getElementById('contactoUsuario').value;
  const rol = document.getElementById('rolUsuario').value;
  const password = document.getElementById('passwordUsuario').value;

  let valid = true;

  // Validar campos
  if (!nombre) {
    document.getElementById('errorNombre').style.display = 'block';
    valid = false;
  } else {
    document.getElementById('errorNombre').style.display = 'none';
  }

  if (!unidad) {
    document.getElementById('errorUnidad').style.display = 'block';
    valid = false;
  } else {
    document.getElementById('errorUnidad').style.display = 'none';
  }

  if (!contacto) {
    document.getElementById('errorContacto').style.display = 'block';
    valid = false;
  } else {
    document.getElementById('errorContacto').style.display = 'none';
  }

  if (!rol) {
    document.getElementById('errorRol').style.display = 'block';
    valid = false;
  } else {
    document.getElementById('errorRol').style.display = 'none';
  }

  if (!password) {
    document.getElementById('errorPassword').style.display = 'block';
    valid = false;
  } else {
    document.getElementById('errorPassword').style.display = 'none';
  }

  if (valid) {
    // Crear el objeto de datos para enviar al servidor
    const datosUsuario = {
      nombre: nombre,
      contraseña: password,
      rol: rol,
      unidad_academica: unidad,
      contacto: contacto
    };

    // Mostrar indicador de carga mientras se procesa la solicitud
    Swal.fire({
      title: 'Guardando usuario...',
      text: 'Por favor espere',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    // Enviar la solicitud al servidor mediante fetch - corregimos la ruta
    fetch('../php/guardar_usuario.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosUsuario)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Cerrar el modal
      cerrarModalUsuario();

      if (data.success) {
        // Agregar el usuario a la tabla en la interfaz
        const tablaUsuarios = document.getElementById('tablaUsuarios');
        const nuevoUsuario = document.createElement('tr');
        
        // Si se devuelve un ID, lo añadimos
        if (data.id_usuario) {
          nuevoUsuario.setAttribute('data-id', data.id_usuario);
        }
        
        nuevoUsuario.innerHTML = `
          <td>${nombre}</td>
          <td>${contacto}</td>
          <td>••••••••</td>
          <td>${rol}</td>
          <td>
            <i class="fas fa-edit" style="cursor: pointer; color: #1B396A; margin-right: 10px; font-size: 18px;"></i>
            <i class="fas fa-trash" style="cursor: pointer; color: #d33; font-size: 18px;"></i>
          </td>
        `;
        tablaUsuarios.appendChild(nuevoUsuario);
        
        // Mostrar mensaje de éxito
        Swal.fire({
          title: "¡Usuario agregado!",
          text: `El usuario ${nombre} ha sido agregado exitosamente.`,
          icon: "success",
          confirmButtonColor: "#1B396A"
        });
        
        // Recargar la tabla para mostrar datos actualizados
        setTimeout(() => {
          cargarUsuariosDesdeBaseDeDatos();
        }, 1000);
      } else {
        // Mostrar mensaje de error
        Swal.fire({
          title: "Error",
          text: data.message || "Ocurrió un error al guardar el usuario.",
          icon: "error",
          confirmButtonColor: "#d33"
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // Cerrar el modal
      cerrarModalUsuario();
      
      // Mostrar mensaje de error
      Swal.fire({
        title: "Error",
        text: `Hubo un problema al conectar con el servidor. (${error.message})`,
        icon: "error",
        confirmButtonColor: "#d33"
      });
    });
  }
}

// Función para editar usuario
function editarUsuario(filaUsuario) {
  const nombre = filaUsuario.cells[0].textContent;
  const contacto = filaUsuario.cells[1].textContent;
  // Obtener la contraseña real del span oculto
  const password = filaUsuario.cells[2].querySelector('.password-real') 
    ? filaUsuario.cells[2].querySelector('.password-real').textContent 
    : '';
  const unidad = filaUsuario.cells[3].textContent;
  const rol = filaUsuario.cells[4].textContent;
  
  const modalHTML = `
    <div id="modalEditarUsuario" class="modal" style="display: block; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.7); z-index: 999;">
      <div class="modal-contenido" style="background-color: white; margin: auto; padding: 30px; width: 35%; border-radius: 15px; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
        <h2 style="font-family: 'Segoe UI', sans-serif; color: #1B396A; text-align: center; margin-bottom: 20px;">Editar Usuario</h2>
        <form id="formEditarUsuario">
          <div style="margin-bottom: 20px;">
            <label for="editarNombreUsuario" style="font-family: 'Segoe UI', sans-serif; font-size: 16px; font-weight: bold;">Nombre:</label>
            <input type="text" id="editarNombreUsuario" name="editarNombreUsuario" value="${nombre}" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px; font-size: 14px;">
            <span id="errorEditarNombre" style="color: red; font-size: 12px; display: none;">
              <i class="fas fa-exclamation-circle" style="margin-right: 5px;"></i> Este campo es obligatorio.
            </span>
          </div>
          <div style="margin-bottom: 20px;">
            <label for="editarPasswordUsuario" style="font-family: 'Segoe UI', sans-serif; font-size: 16px; font-weight: bold;">Contraseña:</label>
            <div style="position: relative;">
              <input type="text" id="editarPasswordUsuario" name="editarPasswordUsuario" value="${password}" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px; font-size: 14px;">
            </div>
            <span id="errorEditarPassword" style="color: red; font-size: 12px; display: none;">
              <i class="fas fa-exclamation-circle" style="margin-right: 5px;"></i> Este campo es obligatorio.
            </span>
          </div>
          <div style="margin-bottom: 20px;">
            <label for="editarUnidadUsuario" style="font-family: 'Segoe UI', sans-serif; font-size: 16px; font-weight: bold;">Unidad Académica:</label>
            <select id="editarUnidadUsuario" name="editarUnidadUsuario" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px; font-size: 14px;">
              <option value="CIDERS unión Hidalgo" ${unidad === 'CIDERS unión Hidalgo' ? 'selected' : ''}>CIDERS unión Hidalgo</option>
              <option value="Unidad Demetrio Vallejo en el Espinal" ${unidad === 'Unidad Demetrio Vallejo en el Espinal' ? 'selected' : ''}>Unidad Demetrio Vallejo en el Espinal</option>
              <option value="Unidad académica Tlahuitoltepec" ${unidad === 'Unidad académica Tlahuitoltepec' ? 'selected' : ''}>Unidad académica Tlahuitoltepec</option>
              <option value="Valle de Etla" ${unidad === 'Valle de Etla' ? 'selected' : ''}>Valle de Etla</option>
            </select>
            <span id="errorEditarUnidad" style="color: red; font-size: 12px; display: none;">
              <i class="fas fa-exclamation-circle" style="margin-right: 5px;"></i> Este campo es obligatorio.
            </span>
          </div>
          <div style="margin-bottom: 20px;">
            <label for="editarContactoUsuario" style="font-family: 'Segoe UI', sans-serif; font-size: 16px; font-weight: bold;">Contacto:</label>
            <input type="email" id="editarContactoUsuario" name="editarContactoUsuario" value="${contacto}" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px; font-size: 14px;">
            <span id="errorEditarContacto" style="color: red; font-size: 12px; display: none;">
              <i class="fas fa-exclamation-circle" style="margin-right: 5px;"></i> Este campo es obligatorio.
            </span>
          </div>
          <div style="margin-bottom: 20px;">
            <label for="editarRolUsuario" style="font-family: 'Segoe UI', sans-serif; font-size: 16px; font-weight: bold;">Rol:</label>
            <select id="editarRolUsuario" name="editarRolUsuario" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px; font-size: 14px;">
              <option value="Administrador" ${rol === 'Administrador' ? 'selected' : ''}>Administrador</option>
              <option value="Coordinador" ${rol === 'Coordinador' ? 'selected' : ''}>Coordinador</option>
            </select>
            <span id="errorEditarRol" style="color: red; font-size: 12px; display: none;">
              <i class="fas fa-exclamation-circle" style="margin-right: 5px;"></i> Este campo es obligatorio.
            </span>
          </div>
          <div style="text-align: center;">
            <button type="button" id="btnGuardarEditar" style="background-color: #1B396A; color: white; padding: 12px 25px; border: none; border-radius: 5px; font-size: 16px; cursor: pointer; margin-right: 10px;">Guardar</button>
            <button type="button" id="btnCerrarModalEditar" style="background-color: #d33; color: white; padding: 12px 25px; border: none; border-radius: 5px; font-size: 16px; cursor: pointer;">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // Configurar eventos para los botones del modal
  const btnCerrarModalEditar = document.getElementById('btnCerrarModalEditar');
  btnCerrarModalEditar.addEventListener('click', function() {
    const modal = document.getElementById('modalEditarUsuario');
    modal.parentNode.removeChild(modal);
  });

  const btnGuardarEditar = document.getElementById('btnGuardarEditar');
  btnGuardarEditar.addEventListener('click', function() {
    guardarCambiosUsuario(filaUsuario);
  });
}

// Función para guardar los cambios de un usuario
function guardarCambiosUsuario(filaUsuario) {
  const nuevoNombre = document.getElementById('editarNombreUsuario').value;
  const nuevaUnidad = document.getElementById('editarUnidadUsuario').value;
  const nuevoContacto = document.getElementById('editarContactoUsuario').value;
  const nuevaPassword = document.getElementById('editarPasswordUsuario').value;
  const nuevoRol = document.getElementById('editarRolUsuario').value;
  
  // Obtener el ID del usuario si está disponible
  const idUsuario = filaUsuario.getAttribute('data-id');

  let valid = true;

  // Validar campos
  if (!nuevoNombre) {
    document.getElementById('errorEditarNombre').style.display = 'block';
    valid = false;
  } else {
    document.getElementById('errorEditarNombre').style.display = 'none';
  }

  if (!nuevaUnidad) {
    document.getElementById('errorEditarUnidad').style.display = 'block';
    valid = false;
  } else {
    document.getElementById('errorEditarUnidad').style.display = 'none';
  }

  if (!nuevoContacto) {
    document.getElementById('errorEditarContacto').style.display = 'block';
    valid = false;
  } else {
    document.getElementById('errorEditarContacto').style.display = 'none';
  }

  if (!nuevoRol) {
    document.getElementById('errorEditarRol').style.display = 'block';
    valid = false;
  } else {
    document.getElementById('errorEditarRol').style.display = 'none';
  }
  
  if (!nuevaPassword) {
    document.getElementById('errorEditarPassword').style.display = 'block';
    valid = false;
  } else {
    document.getElementById('errorEditarPassword').style.display = 'none';
  }

  if (valid) {
    // Si tenemos el ID, enviamos los datos al servidor
    if (idUsuario) {
      // Mostrar carga mientras se procesa
      Swal.fire({
        title: 'Actualizando usuario...',
        text: 'Por favor espere',
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      // Enviar la solicitud al servidor mediante fetch - corregimos la ruta
      fetch('../php/actualizar_usuario.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_usuario: idUsuario,
          nombre: nuevoNombre,
          contraseña: nuevaPassword,
          rol: nuevoRol,
          unidad_academica: nuevaUnidad,
          contacto: nuevoContacto
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Cerrar el modal
        const modal = document.getElementById('modalEditarUsuario');
        modal.parentNode.removeChild(modal);

        if (data.success) {
          // Actualizar los datos en la tabla
          actualizarFilaUsuario(filaUsuario, nuevoNombre, nuevaUnidad, nuevoContacto, nuevaPassword, nuevoRol);
          
          // Mostrar mensaje de éxito
          Swal.fire({
            title: "¡Usuario actualizado!",
            text: `Los datos de ${nuevoNombre} han sido actualizados exitosamente.`,
            icon: "success",
            confirmButtonColor: "#1B396A"
          });
        } else {
          // Mostrar mensaje de error
          Swal.fire({
            title: "Error",
            text: data.message || "Ocurrió un error al actualizar el usuario.",
            icon: "error",
            confirmButtonColor: "#d33"
          });
        }
      })
      .catch(error => {
        console.error('Error:', error);
        // Cerrar el modal
        const modal = document.getElementById('modalEditarUsuario');
        if (modal) modal.parentNode.removeChild(modal);
        
        // Mostrar mensaje de error
        Swal.fire({
          title: "Error",
          text: `Hubo un problema al conectar con el servidor. (${error.message})`,
          icon: "error",
          confirmButtonColor: "#d33"
        });
      });
    } else {
      // Si no hay ID, solo actualizamos en la interfaz
      const modal = document.getElementById('modalEditarUsuario');
      modal.parentNode.removeChild(modal);
      
      actualizarFilaUsuario(filaUsuario, nuevoNombre, nuevaUnidad, nuevoContacto, nuevoPassword, nuevoRol);
      
      // Mostrar mensaje de éxito
      Swal.fire({
        title: "¡Usuario actualizado!",
        text: `Los datos de ${nuevoNombre} han sido actualizados exitosamente.`,
        icon: "success",
        confirmButtonColor: "#1B396A"
      });
    }
  }
}

// Función para actualizar la fila de un usuario en la tabla
function actualizarFilaUsuario(fila, nombre, unidad, contacto, password, rol) {
  fila.children[0].textContent = nombre;
  fila.children[1].textContent = contacto;
  // Mantener la estructura con el ojo y los spans
  fila.children[2].innerHTML = `
    <span class="password-oculta">••••••••</span>
    <span class="password-real" style="display:none;">${password}</span>
    <i class="fas fa-eye-slash ver-password" style="cursor:pointer; position:absolute; right:10px; top:50%; transform:translateY(-50%); color:#1B396A;" title="Ver contraseña"></i>
  `;
  fila.children[3].textContent = unidad;
  fila.children[4].textContent = rol;

  // Volver a agregar el evento al icono de ojo
  const iconoVer = fila.children[2].querySelector('.ver-password');
  if (iconoVer) {
    iconoVer.addEventListener('click', function() {
      const spanOculta = fila.children[2].querySelector('.password-oculta');
      const spanReal = fila.children[2].querySelector('.password-real');
      if (spanOculta.style.display === 'none') {
        spanOculta.style.display = '';
        spanReal.style.display = 'none';
        iconoVer.classList.remove('fa-eye');
        iconoVer.classList.add('fa-eye-slash');
        iconoVer.title = "Ver contraseña";
      } else {
        spanOculta.style.display = 'none';
        spanReal.style.display = '';
        iconoVer.classList.remove('fa-eye-slash');
        iconoVer.classList.add('fa-eye');
        iconoVer.title = "Ocultar contraseña";
      }
    });
  }
}

// Función para eliminar usuario
function eliminarUsuario(filaUsuario) {
  // Obtener el ID del usuario si está disponible
  const idUsuario = filaUsuario.getAttribute('data-id');
  const nombreUsuario = filaUsuario.cells[0].textContent;

  Swal.fire({
    title: "¿Estás seguro de eliminar este usuario?",
    text: `Se eliminará a "${nombreUsuario}" del sistema. Esta acción no se puede deshacer.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, eliminarlo",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      if (idUsuario) {
        // Mostrar carga mientras se procesa
        Swal.fire({
          title: 'Eliminando usuario...',
          text: 'Por favor espere',
          allowOutsideClick: false,
          allowEscapeKey: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        // Enviar la solicitud al servidor mediante fetch - corregimos la ruta
        fetch('../php/eliminar_usuario.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id_usuario: idUsuario })
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data.success) {
            // Eliminar la fila de la tabla
            filaUsuario.parentNode.removeChild(filaUsuario);
            
            // Mostrar mensaje de éxito
            Swal.fire({
              title: "¡Eliminado!",
              text: `El usuario ${nombreUsuario} ha sido eliminado correctamente.`,
              icon: "success",
              confirmButtonColor: "#1B396A"
            });
          } else {
            // Mostrar mensaje de error
            Swal.fire({
              title: "Error",
              text: data.message || "Ocurrió un error al eliminar el usuario.",
              icon: "error",
              confirmButtonColor: "#d33"
            });
          }
        })
        .catch(error => {
          console.error('Error:', error);
          Swal.fire({
            title: "Error",
            text: `Hubo un problema al conectar con el servidor. (${error.message})`,
            icon: "error",
            confirmButtonColor: "#d33"
          });
        });
      } else {
        // Si no tenemos ID, solo eliminamos la fila (modo local)
        filaUsuario.parentNode.removeChild(filaUsuario);
        
        Swal.fire({
          title: "¡Eliminado!",
          text: `El usuario ${nombreUsuario} ha sido eliminado.`,
          icon: "success",
          confirmButtonColor: "#1B396A"
        });
      }
    }
  });
}

// FUNCIONES PARA UNIDADES ACADÉMICAS

function verUnidad(unidad) {
  const datosUnidad = datosUnidades[unidad];
  if (!datosUnidad) {
    console.error("No se encontraron datos para la unidad:", unidad);
    return;
  }

  // Actualizar título del modal
  document.querySelector('.titulo-modal').textContent = `Actividades Extraescolares - ${unidad}`;

  // Actualizar botones de actividades
  const barraActividades = document.querySelector('.barra-actividades');
  barraActividades.innerHTML = datosUnidad.actividades.map(actividad => 
    `<button class="boton-actividad" onclick="seleccionarActividad('${actividad}', '${unidad}')">${actividad}</button>`
  ).join('');

  // Seleccionar la primera actividad por defecto
  if (datosUnidad.actividades.length > 0) {
    seleccionarActividad(datosUnidad.actividades[0], unidad);
  }

  // Mostrar el modal
  document.getElementById('modalActividades').style.display = 'block';
}

function abrirModalUnidad(editar = false, index = null) {
  const modal = document.getElementById('modalUnidad');
  const titulo = document.getElementById('tituloModalUnidad');
  const input = document.getElementById('nombreUnidad');
  const btn = document.getElementById('btnAccionUnidad');

  if (editar && index !== null) {
    // Modo edición
    modoEdicion = true;
    unidadSeleccionada = index;
    titulo.textContent = "Editar Unidad Académica";
    input.value = unidadesAcademicas[index];
    btn.textContent = "Guardar Cambios";
  } else {
    // Modo agregar
    modoEdicion = false;
    unidadSeleccionada = null;
    titulo.textContent = "Agregar Unidad Académica";
    input.value = "";
    btn.textContent = "Agregar";
  }

  modal.style.display = 'block';
  input.focus();
}

function cerrarModalUnidad() {
  document.getElementById('modalUnidad').style.display = 'none';
  unidadSeleccionada = null;
  modoEdicion = false;
}

function guardarUnidad() {
  const input = document.getElementById('nombreUnidad');
  const nombre = input.value.trim();

  if (!nombre) {
    alert("Por favor ingrese el nombre de la unidad");
    return;
  }

  if (modoEdicion && unidadSeleccionada !== null) {
    // Actualizar unidad existente
    unidadesAcademicas[unidadSeleccionada] = nombre;
  } else {
    // Agregar nueva unidad
    unidadesAcademicas.push(nombre);
  }

  // Actualizar la vista
  actualizarListaUnidades();
  cerrarModalUnidad();
}

function editarUnidad(index) {
  if (index >= 0 && index < unidadesAcademicas.length) {
    abrirModalUnidad(true, index);
  } else {
    console.error("Índice de unidad no válido");
  }
}

// Versión mejorada de la función eliminarUnidad
function eliminarUnidad(index) {
  // Validación robusta del índice
  if (index === undefined || index === null || index < 0 || index >= unidadesAcademicas.length) {
    console.error('Índice inválido:', index, 'Array length:', unidadesAcademicas.length);
    Swal.fire({
      title: 'Error',
      text: 'No se pudo identificar la unidad a eliminar',
      icon: 'error',
      confirmButtonColor: '#1B396A'
    });
    return;
  }

  // Obtener el nombre de la unidad (directamente del array de strings)
  const nombreUnidad = unidadesAcademicas[index];
  
  Swal.fire({
    title: "¿Estás seguro?",
    html: `¿Quieres eliminar la unidad <strong>"${nombreUnidad}"</strong>?<br><br>Esta acción no se puede deshacer.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#1B396A",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    allowOutsideClick: false,
    backdrop: true,
    focusConfirm: false,
    focusCancel: true,
    scrollbarPadding: false,
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      // Eliminar la unidad
      const unidadEliminada = unidadesAcademicas.splice(index, 1);
      
      // Actualizar la vista
      actualizarListaUnidades();
      
      // Mostrar confirmación
      Swal.fire({
        title: "¡Eliminada!",
        html: `La unidad <strong>"${unidadEliminada[0]}"</strong> ha sido eliminada correctamente.`,
        icon: "success",
        confirmButtonColor: "#1B396A",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false
      });
    }
  });
}


function actualizarListaUnidades() {
  const contenedor = document.querySelector('.contenedor-unidades');
  const botonAgregar = document.getElementById('agregarUnidad');

  // Limpiar contenedor manteniendo el botón agregar
  while (contenedor.firstChild !== botonAgregar) {
    contenedor.removeChild(contenedor.firstChild);
  }

  // Recrear todas las unidades con los índices correctos
  unidadesAcademicas.forEach((unidad, index) => {
    const div = document.createElement('div');
    div.className = 'unidad';

    // Usar dataset para almacenar el índice correcto
    div.innerHTML = `
      <h2>${unidad}</h2>
      <div class="acciones">
        <button data-action="view" data-index="${index}"><i class="fas fa-eye"></i> Ver</button>
        <button data-action="edit" data-index="${index}"><i class="fas fa-edit"></i> Editar</button>
        <button data-action="delete" data-index="${index}"><i class="fas fa-trash"></i> Eliminar</button>
        <button data-action="panel" data-index="${index}"><i class="fas fa-columns"></i> Vista Panel</button>
      </div>
    `;
    contenedor.insertBefore(div, botonAgregar);
  });
}

// Función para configurar los eventos de los botones de actividades por unidad
function configurarEventosUnidad(unidad) {
  // Configurar eventos para los botones de actividades
  document.querySelectorAll('.barra-actividades .boton-actividad').forEach(boton => {
    boton.addEventListener('click', function() {
      // Desactivar todos los botones
      document.querySelectorAll('.barra-actividades .boton-actividad').forEach(b => {
        b.classList.remove('activo');
      });
      
      // Activar el botón clickeado
      this.classList.add('activo');
      
      // Obtener el nombre de la actividad desde el botón
      const nombreActividad = this.getAttribute('data-actividad');
      if (nombreActividad) {
        // Para unidades con datos estáticos
        const datosUnidad = datosUnidades[unidad];
        if (datosUnidad && datosUnidad.alumnos[nombreActividad]) {
          // Actualizar título
          document.getElementById('tituloActividad').textContent = `Alumnos inscritos a ${nombreActividad}`;
          
          // Actualizar tabla
          const cuerpoTabla = document.getElementById('cuerpoTablaAlumnos');
          cuerpoTabla.innerHTML = datosUnidad.alumnos[nombreActividad].map((alumno, index) => 
            `<tr class="alumno-${nombreActividad.toLowerCase()}">
              <td>${index + 1}</td>
              <td>${alumno.nombre}</td>
              <td>${alumno.control}</td>
              <td>${alumno.semestre}</td>
              <td>${alumno.carrera}</td>
            </tr>`
          ).join('');
          
          // Actualizar contador
          const contadorAlumnos = document.getElementById('contadorAlumnos');
          if (contadorAlumnos) {
            contadorAlumnos.innerHTML = `<span class="numero">${datosUnidad.alumnos[nombreActividad].length}</span> alumnos inscritos`;
          }
        }
      }
    });
  });
}

// Función para configurar los eventos para la unión Hidalgo (datos dinámicos)
function configurarEventosUnionHidalgo(actividades) {
  // Configurar eventos para los botones de actividades
  document.querySelectorAll('.barra-actividades .boton-actividad').forEach(boton => {
    boton.addEventListener('click', function() {
      // Desactivar todos los botones
      document.querySelectorAll('.barra-actividades .boton-actividad').forEach(b => {
        b.classList.remove('activo');
      });
      
      // Activar el botón clickeado
      this.classList.add('activo');
      
      // Obtener el ID y nombre de la actividad desde el botón
      const idActividad = this.getAttribute('data-id');
      const nombreActividad = this.getAttribute('data-nombre');
      
      if (idActividad && nombreActividad) {
        // Cargar los alumnos de esta actividad
        cargarAlumnosActividad(idActividad, nombreActividad);
      }
    });
  });
  
  // Configurar campo de búsqueda
  const busquedaInput = document.getElementById('busquedaAlumnos');
  if (busquedaInput) {
    busquedaInput.addEventListener('keyup', filtrarTabla);
  }
}

// Función para cargar los datos de la Unidad Demetrio Vallejo desde la base de datos
function cargarDatosDemetrioVallejo() {
  const mainContent = document.querySelector('.main-content');
  
  // Mostrar indicador de carga
  mainContent.innerHTML = `
    <div class="cargando" style="text-align: center; padding: 50px;">
      <i class="fas fa-spinner fa-spin" style="font-size: 40px; color: #1B396A;"></i>
      <p style="margin-top: 20px; color: #555; font-size: 18px;">Cargando actividades de Unidad Demetrio Vallejo en el Espinal...</p>
    </div>
  `;

  // Obtenemos las actividades disponibles para esta unidad
  fetch('./php/obtener_actividades_demetrio.php')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener actividades');
      }
      return response.json();
    })
    .then(actividades => {
      if (!actividades || actividades.length === 0) {
        mostrarMensajeNoActividadesDemetrio();
        return;
      }
      
      // Ya tenemos las actividades, ahora construimos la interfaz
      construirInterfazDemetrioVallejo(actividades);
      
      // Seleccionamos la primera actividad por defecto
      if (actividades.length > 0) {
        cargarAlumnosActividadDemetrio(actividades[0].id_actividad, actividades[0].nombre_actividad);
      }
    })
    .catch(error => {
      console.error('Error al cargar actividades de Demetrio Vallejo:', error);
      mostrarErrorCargaDemetrio();
    });
}

// Función para mostrar mensaje cuando no hay actividades en Demetrio Vallejo
function mostrarMensajeNoActividadesDemetrio() {
  const mainContent = document.querySelector('.main-content');
  mainContent.innerHTML = `
    <div class="encabezado-modal">
      <img src="./assets/img/Logo TecNM.png" alt="Logo TecNM" class="logo-modal">
      <h2 class="titulo-modal">Actividades Extraescolares - Unidad Demetrio Vallejo en el Espinal</h2>
    </div>
    
    <div class="sin-actividades" style="text-align: center; padding: 50px; background-color: white; border-radius: 8px; margin-top: 20px;">
      <i class="fas fa-exclamation-circle" style="font-size: 50px; color: #ff7f00; margin-bottom: 20px;"></i>
      <h3 style="color: #1B396A; margin-bottom: 15px;">No hay actividades registradas</h3>
      <p style="color: #555; font-size: 16px;">No se encontraron actividades extraescolares para esta unidad académica.</p>
      <a href="./U_CentrodeInvestigacion.html" class="btn-vista-previa" style="background-color: #ff7f00; color: white; padding: 8px 15px; text-decoration: none; border-radius: 4px; font-weight: bold; transition: background-color 0.3s; display: inline-flex; align-items: center; margin-top: 20px; justify-content: center; max-width: 200px; margin-left: auto; margin-right: auto;">
        <i class="fas fa-plus" style="margin-right: 5px;"></i>Ir a gestión de actividades
      </a>
    </div>
  `;
}

// Función para mostrar mensaje de error en carga de Demetrio Vallejo
function mostrarErrorCargaDemetrio() {
  const mainContent = document.querySelector('.main-content');
  mainContent.innerHTML = `
    <div class="encabezado-modal">
      <img src="./assets/img/Logo TecNM.png" alt="Logo TecNM" class="logo-modal">
      <h2 class="titulo-modal">Actividades Extraescolares - Unidad Demetrio Vallejo en el Espinal</h2>
    </div>
    
    <div class="error" style="text-align: center; padding: 50px; background-color: white; border-radius: 8px; margin-top: 20px;">
      <i class="fas fa-exclamation-triangle" style="font-size: 50px; color: #d33; margin-bottom: 20px;"></i>
      <h3 style="color: #1B396A; margin-bottom: 15px;">Error de conexión</h3>
      <p style="color: #555; font-size: 16px;">No se pudieron cargar las actividades desde la base de datos. Por favor, verifique su conexión e intente nuevamente.</p>
      <button onclick="cargarDatosDemetrioVallejo()" class="btn-reintentar" style="background-color: #1B396A; color: white; border: none; padding: 10px 20px; border-radius: 5px; margin-top: 20px; cursor: pointer;">
        <i class="fas fa-sync-alt" style="margin-right: 5px;"></i>Reintentar
      </button>
    </div>
  `;
}

// Función para construir la interfaz con las actividades obtenidas para Demetrio Vallejo
function construirInterfazDemetrioVallejo(actividades) {
  const mainContent = document.querySelector('.main-content');
  
  // Construimos los botones de actividades
  const botonesActividades = actividades.map((actividad, index) => 
    `<button class="boton-actividad${index === 0 ? ' activo' : ''}" data-id="${actividad.id_actividad}" data-nombre="${actividad.nombre_actividad}">${actividad.nombre_actividad}</button>`
  ).join('');
  
  mainContent.innerHTML = `
    <div class="encabezado-modal">
      <img src="./assets/img/Logo TecNM.png" alt="Logo TecNM" class="logo-modal">
      <h2 class="titulo-modal">Actividades Extraescolares - Unidad Demetrio Vallejo en el Espinal</h2>
    </div>

    <div class="barra-actividades">
      ${botonesActividades}
    </div>

    <div class="seccion-alumnos">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h3 class="titulo-centrado" id="tituloActividad">Alumnos inscritos a ${actividades[0].nombre_actividad}</h3>
        
        <!-- Botón Vista Previa más pequeño y a la derecha -->
        <a href="./U_Demetrio.html" class="btn-vista-previa" style="background-color: #ff7f00; color: white; padding: 8px 15px; text-decoration: none; border-radius: 4px; font-weight: bold; transition: background-color 0.3s; display: inline-flex; align-items: center; box-shadow: 0 2px 5px rgba(0,0,0,0.2); font-size: 13px;">
          <i class="fas fa-eye" style="margin-right: 5px;"></i>Vista Previa
        </a>
      </div>

      <div class="contenedor-busqueda">
        <input type="text" id="busquedaAlumnos" placeholder="Buscar alumno..." class="busqueda-input" onkeyup="filtrarTabla()">
        <div class="contador-alumnos" id="contadorAlumnos">
          <i class="fas fa-spinner fa-spin" style="margin-right: 5px;"></i> Cargando alumnos...
        </div>
      </div>

      <div class="contenedor-tabla">
        <table class="tabla-alumnos">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>No. de Control</th>
              <th>Semestre</th>
              <th>Carrera</th>
            </tr>
          </thead>
          <tbody id="cuerpoTablaAlumnos">
            <tr>
              <td colspan="5" style="text-align: center; padding: 20px;">
                <i class="fas fa-spinner fa-spin" style="font-size: 30px; color: #1B396A;"></i>
                <p style="margin-top: 10px;">Cargando alumnos...</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
  
  // Configurar eventos para los botones de actividades
  configurarEventosUnidadHidalgo(actividades);
}

// Función para cargar los alumnos de una actividad específica en Demetrio Vallejo
function cargarAlumnosActividadDemetrio(idActividad, nombreActividad) {
  // Actualizar título
  const tituloActividad = document.getElementById('tituloActividad');
  if (tituloActividad) {
    tituloActividad.textContent = `Alumnos inscritos a ${nombreActividad}`;
  }
  
  // Mostrar spinner mientras se cargan los alumnos
  const cuerpoTabla = document.getElementById('cuerpoTablaAlumnos');
  const contadorAlumnos = document.getElementById('contadorAlumnos');
  
  if (cuerpoTabla) {
    cuerpoTabla.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; padding: 20px;">
          <i class="fas fa-spinner fa-spin" style="font-size: 30px; color: #1B396A;"></i>
          <p style="margin-top: 10px;">Cargando alumnos...</p>
        </td>
      </tr>
    `;
  }
  
  if (contadorAlumnos) {
    contadorAlumnos.innerHTML = `<i class="fas fa-spinner fa-spin" style="margin-right: 5px;"></i> Cargando alumnos...`;
  }
  
  // Hacer la solicitud para obtener los alumnos inscritos en esta actividad
  fetch(`./php/obtener_alumnos_inscritos_demetrio.php?id_actividad=${idActividad}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener alumnos');
      }
      return response.json();
    })
    .then(alumnos => {
      if (cuerpoTabla) {
        if (!alumnos || alumnos.length === 0) {
          cuerpoTabla.innerHTML = `
            <tr>
              <td colspan="5" style="text-align: center; padding: 20px; color: #666;">
                No hay estudiantes registrados en esta actividad
              </td>
            </tr>
          `;
          
          if (contadorAlumnos) {
            contadorAlumnos.innerHTML = `<span class="numero">0</span> alumnos inscritos`;
          }
          
          return;
        }
        
        // Llenar la tabla con los alumnos
        cuerpoTabla.innerHTML = alumnos.map((alumno, index) => `
          <tr class="alumno-${nombreActividad.toLowerCase()}">
            <td>${index + 1}</td>
            <td>${alumno.nombre}</td>
            <td>${alumno.numero_control}</td>
            <td>${alumno.semestre}</td>
            <td>${alumno.carrera}</td>
          </tr>
        `).join('');
        
        // Actualizar contador
        if (contadorAlumnos) {
          contadorAlumnos.innerHTML = `<span class="numero">${alumnos.length}</span> alumnos inscritos`;
        }
      }
    })
    .catch(error => {
      console.error('Error al cargar alumnos:', error);
      if (cuerpoTabla) {
        cuerpoTabla.innerHTML = `
          <tr>
            <td colspan="5" style="text-align: center; padding: 20px; color: #d33;">
              <i class="fas fa-exclamation-triangle" style="margin-right: 10px;"></i>
              Error al cargar los estudiantes. Por favor, intente nuevamente.
            </td>
          </tr>
        `;
      }
      
      if (contadorAlumnos) {
        contadorAlumnos.innerHTML = `<span class="numero">0</span> alumnos inscritos`;
      }
    });
}

// Función para cargar los datos de Valle de Etla desde la base de datos
function cargarDatosValleEtla() {
  const mainContent = document.querySelector('.main-content');
  
  // Mostrar indicador de carga
  mainContent.innerHTML = `
    <div class="cargando" style="text-align: center; padding: 50px;">
      <i class="fas fa-spinner fa-spin" style="font-size: 40px; color: #1B396A;"></i>
      <p style="margin-top: 20px; color: #555; font-size: 18px;">Cargando actividades de Valle de Etla...</p>
    </div>
  `;

  // Primero obtenemos las actividades disponibles para esta unidad
  fetch('./php/obtener_actividades_valle.php')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener actividades');
      }
      return response.json();
    })
    .then(actividades => {
      if (!actividades || actividades.length === 0) {
        mostrarMensajeNoActividadesValle();
        return;
      }
      
      // Ya tenemos las actividades, ahora construimos la interfaz
      construirInterfazValleEtla(actividades);
      
      // Seleccionamos la primera actividad por defecto
      if (actividades.length > 0) {
        cargarAlumnosActividadValle(actividades[0].id_actividad, actividades[0].nombre_actividad);
      }
    })
    .catch(error => {
      console.error('Error al cargar actividades:', error);
      mostrarErrorCargaValle();
    });
}

// Función para mostrar mensaje cuando no hay actividades en Valle de Etla
function mostrarMensajeNoActividadesValle() {
  const mainContent = document.querySelector('.main-content');
  mainContent.innerHTML = `
    <div class="encabezado-modal">
      <img src="./assets/img/Logo TecNM.png" alt="Logo TecNM" class="logo-modal">
      <h2 class="titulo-modal">Actividades Extraescolares - Valle de Etla</h2>
    </div>
    
    <div class="sin-actividades" style="text-align: center; padding: 50px; background-color: white; border-radius: 8px; margin-top: 20px;">
      <i class="fas fa-exclamation-circle" style="font-size: 50px; color: #ff7f00; margin-bottom: 20px;"></i>
      <h3 style="color: #1B396A; margin-bottom: 15px;">No hay actividades registradas</h3>
      <p style="color: #555; font-size: 16px;">No se encontraron actividades extraescolares para esta unidad académica.</p>
      <a href="./U_CentrodeInvestigacion.html" class="btn-vista-previa" style="background-color: #ff7f00; color: white; padding: 8px 15px; text-decoration: none; border-radius: 4px; font-weight: bold; transition: background-color 0.3s; display: inline-flex; align-items: center; margin-top: 20px; justify-content: center; max-width: 200px; margin-left: auto; margin-right: auto;">
        <i class="fas fa-plus" style="margin-right: 5px;"></i>Ir a gestión de actividades
      </a>
    </div>
  `;
}

// Función para mostrar mensaje de error en carga de Valle de Etla
function mostrarErrorCargaValle() {
  const mainContent = document.querySelector('.main-content');
  mainContent.innerHTML = `
    <div class="encabezado-modal">
      <img src="./assets/img/Logo TecNM.png" alt="Logo TecNM" class="logo-modal">
      <h2 class="titulo-modal">Actividades Extraescolares - Valle de Etla</h2>
    </div>
    
    <div class="error" style="text-align: center; padding: 50px; background-color: white; border-radius: 8px; margin-top: 20px;">
      <i class="fas fa-exclamation-triangle" style="font-size: 50px; color: #d33; margin-bottom: 20px;"></i>
      <h3 style="color: #1B396A; margin-bottom: 15px;">Error de conexión</h3>
      <p style="color: #555; font-size: 16px;">No se pudieron cargar las actividades desde la base de datos. Por favor, verifique su conexión e intente nuevamente.</p>
      <button onclick="cargarDatosValleEtla()" class="btn-reintentar" style="background-color: #1B396A; color: white; border: none; padding: 10px 20px; border-radius: 5px; margin-top: 20px; cursor: pointer;">
        <i class="fas fa-sync-alt" style="margin-right: 5px;"></i>Reintentar
      </button>
    </div>
  `;
}

// Función para construir la interfaz con las actividades obtenidas para Valle de Etla
function construirInterfazValleEtla(actividades) {
  const mainContent = document.querySelector('.main-content');
  
  // Construimos los botones de actividades
  const botonesActividades = actividades.map((actividad, index) => 
    `<button class="boton-actividad${index === 0 ? ' activo' : ''}" data-id="${actividad.id_actividad}" data-nombre="${actividad.nombre_actividad}">${actividad.nombre_actividad}</button>`
  ).join('');
  
  mainContent.innerHTML = `
    <div class="encabezado-modal">
      <img src="./assets/img/Logo TecNM.png" alt="Logo TecNM" class="logo-modal">
      <h2 class="titulo-modal">Actividades Extraescolares - Valle de Etla</h2>
    </div>

    <div class="barra-actividades">
      ${botonesActividades}
    </div>

    <div class="seccion-alumnos">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h3 class="titulo-centrado" id="tituloActividad">Alumnos inscritos a ${actividades[0].nombre_actividad}</h3>
        
        <!-- Botón Vista Previa más pequeño y a la derecha -->
        <a href="./U_ValleEtla.html" class="btn-vista-previa" style="background-color: #ff7f00; color: white; padding: 8px 15px; text-decoration: none; border-radius: 4px; font-weight: bold; transition: background-color 0.3s; display: inline-flex; align-items: center; box-shadow: 0 2px 5px rgba(0,0,0,0.2); font-size: 13px;">
          <i class="fas fa-eye" style="margin-right: 5px;"></i>Vista Previa
        </a>
      </div>

      <div class="contenedor-busqueda">
        <input type="text" id="busquedaAlumnos" placeholder="Buscar alumno..." class="busqueda-input" onkeyup="filtrarTabla()">
        <div class="contador-alumnos" id="contadorAlumnos">
          <i class="fas fa-spinner fa-spin" style="margin-right: 5px;"></i> Cargando alumnos...
        </div>
      </div>

      <div class="contenedor-tabla">
        <table class="tabla-alumnos">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>No. de Control</th>
              <th>Semestre</th>
              <th>Carrera</th>
            </tr>
          </thead>
          <tbody id="cuerpoTablaAlumnos">
            <tr>
              <td colspan="5" style="text-align: center; padding: 20px;">
                <i class="fas fa-spinner fa-spin" style="font-size: 30px; color: #1B396A;"></i>
                <p style="margin-top: 10px;">Cargando alumnos...</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
  
  // Configurar eventos para los botones de actividades
  configurarEventosUnidadHidalgo(actividades);
}

// Función para cargar los alumnos de una actividad específica en Valle de Etla
function cargarAlumnosActividadValle(idActividad, nombreActividad) {
  // Actualizar título
  const tituloActividad = document.getElementById('tituloActividad');
  if (tituloActividad) {
    tituloActividad.textContent = `Alumnos inscritos a ${nombreActividad}`;
  }
  
  // Mostrar spinner mientras se cargan los alumnos
  const cuerpoTabla = document.getElementById('cuerpoTablaAlumnos');
  const contadorAlumnos = document.getElementById('contadorAlumnos');
  
  if (cuerpoTabla) {
    cuerpoTabla.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; padding: 20px;">
          <i class="fas fa-spinner fa-spin" style="font-size: 30px; color: #1B396A;"></i>
          <p style="margin-top: 10px;">Cargando alumnos...</p>
        </td>
      </tr>
    `;
  }
  
  if (contadorAlumnos) {
    contadorAlumnos.innerHTML = `<i class="fas fa-spinner fa-spin" style="margin-right: 5px;"></i> Cargando alumnos...`;
  }
  
  // Hacer la solicitud para obtener los alumnos inscritos en esta actividad
  fetch(`./php/obtener_alumnos_inscritos_valle.php?id_actividad=${idActividad}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener alumnos');
      }
      return response.json();
    })
    .then(alumnos => {
      if (cuerpoTabla) {
        if (!alumnos || alumnos.length === 0) {
          cuerpoTabla.innerHTML = `
            <tr>
              <td colspan="5" style="text-align: center; padding: 20px; color: #666;">
                No hay estudiantes registrados en esta actividad
              </td>
            </tr>
          `;
          
          if (contadorAlumnos) {
            contadorAlumnos.innerHTML = `<span class="numero">0</span> alumnos inscritos`;
          }
          
          return;
        }
        
        // Llenar la tabla with los alumnos
        cuerpoTabla.innerHTML = alumnos.map((alumno, index) => `
          <tr class="alumno-${nombreActividad.toLowerCase()}">
            <td>${index + 1}</td>
            <td>${alumno.nombre}</td>
            <td>${alumno.numero_control}</td>
            <td>${alumno.semestre}</td>
            <td>${alumno.carrera}</td>
          </tr>
        `).join('');
        
        // Actualizar contador
        if (contadorAlumnos) {
          contadorAlumnos.innerHTML = `<span class="numero">${alumnos.length}</span> alumnos inscritos`;
        }
      }
    })
    .catch(error => {
      console.error('Error al cargar alumnos:', error);
      if (cuerpoTabla) {
        cuerpoTabla.innerHTML = `
          <tr>
            <td colspan="5" style="text-align: center; padding: 20px; color: #d33;">
              <i class="fas fa-exclamation-triangle" style="margin-right: 10px;"></i>
              Error al cargar los estudiantes. Por favor, intente nuevamente.
            </td>
          </tr>
        `;
      }
      
      if (contadorAlumnos) {
        contadorAlumnos.innerHTML = `<span class="numero">0</span> alumnos inscritos`;
      }
    });
}

// Función para mostrar la página de gestión de actividades
function mostrarGestionActividades() {
  const mainContent = document.querySelector('.main-content');
  mainContent.innerHTML = `
    <div class="gestion-actividades" style="margin-top: 20px;">
      <h1 class="titulo-recuadro" style="font-family: 'Segoe UI', sans-serif; color: #1B396A; font-size: 24px; text-align: center;">G E S T I Ó N &nbsp; D E &nbsp; A C T I V I D A D E S</h1>
      <p class="mb-4" style="font-family: 'Segoe UI', sans-serif; color: #555; font-size: 16px; text-align: center; margin-top: 10px;">Administra las actividades extraescolares de cada unidad académica. Agrega, edita o elimina actividades, y asigna alumnos a las mismas de manera sencilla y rápida.</p>

      <div class="card shadow mb-4" style="margin: 0 auto; max-width: 90%;">
        <div class="card-header py-3" style="background-color: #1B396A; color: white; padding: 10px; border-radius: 5px;">
          <h6 class="m-0 font-weight-bold text-primary" style="font-family: 'Segoe UI', sans-serif; font-size: 18px; color: white;">Actividades por Unidad</h6>
        </div>
        <div class="card-body" style="padding: 15px; background-color: white;">
          <div class="table-responsive" style="overflow-x: auto;">
            <table class="table table-bordered" id="dataTableCoordinador" width="100%" cellspacing="0" style="font-family: 'Segoe UI', sans-serif; font-size: 14px;">
              <thead>
                <tr style="background-color: #1B396A; color: white;">
                  <th>Unidad</th>
                  <th>Actividad</th>
                  <th>Inscritos</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody id="tablaActividadesCoordinador">
                <!-- Las actividades se cargarán desde la base de datos -->
                <tr>
                  <td colspan="4" style="text-align: center; padding: 20px;">
                    <i class="fas fa-spinner fa-spin" style="font-size: 30px; color: #1B396A;"></i>
                    <p style="margin-top: 10px;">Cargando actividades...</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="card shadow mb-4" style="margin: 0 auto; max-width: 90%;">
        <div class="card-header py-3" style="background-color: #1B396A; color: white; padding: 10px; border-radius: 5px;">
          <h6 class="m-0 font-weight-bold text-primary" style="font-family: 'Segoe UI', sans-serif; font-size: 18px; color: white;">Gestión de Usuarios</h6>
        </div>
        <div class="card-body" style="padding: 15px; background-color: white;">
          <div class="table-responsive" style="overflow-x: auto;">
            <table class="table table-bordered" id="dataTableUsuariosCoordinador" width="100%" cellspacing="0" style="font-family: 'Segoe UI', sans-serif; font-size: 14px;">
              <thead>
                <tr style="background-color: #1B396A; color: white;">
                  <th>Nombre</th>
                  <th>Contacto</th>
                  <th>Contraseña</th>
                  <th>Unidad Académica</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody id="tablaUsuariosCoordinador">
                <!-- Los usuarios se cargarán desde la base de datos -->
                <tr>
                  <td colspan="6" style="text-align: center; padding: 20px;">
                    <i class="fas fa-spinner fa-spin" style="font-size: 30px; color: #1B396A;"></i>
                    <p style="margin-top: 10px;">Cargando usuarios...</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Cargar actividades y usuarios
  cargarActividadesDesdeBaseDeDatosCoordinador();
  cargarUsuariosDesdeBaseDeDatosCoordinador();
}

// Función para cargar actividades en el panel del coordinador
function cargarActividadesDesdeBaseDeDatosCoordinador() {
  const tablaActividades = document.getElementById('tablaActividadesCoordinador');
  if (tablaActividades) {
    tablaActividades.innerHTML = `
      <tr>
        <td colspan="4" style="text-align: center; padding: 20px;">
          <i class="fas fa-spinner fa-spin" style="font-size: 30px; color: #1B396A;"></i>
          <p style="margin-top: 10px;">Cargando actividades...</p>
        </td>
      </tr>
    `;
    
    fetch('../php/obtener_actividades_coordinador.php')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then(result => {
        if (result.success) {
          // Limpiar la tabla
          tablaActividades.innerHTML = '';
          
          // Verificar si hay actividades
          if (result.data && result.data.length > 0) {
            // Agregar cada actividad a la tabla
            result.data.forEach(actividad => {
              const fila = document.createElement('tr');
              
              fila.innerHTML = `
                <td>${actividad.unidad || 'Sin unidad'}</td>
                <td>${actividad.nombre_actividad || 'Sin actividad'}</td>
                <td>${actividad.inscritos || 0}</td>
                <td>
                  <button class="btn-editar-actividad" style="background-color: #1B396A; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">
                    <i class="fas fa-edit" style="margin-right: 5px;"></i>Editar
                  </button>
                  <button class="btn-eliminar-actividad" style="background-color: #d33; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">
                    <i class="fas fa-trash" style="margin-right: 5px;"></i>Eliminar
                  </button>
                </td>
              `;
              tablaActividades.appendChild(fila);
            });
          } else {
            tablaActividades.innerHTML = `
              <tr>
                <td colspan="4" style="text-align: center; padding: 20px;">
                  No hay actividades registradas.
                </td>
              </tr>
            `;
          }
        } else {
          console.error('Error al obtener actividades:', result.message);
          tablaActividades.innerHTML = `
            <tr>
              <td colspan="4" style="text-align: center; padding: 20px; color: #d33;">
                <i class="fas fa-exclamation-triangle" style="margin-right: 10px;"></i>
                Error al cargar actividades. Por favor, intente nuevamente.
              </td>
            </tr>
          `;
        }
      })
      .catch(error => {
        console.error('Error:', error);
        tablaActividades.innerHTML = `
          <tr>
            <td colspan="4" style="text-align: center; padding: 20px; color: #d33;">
              <i class="fas fa-exclamation-triangle" style="margin-right: 10px;"></i>
              Error de conexión. Por favor, verifique su conexión a internet o al servidor. (${error.message})
            </td>
          </tr>
        `;
      });
  }
}

// Función para cargar usuarios en el panel del coordinador
function cargarUsuariosDesdeBaseDeDatosCoordinador() {
  const tablaUsuarios = document.getElementById('tablaUsuariosCoordinador');
  if (tablaUsuarios) {
    tablaUsuarios.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 20px;">
          <i class="fas fa-spinner fa-spin" style="font-size: 30px; color: #1B396A;"></i>
          <p style="margin-top: 10px;">Cargando usuarios...</p>
        </td>
      </tr>
    `;
    
    fetch('../php/obtener_usuarios.php')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then(result => {
        if (result.success) {
          // Limpiar la tabla
          tablaUsuarios.innerHTML = '';
          
          // Verificar si hay usuarios
          if (result.data && result.data.length > 0) {
            // Agregar cada usuario a la tabla
            result.data.forEach(usuario => {
              const fila = document.createElement('tr');
              fila.setAttribute('data-id', usuario.id_usuario);

              fila.innerHTML = `
                <td>${usuario.nombre || 'Sin nombre'}</td>
                <td>${usuario.contacto || 'No especificado'}</td>
                <td style="position:relative;">
                  <span class="password-oculta">••••••••</span>
                  <span class="password-real" style="display:none;">${usuario.contraseña || ''}</span>
                  <i class="fas fa-eye-slash ver-password" style="cursor:pointer; position:absolute; right:10px; top:50%; transform:translateY(-50%); color:#1B396A;" title="Ver contraseña"></i>
                </td>
                <td>${usuario.unidad_academica || 'No especificada'}</td>
                <td>${usuario.rol || 'No especificado'}</td>
                <td>
                  <i class="fas fa-edit" style="cursor: pointer; color: #1B396A; margin-right: 10px; font-size: 18px;"></i>
                  <i class="fas fa-trash" style="cursor: pointer; color: #d33; font-size: 18px;"></i>
                </td>
              `;
              tablaUsuarios.appendChild(fila);

              // Evento para mostrar/ocultar contraseña
              const iconoVer = fila.querySelector('.ver-password');
              if (iconoVer) {
                iconoVer.addEventListener('click', function() {
                  const spanOculta = fila.querySelector('.password-oculta');
                  const spanReal = fila.querySelector('.password-real');
                  if (spanOculta.style.display === 'none') {
                    spanOculta.style.display = '';
                    spanReal.style.display = 'none';
                    iconoVer.classList.remove('fa-eye');
                    iconoVer.classList.add('fa-eye-slash');
                    iconoVer.title = "Ver contraseña";
                  } else {
                    spanOculta.style.display = 'none';
                    spanReal.style.display = '';
                    iconoVer.classList.remove('fa-eye-slash');
                    iconoVer.classList.add('fa-eye');
                    iconoVer.title = "Ocultar contraseña";
                  }
                });
              }
            });
          } else {
            tablaUsuarios.innerHTML = `
              <tr>
                <td colspan="6" style="text-align: center; padding: 20px;">
                  No hay usuarios registrados.
                </td>
              </tr>
            `;
          }
        } else {
          console.error('Error al obtener usuarios:', result.message);
          tablaUsuarios.innerHTML = `
            <tr>
              <td colspan="6" style="text-align: center; padding: 20px; color: #d33;">
                <i class="fas fa-exclamation-triangle" style="margin-right: 10px;"></i>
                Error al cargar usuarios. Por favor, intente nuevamente.
              </td>
            </tr>
          `;
        }
      })
      .catch(error => {
        console.error('Error:', error);
        tablaUsuarios.innerHTML = `
          <tr>
            <td colspan="6" style="text-align: center; padding: 20px; color: #d33;">
              <i class="fas fa-exclamation-triangle" style="margin-right: 10px;"></i>
              Error de conexión. Por favor, verifique su conexión a internet o al servidor. (${error.message})
            </td>
          </tr>
        `;
      });
  }
}
