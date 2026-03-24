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

// WhatsApp routing by selected country.
window.WHATSAPP_NUMBERS = {
	america: '573122908416',
	spain: '34603242390'
};

window.getWhatsAppNumberByCountryCode = function getWhatsAppNumberByCountryCode(countryCode) {
	if (countryCode === '+34') {
		return window.WHATSAPP_NUMBERS.spain;
	}

	// Any country in the Americas routes to Colombia line.
	const americaCodes = new Set([
		'+1', '+52', '+54', '+55', '+56', '+57', '+58', '+591', '+593', '+595', '+598', '+51',
		'+502', '+503', '+504', '+505', '+506', '+507'
	]);

	if (americaCodes.has(countryCode)) {
		return window.WHATSAPP_NUMBERS.america;
	}

	return window.WHATSAPP_NUMBERS.america;
};

window.buildWhatsAppUrl = function buildWhatsAppUrl(countryCode, message) {
	const resolvedNumber = window.getWhatsAppNumberByCountryCode(countryCode || '+57');
	const safeMessage = encodeURIComponent(message || 'Hola, quiero mas informacion sobre sus servicios.');
	return `https://wa.me/${resolvedNumber}?text=${safeMessage}`;
};
