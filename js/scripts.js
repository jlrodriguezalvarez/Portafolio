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



document.addEventListener('DOMContentLoaded', function() {
  // Cargar el archivo JSON de proyectos
  fetch('proyectos.json')
      .then(response => response.json())
      .then(proyectos => {
          const proyectosPorPagina = 6; // Cuántos proyectos mostrar por página
          let paginaActual = 1;

          // Función para generar las tarjetas de proyectos
          function generarProyectos(pagina) {
              const contenedorProyectos = document.getElementById('contenedor-proyectos');
              contenedorProyectos.innerHTML = ''; // Limpiar contenedor antes de agregar nuevos proyectos

              // Calcular el rango de proyectos para la página actual
              const inicio = (pagina - 1) * proyectosPorPagina;
              const fin = inicio + proyectosPorPagina;
              const proyectosPagina = proyectos.slice(inicio, fin);

              proyectosPagina.forEach((proyecto, index) => {
                  // Crear el elemento de la tarjeta
                  const tarjeta = document.createElement('div');
                  tarjeta.classList.add('col-md-4', 'mb-4');

                  // El modal tendrá un id único basado en el índice del proyecto
                  const modalId = `modalProyecto${(pagina - 1) * proyectosPorPagina + (index + 1)}`;

                  tarjeta.innerHTML = `
                      <div class="card h-100 shadow-sm">
                          <img src="${proyecto.imagen}" class="card-img-top" alt="${proyecto.titulo}">
                          <div class="card-body">
                              <h5 class="card-title">${proyecto.titulo}</h5>
                              <p class="card-text">${proyecto.descripcion}</p>
                          </div>
                          <div class="card-footer text-center">
                              <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${modalId}">Ver más</a>
                          </div>
                      </div>
                  `;
                  
                  // Añadir la tarjeta al contenedor de proyectos
                  contenedorProyectos.appendChild(tarjeta);
              });
          }

          // Función para mostrar los controles de paginación
          function mostrarPaginacion() {
              const numPaginas = Math.ceil(proyectos.length / proyectosPorPagina);
              const paginacionContenedor = document.getElementById('paginacion');
              paginacionContenedor.innerHTML = ''; // Limpiar la paginación antes de agregar los nuevos botones

              for (let i = 1; i <= numPaginas; i++) {
                  const botonPaginacion = document.createElement('button');
                  botonPaginacion.textContent = i;
                  botonPaginacion.classList.add('btn', 'btn-secondary', 'mx-1');
                  botonPaginacion.addEventListener('click', function() {
                      paginaActual = i;
                      generarProyectos(paginaActual);
                  });
                  paginacionContenedor.appendChild(botonPaginacion);
              }
          }

          // Inicializar la página
          generarProyectos(paginaActual);
          mostrarPaginacion();
      })
      .catch(error => console.error('Error al cargar los proyectos:', error));
});



