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
                  <img src="${modal.imagen}" class="img-fluid rounded mb-3 shadow-sm" alt="${modal.titulo}">
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
        });
      })
      .catch(error => {
        console.error("Error al generar los modales:", error.message);
        const contenedor = document.getElementById("contenedor-modales");
        contenedor.innerHTML = `<div class="alert alert-danger mt-4">No se pudieron cargar los proyectos. Intenta más tarde.</div>`;
      });
  });
  