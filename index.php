<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mi Portafolio - Proyecto de pruebas</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
        <link rel="stylesheet" href="css/styles.css">
    </head>
<body>
    <nav class="navbar navbar-expand-lg fixed-top">
        <div class="container">
            <a class="navbar-brand" href="#">Portafolio proyecto prueba</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="#sobre-mi">Sobre Mí</a></li>
                    <li class="nav-item"><a class="nav-link" href="#habilidades">Habilidades</a></li>
                    <li class="nav-item"><a class="nav-link" href="#proyectos">Proyectos</a></li>
                    <li class="nav-item"><a class="nav-link" href="#contacto">Contacto</a></li>
                    <li class="nav-item"><button id="modoOscuro" class="btn btn-outline-light">🌙</button></li>
                </ul>
            </div>
        </div>
    </nav>
    
    <header class="hero">
        <h1 class="typed-text">Hola, soy Jose Luis Rodriguez</h1>
        <p>Desarrollador Web | Software</p>
        <p>Pagina en construccion | Pruebas</p>
        <a href="#proyectos" class="btn btn-primary btn-lg mt-3">Ver Proyectos</a>
    </header>
    
    <div class="container mt-5">
        <section id="sobre-mi" class="mb-5">
            <h2 class="section-title">Sobre Mí</h2>
            <p class="text-center">Aquí puedes escribir una breve descripción sobre ti, tus habilidades y tu experiencia.</p>
        </section>

        <section id="habilidades" class="mb-5">
            <h2 class="section-title">Habilidades</h2>
            <div class="row text-center">
                <div class="col-md-4 habilidades p-3 shadow-sm rounded">
                    <i class="fas fa-code fa-3x mb-3 text-primary"></i>
                    <h4>Frontend</h4>
                    <p>HTML, CSS, JavaScript, React, Bootstrap, SASS</p>
                </div>
                <div class="col-md-4 habilidades p-3 shadow-sm rounded">
                    <i class="fas fa-server fa-3x mb-3 text-success"></i>
                    <h4>Backend</h4>
                    <p>.NET, C#, PHP, Python, Java, MySQL</p>
                </div>
                <div class="col-md-4 habilidades p-3 shadow-sm rounded">
                    <i class="fas fa-tools fa-3x mb-3 text-warning"></i>
                    <h4>Otras</h4>
                    <p>Git, Linux, Soporte Técnico</p>
                </div>
            </div>
        </section>
        
        <section id="proyectos">
        <h2>Mis Proyectos</h2>
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalProyecto1">Ver Proyecto 1</button>
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalProyecto2">Ver Proyecto 2</button>
    </section>

    <!-- Contenedor de los modales -->
    <div id="modales-container">
        <?php include("modales.php"); ?>
    </div>

        
        
        <section id="contacto" class="mb-5">
            <h2 class="section-title">Contacto</h2>
            <p class="text-center">Puedes contactarme en:</p>
            <ul class="list-unstyled text-center">
                <li>Email: tuemail@example.com</li>
                <li>GitHub: <a href="https://github.com/tuusuario">tuusuario</a></li>
                <li>LinkedIn: <a href="https://linkedin.com/in/tuusuario">tuusuario</a></li>
            </ul>
        </section>
    </div>
    
    <footer>
        <p>&copy; 2025 José Luis Rodriguez - Todos los derechos reservados.</p>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="js/scripts.js"></script>
</body>
</html>
