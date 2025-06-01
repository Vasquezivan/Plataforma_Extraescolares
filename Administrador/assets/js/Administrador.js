// Datos iniciales (deben coincidir con tu HTML inicial)
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

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
  const mainContent = document.querySelector('.main-content');

  // Mostrar contenido de inicio al cargar la página
  mainContent.innerHTML = `
    <div class="bienvenida-panel" style="text-align: center; margin-top: 50px;">
      <h1 style="font-family: 'Segoe UI', sans-serif; color: #1B396A; font-size: 36px;">Bienvenido al Panel Administrador</h1>
      <p style="font-family: 'Segoe UI', sans-serif; color: #555; font-size: 18px; margin-top: 20px;">Aquí podrás gestionar las actividades extraescolares, administrar usuarios y mucho más.</p>
      <img src="./assets/img/Logo TecNM.png" alt="Logo TecNM" style="width: 150px; margin-top: 30px;">
      <div style="margin-top: 40px;">
      </div>
    </div>
  `;

  // Configurar navegación en el dashboard
  document.querySelector('.inicio-dashboard').addEventListener('click', function() {
    mainContent.innerHTML = `
      <div class="bienvenida-panel" style="text-align: center; margin-top: 50px;">
        <h1 style="font-family: 'Segoe UI', sans-serif; color: #1B396A; font-size: 36px;">Bienvenido al Panel Administrador</h1>
        <p style="font-family: 'Segoe UI', sans-serif; color: #555; font-size: 18px; margin-top: 20px;">Aquí podrás gestionar las actividades extraescolares, administrar usuarios y mucho más.</p>
        <img src="./assets/img/Logo TecNM.png" alt="Logo TecNM" style="width: 150px; margin-top: 30px;">
        <div style="margin-top: 40px;">
      </div>
    `;
  });

  // Configurar navegación para Gestión de Usuarios
  const gestionUsuarios = document.querySelector('.gestion-usuarios');
  if (gestionUsuarios) {
    gestionUsuarios.addEventListener('click', function() {
      const mainContent = document.querySelector('.main-content');
      mainContent.innerHTML = `
        <div class="gestion-usuarios" style="margin-top: 20px;">
          <h1 class="titulo-recuadro" style="font-family: 'Segoe UI', sans-serif; color: #1B396A; font-size: 24px; text-align: center;">G E S T I Ó N &nbsp; D E &nbsp; U S U A R I O S</h1>
          <p class="mb-4" style="font-family: 'Segoe UI', sans-serif; color: #555; font-size: 16px; text-align: center; margin-top: 10px;">Administra de forma sencilla la información de los usuarios. Agrega, edita o elimina perfiles.</p>

          <div class="card shadow mb-4" style="margin: 0 auto; max-width: 90%; height:  ">
            <div class="card-header py-3 encabezado-con-boton" style="display: flex; justify-content: space-between; align-items: center; background-color:#1B396A; color: white; padding: 5px; border-radius: 5px; height: 40px;">
              <h6 class="m-0 font-weight-bold text-primary" style="font-family: 'Segoe UI', sans-serif; font-size: 16px;">Tabla de datos</h6>
              <button class="btn btn-personalizado btn-sm btn-agregar-usuario" id="btnAgregarUsuario" style="background-color: #00A9Fc; color: white; padding: 5px 10px; border: none; border-radius: 5px; font-size: 14px; cursor: pointer;">
                <i class="fas fa-user-plus"></i> Agregar
              </button>
            </div>

            <div style="margin-top: 20px;">
              <input type="text" id="busquedaUsuarios" placeholder="Buscar usuario..." style="width: 50%; padding: 10px; border: 1px solid #ccc; border-radius: 5px; font-size: 14px;">
            </div>

            <div style="margin-top: 20px;">
              <!-- Aquí comienza la tabla -->
              <div class="table-responsive" style="overflow-x: auto;">
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0" style="font-family: 'Segoe UI', sans-serif; font-size: 14px;">
                  <thead>
                    <tr style="background-color:rgb(231, 231, 231); color: black;">
                      <th>Nombre</th>
                      <th>Unidad Academica</th>
                      <th>Contacto</th>
                      <th>Rol</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody id="tablaUsuarios">
                    <!-- Los usuarios se cargarán aquí dinámicamente -->
                    <tr>
                      <td>Juan Pérez</td>
                      <td>Unidad Demetrio Vallejo</td>
                      <td>juan.perez@example.com</td>
                      <td>Administrador</td>
                      <td>
                        <i class="fas fa-edit" style="cursor: pointer; color: #1B396A; margin-right: 10px; font-size: 18px;"></i>
                        <i class="fas fa-trash" style="cursor: pointer; color: #d33; font-size: 18px;"></i>
                      </td>
                    </tr>
                    <tr>
                  <td>Laura González</td>
                  <td>Unidad Valle de Etla</td>
                  <td>laura.gonzalez@example.com</td>
                  <td>Coordinador</td>
                  <td>
                   <i class="fas fa-edit" style="cursor: pointer; color: #1B396A; margin-right: 10px; font-size: 18px;"></i>
                  <i class="fas fa-trash" style="cursor: pointer; color: #d33; font-size: 18px;"></i>
                  </td>
                </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      `;
    });
  }

  // Asegur
  document.addEventListener('click', function(event) {
    const btnAgregarUsuario = event.target.closest('#btnAgregarUsuario');
    if (btnAgregarUsuario) {
        const modalHTML = `
            <div id="modalAgregarUsuario" class="modal" style="display: block; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.7);">
                <div class="modal-contenido" style="background-color: white; margin: auto; padding: 30px; width: 35%; border-radius: 15px; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
                    <h2 style="font-family: 'Segoe UI', sans-serif; color: #1B396A; text-align: center; margin-bottom: 20px;">Agregar Usuario</h2>
                    <form id="formAgregarUsuario">
                        <div style="margin-bottom: 20px;">
                            <label for="nombreUsuario" style="font-family: 'Segoe UI', sans-serif; font-size: 16px; font-weight: bold;">Nombre:</label>
                            <input type="text" id="nombreUsuario" name="nombreUsuario" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px; font-size: 14px;">
                            <span id="errorNombre" style="color: red; font-size: 12px; display: none;">
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
                            <input type="email" id="contactoUsuario" name="contactoUsuario" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px; font-size: 14px;">
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

        const btnCerrarModal = document.getElementById('btnCerrarModal');
        btnCerrarModal.addEventListener('click', function() {
            const modal = document.getElementById('modalAgregarUsuario');
            modal.parentNode.removeChild(modal);
        });

        const btnConfirmarAgregar = document.getElementById('btnConfirmarAgregar');
        btnConfirmarAgregar.addEventListener('click', function() {
            const nombre = document.getElementById('nombreUsuario').value;
            const unidad = document.getElementById('unidadUsuario').value;
            const contacto = document.getElementById('contactoUsuario').value;
            const rol = document.getElementById('rolUsuario').value;

            let valid = true;

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

            if (valid) {
                const tablaUsuarios = document.getElementById('tablaUsuarios');
                const nuevoUsuario = document.createElement('tr');
                nuevoUsuario.innerHTML = `
                    <td>${nombre}</td>
                    <td>${unidad}</td>
                    <td>${contacto}</td>
                    <td>${rol}</td>
                    <td>
                        <i class="fas fa-edit" style="cursor: pointer; color: #1B396A; margin-right: 10px; font-size: 18px;"></i>
                        <i class="fas fa-trash" style="cursor: pointer; color: #d33; font-size: 18px;"></i>
                    </td>
                `;
                tablaUsuarios.appendChild(nuevoUsuario);

                const modal = document.getElementById('modalAgregarUsuario');
                modal.parentNode.removeChild(modal);
            }
        });
    }
  });

  document.addEventListener('click', function(event) {
    const btnEditarUsuario = event.target.closest('.fa-edit');
    if (btnEditarUsuario) {
        const filaUsuario = btnEditarUsuario.closest('tr');
        const nombre = filaUsuario.children[0].textContent;
        const unidad = filaUsuario.children[1].textContent;
        const contacto = filaUsuario.children[2].textContent;
        const rol = filaUsuario.children[3].textContent;

        const modalHTML = `
            <div id="modalEditarUsuario" class="modal" style="display: block; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.7);">
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

        const btnCerrarModalEditar = document.getElementById('btnCerrarModalEditar');
        btnCerrarModalEditar.addEventListener('click', function() {
            const modal = document.getElementById('modalEditarUsuario');
            modal.parentNode.removeChild(modal);
        });

        const btnGuardarEditar = document.getElementById('btnGuardarEditar');
        btnGuardarEditar.addEventListener('click', function() {
            const nuevoNombre = document.getElementById('editarNombreUsuario').value;
            const nuevaUnidad = document.getElementById('editarUnidadUsuario').value;
            const nuevoContacto = document.getElementById('editarContactoUsuario').value;
            const nuevoRol = document.getElementById('editarRolUsuario').value;

            let valid = true;

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

            if (valid) {
                filaUsuario.children[0].textContent = nuevoNombre;
                filaUsuario.children[1].textContent = nuevaUnidad;
                filaUsuario.children[2].textContent = nuevoContacto;
                filaUsuario.children[3].textContent = nuevoRol;

                const modal = document.getElementById('modalEditarUsuario');
                modal.parentNode.removeChild(modal);
            }
        });
    }
  });

  document.addEventListener('click', function(event) {
    const btnEliminarUsuario = event.target.closest('.fa-trash');
    if (btnEliminarUsuario) {
        const filaUsuario = btnEliminarUsuario.closest('tr');

        Swal.fire({
            title: "¿Estás seguro de eliminar este usuario?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminarlo"
        }).then((result) => {
            if (result.isConfirmed) {
                filaUsuario.parentNode.removeChild(filaUsuario);

                Swal.fire({
                    title: "¡Eliminado!",
                    text: "El usuario ha sido eliminado.",
                    icon: "success"
                });
            }
        });
    }
  });
});

function configurarEventosUnidades() {
  document.querySelector('.contenedor-unidades').addEventListener('click', function(e) {
    const button = e.target.closest('button');
    if (!button) return;

    const action = button.dataset.action;
    const unidadElement = button.closest('.unidad');
    const index = Array.from(document.querySelectorAll('.unidad')).indexOf(unidadElement);

    if (index === -1) return;

    if (action === 'edit') {
      editarUnidad(index);
    } else if (action === 'delete') {
      eliminarUnidad(index);
    } else if (action === 'view') {
      verUnidad(unidadesAcademicas[index]); // Ajuste para pasar el nombre completo de la unidad
    }
  });
}

function asignarIndicesIniciales() {
  // Asegurarse que las unidades iniciales están en el array
  const unidadesIniciales = document.querySelectorAll('.unidad');
  unidadesIniciales.forEach((unidad, index) => {
    if (!unidadesAcademicas[index]) {
      unidadesAcademicas[index] = unidad.querySelector('h2').textContent;
    }
  });
}

// El resto de tus funciones permanecen igual (abrirModalUnidad, guardarUnidad, etc.)

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
// FUNCIONES PARA ACTIVIDADES (tus funciones existentes)

function cerrarModal() {
  document.getElementById('modalActividades').style.display = 'none';
}

function seleccionarActividad(nombreActividad, unidad) {
  const datosUnidad = datosUnidades[unidad];
  if (!datosUnidad || !datosUnidad.alumnos[nombreActividad]) {
    console.error("No se encontraron datos para la actividad:", nombreActividad, "en la unidad:", unidad);
    return;
  }

  // Actualizar el título de la actividad seleccionada
  const tituloActividad = document.getElementById('tituloActividad');
  tituloActividad.textContent = `Alumnos inscritos a ${nombreActividad}`;

  // Actualizar la tabla de alumnos
  const cuerpoTabla = document.getElementById('cuerpoTablaAlumnos');
  cuerpoTabla.innerHTML = datosUnidad.alumnos[nombreActividad].map((alumno, index) => 
    `<tr>
      <td>${index + 1}</td>
      <td>${alumno.nombre}</td>
      <td>${alumno.control}</td>
      <td>${alumno.semestre}</td>
      <td>${alumno.carrera}</td>
      <td>${unidad}</td>
    </tr>`
  ).join('');

  // Actualizar el contador de alumnos
  const contadorAlumnos = document.getElementById('contadorAlumnos');
  contadorAlumnos.innerHTML = `<span class="numero">${datosUnidad.alumnos[nombreActividad].length}</span> alumnos inscritos`;
}

function filtrarTabla() {
  const input = document.getElementById('busquedaAlumnos');
  const filtro = input.value.toLowerCase();
  const actividadActual = document.querySelector('.boton-actividad.activo').textContent.toLowerCase();
  const filas = document.querySelectorAll(`#cuerpoTablaAlumnos .alumno-${actividadActual}`);

  filas.forEach(fila => {
    const celdas = fila.querySelectorAll('td');
    const textoFila = Array.from(celdas).map(celda => celda.textContent.toLowerCase()).join(' ');

    if (textoFila.includes(filtro)) {
      fila.classList
    } else {
      fila.classList.add('ocultar');
    }
  });

  // Actualizar el contador de alumnos visibles
  const alumnosVisibles = document.querySelectorAll(`#cuerpoTablaAlumnos .alumno-${actividadActual}:not(.ocultar)`);
  const contadorAlumnos = document.getElementById('contadorAlumnos');
  contadorAlumnos.innerHTML = `<span class="numero">${alumnosVisibles.length}</span> alumnos inscritos`;
}

function mostrarInformacionUnidad(unidad) {
  const datosUnidad = datosUnidades[unidad];
  if (!datosUnidad) {
    console.error("No se encontraron datos para la unidad:", unidad);
    return;
  }

  const contenedor = document.querySelector('.main-content');
  contenedor.innerHTML = `
    <div class="encabezado-modal">
      <img src="./assets/img/Logo TecNM.png" alt="Logo TecNM" class="logo-modal">
      <h2 class="titulo-modal">Actividades Extraescolares - ${unidad}</h2>
    </div>

    <div class="barra-actividades">
      ${datosUnidad.actividades.map(actividad => 
        `<button class="boton-actividad" onclick="seleccionarActividad('${actividad}', '${unidad}')">${actividad}</button>`
      ).join('')}
    </div>

    <div class="seccion-alumnos">
      <h3 class="titulo-centrado" id="tituloActividad">Alumnos inscritos a ${datosUnidad.actividades[0]}</h3>

      <div class="contenedor-busqueda">
        <input type="text" id="busquedaAlumnos" placeholder="Buscar alumno..." class="busqueda-input" onkeyup="filtrarTabla('${unidad}')">
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
              <th>Unidad Académica</th>
            </tr>
          </thead>
          <tbody id="cuerpoTablaAlumnos">
            ${datosUnidad.alumnos[datosUnidad.actividades[0]].map((alumno, index) => 
              `<tr>
                <td>${index + 1}</td>
                <td>${alumno.nombre}</td>
                <td>${alumno.control}</td>
                <td>${alumno.semestre}</td>
                <td>${alumno.carrera}</td>
                <td>${unidad}</td>
              </tr>`
            ).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// FILTRO PARA USUARIOS
function filtrarUsuarios() {
  const input = document.getElementById('busquedaUsuarios');
  const filtro = input.value.toLowerCase();
  const filas = document.querySelectorAll('#cuerpoTablaUsuarios tr');

  filas.forEach(fila => {
    const celdas = fila.getElementsByTagName('td');
    let coincide = false;

    for (let i = 0; i < celdas.length; i++) {
      if (celdas[i].textContent.toLowerCase().includes(filtro)) {
        coincide = true;
        break;
      }
    }

    fila.style.display = coincide ? '' : 'none';
  });
}

function cerrarModalUsuario() {
  const modal = document.getElementById('modalAgregarUsuario');
  if (modal) {
    modal.style.display = 'none'; // Ocultar el modal
    modal.parentNode.removeChild(modal); // Eliminar el modal del DOM
  }
  document.body.style.backgroundColor = ''; // Restaurar el fondo de la página
}

// Configurar el botón de cerrar
const btnCerrarModal = document.getElementById('btnCerrarModal');
btnCerrarModal.addEventListener('click', cerrarModalUsuario);

