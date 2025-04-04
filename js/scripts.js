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



