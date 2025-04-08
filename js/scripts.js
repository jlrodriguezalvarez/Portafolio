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
        strings: ["Hola Soy Jose Luis Rodriguez", "Desarrollador Web | Software", "Ing sistemas computacinales"], // Los textos que deseas animar
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


