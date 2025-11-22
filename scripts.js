document.addEventListener("DOMContentLoaded", function () {
    const nav = document.querySelector(".navbar");
    const darkModeToggle = document.getElementById("modoOscuro");
    const body = document.body;

    // Función para actualizar el color del navbar según el modo
    function actualizarNavbar() {
        if (document.body.classList.contains('dark-mode')) {
            nav.style.backgroundColor = "#420fb6";  // Color para el navbar en modo oscuro
        } else {
            nav.style.backgroundColor = "#0056b3";  // Azul para el navbar en modo claro
        }
    }

    // Si hay una preferencia guardada para el modo oscuro, la aplicamos
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '🌞'; // Cambiar el ícono al sol si el modo oscuro está activado
    }

    // Actualizamos el color del navbar al cargar la página
    actualizarNavbar();

    // Cambiar entre modo oscuro y claro al hacer clic en el botón
    darkModeToggle.addEventListener("click", function () {
        body.classList.toggle('dark-mode');
        
        // Cambiar el ícono según el estado del modo
        if (body.classList.contains('dark-mode')) {
            darkModeToggle.innerHTML = '🌞';  // Sol en modo oscuro
            localStorage.setItem('darkMode', 'enabled');
        } else {
            darkModeToggle.innerHTML = '🌙';  // Luna en modo claro
            localStorage.setItem('darkMode', 'disabled');
        }

        // Actualizar el color del navbar inmediatamente
        actualizarNavbar();
    });
});

// Scroll suave para los enlaces del menú
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      window.scrollTo({
        top: target.offsetTop - 60, // Ajusta este valor según la altura del navbar
        behavior: 'smooth'
      });
    });
});

// Configuración de Typed.js (Animación de texto)
document.addEventListener('DOMContentLoaded', function () {
    const typed = new Typed('.typed-text', {
        strings: ["Hola! Soy Jose Luis Rodriguez", "Desarrollador Web | Software", "Ing sistemas computacionales"], // Los textos que deseas animar
        typeSpeed: 80,
        backSpeed: 35,
        backDelay: 1000,
        startDelay: 500,
        loop: true,
        onComplete: function(self) {
          // Aquí puedes agregar la clase hidden al texto anterior
          const currentText = document.querySelector('.typed-text');
          currentText.classList.add('hidden');
          setTimeout(() => {
            currentText.classList.remove('hidden');
          }, 500); // El tiempo de espera debe coincidir con la transición
        }
      });      
});

// ==========================================
// LÓGICA DE PROYECTOS (Filtros y Paginación)
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  let todosLosProyectos = [];
  let categoriaActual = 'todos'; // Categoría por defecto
  const proyectosPorPagina = 6;  // Cuántos proyectos mostrar por página
  let paginaActual = 1;

  // Cargar el archivo JSON de proyectos (Usamos modales.json como fuente única)
  fetch("modales.json")
    .then(response => {
      if (!response.ok) throw new Error("Error al cargar JSON");
      return response.json();
    })
    .then(data => {
      todosLosProyectos = data;
      
      // 1. Generar TODOS los modales ocultos (para que estén listos al dar clic)
      generarModales(todosLosProyectos);
      
      // 2. Inicializar la vista (Muestra la página 1 con filtro 'todos')
      actualizarVista();
      
      // 3. Configurar los botones de filtro (listeners)
      setupFiltros();
    })
    .catch(error => console.error("Error:", error));

  // Función principal para renderizar las tarjetas según filtro y página
  function actualizarVista() {
    const contenedorProyectos = document.getElementById("contenedor-proyectos");
    contenedorProyectos.innerHTML = ""; // Limpiar contenedor antes de agregar nuevos

    // A. Filtrar proyectos según la categoría seleccionada
    const proyectosFiltrados = todosLosProyectos.filter(p => {
       // Si el JSON no tiene categoría, asumimos 'general' para que no falle
       const catProyecto = p.categoria ? p.categoria.toLowerCase() : 'general';
       return categoriaActual === 'todos' || catProyecto === categoriaActual;
    });

    // B. Calcular paginación
    const totalPaginas = Math.ceil(proyectosFiltrados.length / proyectosPorPagina);
    
    // Si cambiamos de filtro y la página actual ya no existe (ej: página 3), volver a la 1
    if (paginaActual > totalPaginas) paginaActual = 1;

    // Calcular rango de proyectos a mostrar (slice)
    const indiceInicio = (paginaActual - 1) * proyectosPorPagina;
    const indiceFin = indiceInicio + proyectosPorPagina;
    const proyectosA_Mostrar = proyectosFiltrados.slice(indiceInicio, indiceFin);

    // C. Generar HTML de las tarjetas
    if (proyectosA_Mostrar.length === 0) {
        contenedorProyectos.innerHTML = '<div class="text-center w-100 py-5">No hay proyectos en esta categoría.</div>';
    } else {
        proyectosA_Mostrar.forEach((proyecto, index) => {
            // Retraso para animación escalonada (efecto visual)
            const delay = index * 0.1;
            const catNombre = proyecto.categoria ? proyecto.categoria.toUpperCase() : "GENERAL";
            
            const cardHTML = `
              <div class="col-md-4 mb-4 fade-in-anim" style="animation-delay: ${delay}s">
                <div class="card h-100 shadow-sm card-hover border-0">
                  <div class="overflow-hidden" style="height: 200px;">
                    <img src="${proyecto.imagen}" class="card-img-top img-zoom" alt="${proyecto.titulo}" loading="lazy" style="height:100%; width:100%; object-fit:cover;">
                  </div>
                  <div class="card-body d-flex flex-column">
                    <h5 class="card-title fw-bold">${proyecto.titulo}</h5>
                    <div class="mb-2">
                        <span class="badge bg-light text-secondary border">${catNombre}</span>
                    </div>
                    <p class="card-text text-muted small">
                      ${proyecto.descripcion.substring(0, 90)}...
                    </p>
                    <button class="btn btn-primary mt-auto w-100 rounded-pill" data-bs-toggle="modal" data-bs-target="#${proyecto.id}">
                      <i class="fas fa-eye me-2"></i>Ver Detalles
                    </button>
                  </div>
                </div>
              </div>
            `;
            contenedorProyectos.insertAdjacentHTML("beforeend", cardHTML);
        });
    }

    // D. Generar botones de paginación
    renderizarPaginacion(totalPaginas);
  }

  // Función para mostrar los controles de paginación (1, 2, 3...)
  function renderizarPaginacion(totalPaginas) {
    const contenedorPaginacion = document.getElementById("paginacion");
    contenedorPaginacion.innerHTML = ""; // Limpiar botones anteriores

    if (totalPaginas <= 1) return; // Si solo hay 1 página, no mostrar botones

    for (let i = 1; i <= totalPaginas; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        // Estilo diferente para la página activa
        btn.className = `btn ${i === paginaActual ? 'btn-primary' : 'btn-outline-secondary'}`;
        
        btn.addEventListener("click", () => {
            paginaActual = i;
            actualizarVista();
            // Scroll suave hacia el inicio de la sección
            document.getElementById("proyectos").scrollIntoView({ behavior: 'smooth' });
        });
        contenedorPaginacion.appendChild(btn);
    }
  }

  // Función para manejar los clics en los filtros (Web, Móvil, etc.)
  function setupFiltros() {
      const botones = document.querySelectorAll('.filter-btn');
      botones.forEach(btn => {
          btn.addEventListener('click', (e) => {
              // Quitar clase activa a todos
              botones.forEach(b => b.classList.remove('active'));
              // Poner clase activa al clickeado
              e.target.classList.add('active');
              
              // Actualizar estado y reiniciar a página 1
              categoriaActual = e.target.getAttribute('data-filter');
              paginaActual = 1; 
              actualizarVista();
          });
      });
  }

  // Función para generar el HTML de los modales (se ejecuta una sola vez al inicio)
  function generarModales(datos) {
    const contenedorModales = document.getElementById("contenedor-modales");
    contenedorModales.innerHTML = "";
    
    datos.forEach(proyecto => {
        // Crear items del carrusel
        const sliderItems = proyecto.imagenes_slider.map((img, i) => `
            <div class="carousel-item ${i === 0 ? 'active' : ''}">
              <img src="${img}" class="d-block w-100 rounded" style="height: 400px; object-fit: contain; background: #000;">
            </div>
        `).join("");

        // Crear estructura del modal
        const modalHTML = `
          <div class="modal fade" id="${proyecto.id}" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog-centered">
              <div class="modal-content border-0">
                <div class="modal-header bg-light">
                  <h5 class="modal-title fw-bold text-primary"><i class="${proyecto.icono} me-2"></i>${proyecto.titulo}</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body p-0">
                  <div class="row g-0">
                    <div class="col-lg-8 bg-black">
                        <div id="carousel-${proyecto.id}" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner">${sliderItems}</div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carousel-${proyecto.id}" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon"></span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carousel-${proyecto.id}" data-bs-slide="next">
                                <span class="carousel-control-next-icon"></span>
                            </button>
                        </div>
                    </div>
                    <div class="col-lg-4 p-4 overflow-auto" style="max-height: 500px;">
                        <h6 class="fw-bold text-uppercase text-muted mb-3">Descripción</h6>
                        <p>${proyecto.descripcion}</p>
                        <h6 class="fw-bold text-uppercase text-muted mb-3 mt-4">Tecnologías</h6>
                        <div class="d-flex flex-wrap gap-2 mb-4">
                            ${proyecto.tecnologias.map(t => `<span class="badge bg-secondary bg-opacity-10 text-secondary border px-3 py-2"><i class="${t.icono}"></i> ${t.nombre}</span>`).join("")}
                        </div>
                        ${proyecto.github ? `<div class="d-grid"><a href="${proyecto.github}" target="_blank" class="btn btn-dark btn-lg"><i class="fab fa-github me-2"></i> Ver Código</a></div>` : ''}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
        contenedorModales.insertAdjacentHTML("beforeend", modalHTML);
    });
  }
});



// ==========================================
// LÓGICA DEL FORMULARIO DE CONTACTO (EmailJS)
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    const btnEnviar = document.getElementById('btn-enviar');
    const form = document.getElementById('contact-form');
    const mensajeExito = document.getElementById('mensaje-exito');

    if(form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita que la página se recargue

            // Cambiar texto del botón para dar feedback visual
            btnEnviar.innerText = 'Enviando...';
            
            // Estos IDs deben coincidir con los de tu cuenta de EmailJS
            const serviceID = 'outlook_portafolio';
            const templateID = 'template_ep5lpd3';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    // ÉXITO
                    btnEnviar.innerText = 'Enviar Mensaje';
                    mensajeExito.classList.remove('d-none'); // Muestra mensaje verde
                    form.reset(); // Limpia los campos
                    
                    // Ocultar mensaje de éxito después de 5 segundos
                    setTimeout(() => {
                        mensajeExito.classList.add('d-none');
                    }, 5000);
                }, (err) => {
                    // ERROR
                    btnEnviar.innerText = 'Enviar Mensaje';
                    alert('Hubo un error al enviar el mensaje: ' + JSON.stringify(err));
                });
        });
    }
});