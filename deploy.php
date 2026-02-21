<?php
// Aquí pones la clave que te has inventado
$secret = 'CambioDigital_2026_Seguro';

// Comprobamos que quien visita la URL tiene la clave correcta
if (!isset($_GET['token']) || $_GET['token'] !== $secret) {
    die('Acceso denegado');
}

// OJO: Esta es la carpeta donde cPanel tiene clonado tu repositorio (origen)
// Asegúrate de poner la ruta correcta donde descargaste tu Git en cPanel.
$repo_path = '/home/nmbjhuthfi/cambiodigital.net';

// 1. Traer los cambios de GitHub (Pull)
exec("uapi VersionControl update repository_root=$repo_path branch=main");

// 2. Ejecutar el despliegue (El archivo .cpanel.yml)
exec("uapi VersionControl deployment_create repository_root=$repo_path");

echo "Despliegue completado con éxito.";
?>