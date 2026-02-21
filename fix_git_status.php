<?php
// Script de emergencia para limpiar el estado de Git en el servidor
// Sube este archivo a public_html y visítalo: https://cambiodigital.net/fix_git_status.php

// Configuración
$repo_path = '/home/nmbjhuthfi/cambiodigital.net';
$token = 'CambioDigital_2026_Seguro'; // Usamos el mismo token por seguridad básica

// Verificación simple
if (!isset($_GET['token']) || $_GET['token'] !== $token) {
    die('Acceso denegado. Añade ?token=CambioDigital_2026_Seguro a la URL.');
}

echo "<h1>Diagnóstico y Reparación de Git</h1>";
echo "<pre style='background: #f0f0f0; padding: 15px;'>";

// Verificar si existe la carpeta
if (!is_dir($repo_path)) {
    die("Error: La ruta del repositorio $repo_path no existe.");
}

// Cambiar al directorio del repo
chdir($repo_path);
echo "<strong>Directorio de trabajo:</strong> " . getcwd() . "\n\n";

// 1. Mostrar estado actual
echo "<strong>1. Estado Inicial (git status):</strong>\n";
$output = [];
$return_var = 0;
exec("git status 2>&1", $output, $return_var);
echo implode("\n", $output) . "\n\n";

// 2. Ejecutar limpieza
echo "<strong>2. Ejecutando limpieza (git reset --hard HEAD)...</strong>\n";
exec("git reset --hard HEAD 2>&1", $output_reset);
echo implode("\n", $output_reset) . "\n";

echo "<strong>3. Limpiando archivos no rastreados (git clean -fd)...</strong>\n";
exec("git clean -fd 2>&1", $output_clean);
echo implode("\n", $output_clean) . "\n\n";

// 3. Mostrar estado final
echo "<strong>4. Estado Final (git status):</strong>\n";
exec("git status 2>&1", $output_final);
echo implode("\n", $output_final) . "\n";

echo "</pre>";
echo "<p>Si el estado final dice 'nothing to commit, working tree clean', ahora puedes intentar hacer un nuevo push o activar el deploy manualmente.</p>";
?>
