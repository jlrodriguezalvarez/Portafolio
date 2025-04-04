document.addEventListener("DOMContentLoaded", function () {
    const nav = document.querySelector(".navbar");
    
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            nav.style.backgroundColor = "#0056b3";
        } else {
            nav.style.backgroundColor = "";
        }
    });

    const proyectosBtn = document.getElementById("verProyectos");
    if (proyectosBtn) {
        proyectosBtn.addEventListener("click", function () {
            document.getElementById("proyectos").scrollIntoView({ behavior: "smooth" });
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("modoOscuro"); // Cambié el ID al tuyo
    const body = document.body;

    // Si hay una preferencia guardada para el modo oscuro, lo aplicamos
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
    }

    darkModeToggle.addEventListener("click", function () {
        body.classList.toggle('dark-mode');

        // Guardar la preferencia del usuario
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });
});
