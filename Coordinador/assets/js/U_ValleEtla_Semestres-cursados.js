/**
 * Semestres-cursados.js
 * Contiene la funcionalidad para la gestión de semestres académicos
 * ITVE - Instituto Tecnológico del Valle de Etla
 */

document.addEventListener('DOMContentLoaded', async function() {
  // Referencias a elementos del DOM
  const btnCrearSemestre = document.getElementById('btnCrearSemestre');
  const modalSemestre = document.getElementById('modalSemestre');
  const cerrarModal = document.getElementById('cerrarModal');
  const btnCancelar = document.getElementById('btnCancelar');
  const formSemestre = document.getElementById('formSemestre');
  const iconoPerfil = document.getElementById('iconoPerfil');
  const contenedorSemestres = document.getElementById('contenedorSemestres');
  
  // Variable para llevar control de los semestres
  let semestres = [];
  let semestreEnEdicion = null;

  // Función para cargar los semestres desde la base de datos
  async function cargarSemestres() {
    try {
      const response = await fetch('php/obtener_semestres.php');
      const resultado = await response.json();

      console.log('cargarSemestres: resultado recibido', resultado && typeof resultado === 'object' ? ('success=' + resultado.success) : typeof resultado);

      if (resultado && resultado.success) {
        semestres = resultado.data || [];
        console.log('cargarSemestres: semestres.length =', semestres.length);
        // Forzar orden: ordenar por id (numérico) descendente si existe,
        // si no por fecha_creacion o fechaInicio descendente. Esto asegura
        // que el semestre más reciente quede primero en la lista.
        semestres.sort((a, b) => {
          const ai = a.id ? Number(a.id) : NaN;
          const bi = b.id ? Number(b.id) : NaN;
          if (!isNaN(ai) && !isNaN(bi)) return bi - ai; // id desc
          const ad = new Date(a.fecha_creacion || a.fechaInicio || 0).getTime();
          const bd = new Date(b.fecha_creacion || b.fechaInicio || 0).getTime();
          return bd - ad;
        });

        // Limpiar el contenedor antes de agregar las tarjetas
        if (contenedorSemestres) {
          try {
            contenedorSemestres.innerHTML = '';
          } catch (e) {
            console.error('Error limpiando contenedorSemestres:', e);
          }
        } else {
          console.warn('contenedorSemestres no existe en el DOM');
        }

        // Agregar cada semestre al DOM en orden (ya ordenado): usamos append
        // para que el primer elemento del array quede a la izquierda.
        semestres.forEach((semestre, idx) => {
          try {
            if (typeof agregarTarjetaSemestre === 'function') {
              agregarTarjetaSemestre(semestre, false);
            } else {
              console.error('agregarTarjetaSemestre no es una función en tiempo de ejecución', agregarTarjetaSemestre);
            }
          } catch (errCard) {
            console.error('Error al renderizar la tarjeta del semestre index', idx, semestre, errCard);
            // Continuar con las demás tarjetas
          }
        });
      } else {
        throw new Error(resultado.message);
      }
    } catch (error) {
      console.error('Error al cargar semestres:', error);
      // Mostrar detalle del error en consola y en la alerta para facilitar diagnóstico
      const detalle = (error && (error.message || error.toString())) + (error && error.stack ? '\n' + error.stack : '');
      Swal.fire({
        title: 'Error',
        html: '<pre style="text-align:left;white-space:pre-wrap;">' + (detalle || 'No se pudieron cargar los semestres') + '</pre>',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  // Cargar semestres al iniciar la página
  await cargarSemestres();
  
  // Inicializar el array de semestres con los que ya existen en el HTML
  function inicializarSemestres() {
    // Obtener todas las tarjetas existentes
    const tarjetasExistentes = document.querySelectorAll('.semestre-card');
    
    tarjetasExistentes.forEach(tarjeta => {
      const id = tarjeta.dataset.id;
      const nombre = tarjeta.querySelector('.semestre-periodo').textContent;
      
      // Extraer las fechas del texto (formato: DD/MM/YYYY)
      const fechaInicioText = tarjeta.querySelector('.semestre-info p:nth-child(1)').textContent;
      const fechaFinText = tarjeta.querySelector('.semestre-info p:nth-child(2)').textContent;
      
      // Parsear las fechas
      const fechaInicioMatch = fechaInicioText.match(/(\d{2})\/(\d{2})\/(\d{4})/);
      const fechaFinMatch = fechaFinText.match(/(\d{2})\/(\d{2})\/(\d{4})/);
      
      let fechaInicio = '';
      let fechaFin = '';
      
      if (fechaInicioMatch) {
        const [_, dia, mes, anio] = fechaInicioMatch;
        fechaInicio = `${anio}-${mes}-${dia}`;
      }
      
      if (fechaFinMatch) {
        const [_, dia, mes, anio] = fechaFinMatch;
        fechaFin = `${anio}-${mes}-${dia}`;
      }
      
      // Extraer el número de alumnos y actividades
      const alumnosText = tarjeta.querySelector('.semestre-info p:nth-child(3)').textContent;
      const actividadesText = tarjeta.querySelector('.semestre-info p:nth-child(4)').textContent;
      
      const alumnos = parseInt(alumnosText.match(/\d+/)[0]) || 0;
      const actividades = parseInt(actividadesText.match(/\d+/)[0]) || 0;
      
      // Crear objeto semestre y añadirlo al array
      const semestre = {
        id,
        nombre,
        fechaInicio,
        fechaFin,
        estado: 'activo',
        alumnos,
        actividades,
        descripcion: ''
      };
      
      semestres.push(semestre);
      
      // Añadir eventos a los botones de esta tarjeta
        // En vista de Coordinador NO mostramos ni editamos ni eliminamos semestres.
        // No se añaden listeners para editar/eliminar aquí.
      
      // Añadir evento de clic a la tarjeta para abrir el panel de administrador
      tarjeta.addEventListener('click', function(event) {
        // Evitar que el clic se propague a los botones de editar y eliminar
        if (!event.target.closest('.btn-semestre')) {
          abrirPanelAdministrador(semestre);
        }
      });
    });
  }
  
  // Si no se cargaron semestres desde el servidor, inicializar los existentes en el HTML
  if (!semestres || semestres.length === 0) {
    inicializarSemestres();
  }
  
  // Mostrar modal al hacer clic en el botón de crear semestre
    // En la vista de Coordinador no permitimos crear nuevos semestres: ocultar el botón si existe
    if (btnCrearSemestre) {
      try { btnCrearSemestre.style.display = 'none'; } catch (e) {}
      // No se añade listener en la vista de coordinador
    }
  
  // Cerrar modal
  cerrarModal.addEventListener('click', function() {
    modalSemestre.style.display = 'none';
  });
  
  btnCancelar.addEventListener('click', function() {
    modalSemestre.style.display = 'none';
  });
  
  // Cerrar modal al hacer clic fuera del contenido
  window.addEventListener('click', function(event) {
    if (event.target == modalSemestre) {
      modalSemestre.style.display = 'none';
    }
  });
  
  // Manejar envío del formulario
  formSemestre.addEventListener('submit', async function(event) {
    event.preventDefault();
    console.log('Formulario enviado');
    
    const esEdicion = document.getElementById('semestreId').value !== '';
    
    // Obtener datos del formulario
    const datosSemestre = {
      nombre: document.getElementById('nombreSemestre').value,
      fechaInicio: document.getElementById('fechaInicio').value,
      fechaFin: document.getElementById('fechaFin').value,
      descripcion: document.getElementById('descripcionSemestre').value || ''
    };
    
    console.log('Datos del semestre:', datosSemestre);
    
    try {
      if (esEdicion) {
        // Agregar el ID al objeto de datos para la actualización
        const semestreId = document.getElementById('semestreId').value;
        const datosActualizados = {
          id_semestre: semestreId,
          nombre: datosSemestre.nombre,
          fechaInicio: datosSemestre.fechaInicio,
          fechaFin: datosSemestre.fechaFin,
          descripcion: datosSemestre.descripcion
        };
        
        console.log('Datos a enviar para actualización:', datosActualizados);
        
        // Enviar datos al servidor para actualizar el semestre
        const response = await fetch('php/editar_semestre.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(datosActualizados)
        });
        
        const resultado = await response.json();
        
        if (resultado.success) {
          // Actualizar el semestre en el array local
          const index = semestres.findIndex(s => s.id === datosSemestre.id);
          if (index !== -1) {
            semestres[index] = { ...semestres[index], ...datosSemestre };
          }
          
          // Cerrar el modal
          modalSemestre.style.display = 'none';
          
          // Mostrar mensaje de éxito y actualizar la tarjeta
          Swal.fire({
            title: '¡Actualizado!',
            text: resultado.message,
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#1B396A'
          }).then(() => {
            actualizarTarjetaSemestre({ 
              id: document.getElementById('semestreId').value,
              nombre: datosSemestre.nombre,
              fechaInicio: datosSemestre.fechaInicio,
              fechaFin: datosSemestre.fechaFin,
              alumnos: semestreEnEdicion.alumnos || 0,
              actividades: semestreEnEdicion.actividades || 0
            });
          });
        } else {
          throw new Error(resultado.message);
        }
      } else {
        console.log('Enviando datos al servidor...');
        // Enviar datos al servidor para crear nuevo semestre
        const response = await fetch('php/crear_semestre.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(datosSemestre)
        });
        console.log('Respuesta del servidor recibida');
        
        const resultado = await response.json();
        
        if (resultado.success) {
          // Agregamos el ID devuelto por el servidor
          datosSemestre.id = resultado.id;
          datosSemestre.estado = "activo";
          datosSemestre.alumnos = 0;
          datosSemestre.actividades = 0;
          
          // Agregar al array local
          semestres.push(datosSemestre);
          
          // Cerrar el modal
          modalSemestre.style.display = 'none';
          
          // Mostrar mensaje de éxito
          Swal.fire({
            title: '¡Éxito!',
            text: resultado.message,
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#1B396A'
          }).then(() => {
            // Agregar la nueva tarjeta de semestre después de confirmar (insertar al inicio)
            agregarTarjetaSemestre(datosSemestre, true);
          });
        } else {
          throw new Error(resultado.message);
        }
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.message || 'Error al procesar la solicitud',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#d33'
      });
    }
  });
  
  // Función para agregar una nueva tarjeta de semestre al contenedor
  function agregarTarjetaSemestre(semestre, insertAtStart = true) {
    const contenedor = document.getElementById('contenedorSemestres');
    
    // Función para ajustar la fecha por zona horaria
    function ajustarFecha(fechaStr) {
        if (!fechaStr) return 'No especificada';
        const fecha = new Date(fechaStr);
        fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());
        return fecha.toLocaleDateString('es-MX');
    }
    
    // Formatear fechas para mostrar - usar las propiedades correctas y ajustar zona horaria
    const fechaInicio = ajustarFecha(semestre.fecha_inicio || semestre.fechaInicio);
    const fechaFin = ajustarFecha(semestre.fecha_fin || semestre.fechaFin);
    
    // Crear elemento de tarjeta
    const tarjeta = document.createElement('div');
    tarjeta.className = 'semestre-card';
    tarjeta.dataset.id = semestre.id; // Guardar el ID como atributo data
    tarjeta.style.cursor = 'pointer';
    
    // Contenido de la tarjeta
    tarjeta.innerHTML = `
      <div class="semestre-header">
        <span class="semestre-periodo">${semestre.nombre}</span>
      </div>
      <div class="semestre-body">
        <div class="semestre-info">
          <p><i class="fas fa-calendar-alt"></i> <strong>Fecha inicio:</strong> ${fechaInicio}</p>
          <p><i class="fas fa-calendar-check"></i> <strong>Fecha fin:</strong> ${fechaFin}</p>
          <p><i class="fas fa-users"></i> <strong>Alumnos:</strong> ${semestre.alumnos}</p>
          <p><i class="fas fa-clipboard-list"></i> <strong>Actividades:</strong> ${semestre.actividades}</p>
        </div>
      </div>
      <!-- Footer omitido para vista de Coordinador (solo lectura) -->
    `;
    
    // Agregar la tarjeta al contenedor
    if (insertAtStart) {
      contenedor.prepend(tarjeta); // insertar al inicio (izquierda)
    } else {
      contenedor.appendChild(tarjeta); // añadir al final para mantener el orden del servidor
    }
    
    // Añadir eventos a los botones de la nueva tarjeta
    const btnEditar = tarjeta.querySelector('.btn-editar');
    const btnEliminar = tarjeta.querySelector('.btn-eliminar');
    
    // Almacenar una referencia al objeto semestre en el elemento
    tarjeta.dataset.id = semestre.id;
    
    // Hacer que toda la tarjeta sea clickeable para abrir el panel de administrador
    tarjeta.addEventListener('click', function(event) {
      // Evitar que el clic se propague a los botones de editar y eliminar
      if (!event.target.closest('.btn-semestre')) {
        abrirPanelAdministrador(semestre);
      }
    });
    
    btnEditar.addEventListener('click', function() {
      // Abrir el modal con los datos actuales para editar
      editarSemestre(semestre);
    });
    
    btnEliminar.addEventListener('click', function() {
      // Confirmación antes de eliminar
      Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const semestreId = semestre.id || semestre.id_semestre || tarjeta.dataset.id;
            const resp = await fetch('php/eliminar_semestre.php', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id_semestre: semestreId })
            });
            const json = await resp.json();
            if (json.success) {
              // Quitar del DOM y del array local
              tarjeta.remove();
              semestres = semestres.filter(s => s.id !== semestreId);
              Swal.fire('¡Eliminado!', json.message || 'El semestre ha sido eliminado.', 'success');
            } else {
              Swal.fire('Error', json.message || 'No se pudo eliminar el semestre', 'error');
            }
          } catch (err) {
            console.error('Error al eliminar semestre:', err);
            Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
          }
        }
      });
    });
  }
  
  // Función para abrir el modal de edición con los datos del semestre
  function editarSemestre(semestre) {
    console.log('Editando semestre:', semestre);
    // Guardar referencia al semestre que se está editando
    semestreEnEdicion = semestre;
    
    // Llenar el formulario con los datos del semestre
    document.getElementById('semestreId').value = semestre.id || semestre.id_semestre;
    document.getElementById('nombreSemestre').value = semestre.nombre;
    
    // Usar las propiedades correctas para las fechas (pueden venir en diferentes formatos)
    const fechaInicio = semestre.fecha_inicio || semestre.fechaInicio;
    const fechaFin = semestre.fecha_fin || semestre.fechaFin;
    
    // Formatear las fechas para el input type="date"
    if (fechaInicio) {
        const fechaInicioObj = new Date(fechaInicio);
        fechaInicioObj.setMinutes(fechaInicioObj.getMinutes() + fechaInicioObj.getTimezoneOffset());
        document.getElementById('fechaInicio').value = fechaInicioObj.toISOString().split('T')[0];
    }
    
    if (fechaFin) {
        const fechaFinObj = new Date(fechaFin);
        fechaFinObj.setMinutes(fechaFinObj.getMinutes() + fechaFinObj.getTimezoneOffset());
        document.getElementById('fechaFin').value = fechaFinObj.toISOString().split('T')[0];
    }
    
    document.getElementById('descripcionSemestre').value = semestre.descripcion || '';
    
    // Cambiar el título del modal
    document.getElementById('tituloModal').textContent = 'Editar Semestre';
    
    // Mostrar el modal
    modalSemestre.style.display = 'block';
  }
  
  // Función para actualizar una tarjeta de semestre existente
  function actualizarTarjetaSemestre(semestre) {
    // Buscar la tarjeta por su id
    const tarjeta = document.querySelector(`.semestre-card[data-id="${semestre.id}"]`);
    if (!tarjeta) return;
    
    // Formatear fechas para mostrar
    const fechaInicio = new Date(semestre.fechaInicio).toLocaleDateString('es-MX');
    const fechaFin = new Date(semestre.fechaFin).toLocaleDateString('es-MX');
    
    // Actualizar el contenido de la tarjeta
    const header = tarjeta.querySelector('.semestre-header');
    header.innerHTML = `<span class="semestre-periodo">${semestre.nombre}</span>`;
    
    const info = tarjeta.querySelector('.semestre-info');
    info.innerHTML = `
      <p><i class="fas fa-calendar-alt"></i> <strong>Fecha inicio:</strong> ${fechaInicio}</p>
      <p><i class="fas fa-calendar-check"></i> <strong>Fecha fin:</strong> ${fechaFin}</p>
      <p><i class="fas fa-users"></i> <strong>Alumnos:</strong> ${semestre.alumnos}</p>
      <p><i class="fas fa-clipboard-list"></i> <strong>Actividades:</strong> ${semestre.actividades}</p>
    `;
    
    // Asegurarse de que el evento de clic esté configurado
    const clonedNode = tarjeta.cloneNode(true);
    clonedNode.addEventListener('click', function(event) {
      if (!event.target.closest('.btn-semestre')) {
        abrirPanelAdministrador(semestre);
      }
    });
    tarjeta.parentNode.replaceChild(clonedNode, tarjeta);
  }
  
  // Función para abrir el panel de administrador
  function abrirPanelAdministrador(semestre) {
    // Guardar los datos del semestre en sessionStorage para usarlos en el panel
    sessionStorage.setItem('semestreActivo', JSON.stringify(semestre));
    // Indicar la unidad académica para enrutar correctamente al panel de la unidad (Coordinador Valle de Etla)
    sessionStorage.setItem('unidad_academica', 'Valle de Etla');

    // Redirigir al panel específico de la unidad (vista coordinador)
    window.location.href = 'U_ValleEtla.html';
  }
  
  // Lógica para mostrar modal de perfil al hacer clic en el icono de usuario
  if (iconoPerfil) {
    iconoPerfil.addEventListener('click', function() {
      // Implementación simplificada del modal de perfil
      Swal.fire({
        title: 'Perfil de Usuario',
        html: `
          <div style="text-align: center; padding: 10px;">
            <i class="fas fa-user-circle" style="font-size: 60px; color: #1B396A; margin: 10px 0;"></i>
            <p style="margin: 15px 0;"><strong>${sessionStorage.getItem('usuario') || 'Usuario Invitado'}</strong></p>
          </div>
        `,
        showCancelButton: true,
        cancelButtonText: 'Cerrar',
        confirmButtonText: 'Cerrar Sesión',
        confirmButtonColor: '#d33',
        showCloseButton: true
      }).then((result) => {
        if (result.isConfirmed) {
          // Cerrar sesión
          sessionStorage.clear();
          window.location.href = '../index.html';
        }
      });
    });
  }
  
  
});
