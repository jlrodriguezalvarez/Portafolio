document.addEventListener("DOMContentLoaded", () => {
  fetch("modales.json")
    .then(response => {
      if (!response.ok) throw new Error("No se pudo cargar el archivo JSON");
      return response.json();
    })
    .then(data => {
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("El archivo JSON está vacío o mal formateado.");
      }

      const contenedor = document.getElementById("contenedor-modales");

      data.forEach(modal => {
        const carouselItems = modal.imagenes_slider.map((img, index) => {
          return `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
              <img src="${img}" class="d-block w-100" alt="${modal.titulo}">
            </div>
          `;
        }).join("");

        const modalHTML = `
        <div class="modal fade" id="${modal.id}" tabindex="-1" aria-labelledby="${modal.id}Label" aria-hidden="true">
          <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header bg-primary text-white">
                <h5 class="modal-title" id="${modal.id}Label">
                  <i class="${modal.icono}"></i> ${modal.titulo}
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
              </div>

              <div class="modal-body">
               <div id="${modal.id}Carousel" class="carousel slide carousel-modal mb-2" data-bs-ride="carousel">
                  <div class="carousel-inner">
                    ${carouselItems}
                  </div>
                  <button class="carousel-control-prev" type="button" data-bs-target="#${modal.id}Carousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Anterior</span>
                  </button>
                  <button class="carousel-control-next" type="button" data-bs-target="#${modal.id}Carousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Siguiente</span>
                  </button>
                </div>
                <p><strong>Descripción:</strong> ${modal.descripcion}</p>
                <p><strong>Tecnologías utilizadas:</strong></p>
                <ul>
                  ${modal.tecnologias.map(t => `<li><i class="${t.icono}"></i> ${t.nombre}</li>`).join("")}
                </ul>
                <p><strong>Características destacadas:</strong></p>
                <ul>
                  ${modal.caracteristicas.map(c => `<li>${c}</li>`).join("")}
                </ul>
              </div>

              <div class="modal-footer justify-content-between">
                <a href="${modal.github}" target="_blank" class="btn btn-outline-dark">
                  <i class="fab fa-github"></i> Ver código en GitHub
                </a>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
        `;

        contenedor.insertAdjacentHTML("beforeend", modalHTML);

        // Inicializar carrusel al abrir el modal
        const modalElement = document.getElementById(modal.id);
        modalElement.addEventListener('shown.bs.modal', () => {
          const carouselElement = document.getElementById(`${modal.id}Carousel`);
          const carouselInstance = new bootstrap.Carousel(carouselElement, {
            interval: 2500, // Cambia la velocidad del carrusel si lo deseas
            ride: 'carousel'
          });

          // Necesitamos asegurarnos de que el carrusel está mostrando correctamente la primera imagen
          const items = carouselElement.querySelectorAll('.carousel-item');
          items.forEach(item => item.classList.remove('active'));  // Elimina 'active' de todas las imágenes
          items[0].classList.add('active');  // Añade 'active' a la primera imagen manualmente
        });

        // Reiniciar carrusel al cerrar el modal
        modalElement.addEventListener('hidden.bs.modal', () => {
          const carouselElement = document.getElementById(`${modal.id}Carousel`);
          const carousel = bootstrap.Carousel.getInstance(carouselElement);
          if (carousel) {
            carousel.dispose(); // Reinicia el carrusel
          }
        });
      });
    })
    .catch(error => {
      console.error("Error al generar los modales:", error.message);
      const contenedor = document.getElementById("contenedor-modales");
      contenedor.innerHTML = `<div class="alert alert-danger mt-4">No se pudieron cargar los proyectos. Intenta más tarde.</div>`;
    });
});
