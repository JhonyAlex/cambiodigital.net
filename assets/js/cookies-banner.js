/**
 * BANNER DE COOKIES - RGPD/GDPR COMPLIANT
 * Sistema de gestión de consentimiento de cookies
 */

// Configuración
const COOKIES_CONFIG = {
    cookieName: 'cookies_aceptadas',
    cookieExpireDays: 365,
    delayMostrar: 1000 // 1 segundo después de cargar la página
};

/**
 * Inicializar banner de cookies
 */
function inicializarCookiesBanner() {
    // Verificar si el usuario ya dio su consentimiento
    const consentimiento = getCookie(COOKIES_CONFIG.cookieName);
    
    if (!consentimiento) {
        // Mostrar banner después del delay
        setTimeout(() => {
            mostrarCookiesBanner();
        }, COOKIES_CONFIG.delayMostrar);
    } else if (consentimiento === 'aceptadas') {
        // Usuario aceptó cookies - activar servicios de analytics
        activarAnalytics();
    }
}

/**
 * Mostrar banner de cookies
 */
function mostrarCookiesBanner() {
    const banner = document.getElementById('cookiesBanner');
    if (banner) {
        banner.style.display = 'block';
    }
}

/**
 * Ocultar banner de cookies
 */
function ocultarCookiesBanner() {
    const banner = document.getElementById('cookiesBanner');
    if (banner) {
        // Animación de salida
        banner.style.animation = 'slideOutDown 0.5s ease-out';
        
        setTimeout(() => {
            banner.style.display = 'none';
            banner.style.animation = '';
        }, 500);
    }
}

/**
 * Aceptar cookies
 */
function aceptarCookies() {
    // Guardar preferencia
    setCookie(COOKIES_CONFIG.cookieName, 'aceptadas', COOKIES_CONFIG.cookieExpireDays);
    
    // Activar servicios de analytics
    activarAnalytics();
    
    // Ocultar banner
    ocultarCookiesBanner();
    
    console.log('✅ Cookies aceptadas');
}

/**
 * Rechazar cookies
 */
function rechazarCookies() {
    // Guardar preferencia
    setCookie(COOKIES_CONFIG.cookieName, 'rechazadas', COOKIES_CONFIG.cookieExpireDays);
    
    // Ocultar banner
    ocultarCookiesBanner();
    
    console.log('❌ Cookies rechazadas');
}

/**
 * Activar Google Analytics y otros servicios
 */
function activarAnalytics() {
    // Aquí puedes activar Google Analytics, Facebook Pixel, etc.
    // Ejemplo para Google Analytics (reemplaza GA_MEASUREMENT_ID con tu ID):
    /*
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
    */
    
    console.log('📊 Analytics activado');
}

/**
 * Obtener valor de una cookie
 */
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
    return null;
}

/**
 * Crear/actualizar cookie
 */
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax${secure}`;
}

/**
 * Eliminar cookie
 */
function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

/**
 * Resetear preferencias (útil para testing)
 */
function resetearCookies() {
    deleteCookie(COOKIES_CONFIG.cookieName);
    console.log('🔄 Preferencias de cookies reseteadas');
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarCookiesBanner);
} else {
    inicializarCookiesBanner();
}

// Exportar funciones para uso global
window.aceptarCookies = aceptarCookies;
window.rechazarCookies = rechazarCookies;
window.resetearCookies = resetearCookies;
