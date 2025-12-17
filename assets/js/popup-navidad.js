/**
 * POPUP NAVIDEÑO - PROMOCIÓN PRECIOS 2025
 * Sistema de control de visualización usando sessionStorage
 */

// Configuración
const POPUP_CONFIG = {
    sessionKey: 'popupNavidadVisto',
    delayMostrar: 3000, // 3 segundos después de cargar la página
    delayCookies: 1500  // 1.5 segundos para mostrar primero el banner de cookies
};

/**
 * Inicializar popup navideño
 */
function inicializarPopupNavidad() {
    // Verificar si el popup ya fue visto en esta sesión
    const yaVisto = sessionStorage.getItem(POPUP_CONFIG.sessionKey);
    
    if (!yaVisto) {
        // Mostrar popup después del delay configurado
        setTimeout(() => {
            mostrarPopupNavidad();
        }, POPUP_CONFIG.delayMostrar);
    }
}

/**
 * Mostrar popup
 */
function mostrarPopupNavidad() {
    const popup = document.getElementById('popupNavidad');
    if (popup) {
        popup.style.display = 'flex';
        
        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';
        
        // Focus trap - enfocar el botón de cierre para accesibilidad
        const closeButton = popup.querySelector('.popup-close');
        if (closeButton) {
            closeButton.focus();
        }
    }
}

/**
 * Cerrar popup
 */
function cerrarPopupNavidad() {
    const popup = document.getElementById('popupNavidad');
    if (popup) {
        // Animación de salida
        popup.style.animation = 'fadeOut 0.3s ease-out';
        
        setTimeout(() => {
            popup.style.display = 'none';
            popup.style.animation = '';
            
            // Restaurar scroll del body
            document.body.style.overflow = '';
            
            // Marcar como visto en esta sesión
            sessionStorage.setItem(POPUP_CONFIG.sessionKey, 'true');
        }, 300);
    }
}

/**
 * Cerrar popup al hacer click fuera del contenedor
 */
function configurarClickFuera() {
    const popup = document.getElementById('popupNavidad');
    if (popup) {
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                cerrarPopupNavidad();
            }
        });
    }
}

/**
 * Cerrar popup con tecla ESC
 */
function configurarTeclaEscape() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const popup = document.getElementById('popupNavidad');
            if (popup && popup.style.display === 'flex') {
                cerrarPopupNavidad();
            }
        }
    });
}

/**
 * Animación de fadeOut
 */
const fadeOutAnimation = `
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;

// Agregar animación al documento si no existe
if (!document.querySelector('#fadeOutStyle')) {
    const style = document.createElement('style');
    style.id = 'fadeOutStyle';
    style.textContent = fadeOutAnimation;
    document.head.appendChild(style);
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        inicializarPopupNavidad();
        configurarClickFuera();
        configurarTeclaEscape();
    });
} else {
    inicializarPopupNavidad();
    configurarClickFuera();
    configurarTeclaEscape();
}

// Exportar funciones para uso global
window.cerrarPopupNavidad = cerrarPopupNavidad;
window.mostrarPopupNavidad = mostrarPopupNavidad;
