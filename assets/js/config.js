/**
 * Configuracion global del sitio
 * Ajusta cada bandera para activar o desactivar modulos especificos.
 */

// Popup promocional (modal)
window.PROMO_ENABLED = false;

// Banner / popup de cookies
window.COOKIES_ENABLED = true;

// Compatibilidad hacia atras (solo controla el modal promocional)
window.POPUPS_ENABLED = window.PROMO_ENABLED;

// Theme: 'auto' respects system, 'dark' or 'light' forces a theme
window.THEME_DEFAULT = 'auto';
