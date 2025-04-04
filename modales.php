<?php
// Lista de modales disponibles
$modales = ["modal_proyecto1", "modal_proyecto2"];

// Cargar cada modal
foreach ($modales as $modal) {
    include("modales/$modal.php");
}
?>
