# Popup Navideño y Banner de Cookies - Documentación

## 📋 Descripción General

Sistema modular de popup promocional navideño y banner de cookies RGPD/GDPR compliant, optimizado para dispositivos móviles con arquitectura mobile-first.

## 📁 Estructura de Archivos

```
cambiodigital.net/
│
├── partials/
│   ├── popup-navidad.html      # Contenido del popup navideño
│   └── cookies-banner.html     # Contenido del banner de cookies
│
└── assets/
    ├── css/
    │   ├── popup-navidad.css   # Estilos del popup
    │   └── cookies-banner.css  # Estilos del banner de cookies
    │
    └── js/
        ├── popup-navidad.js    # Lógica del popup (sessionStorage)
        └── cookies-banner.js   # Lógica del banner (cookies)
```

## ✨ Características Principales

### Popup Navideño
- ✅ **Mensaje**: Felicitación navideña + promoción "Precios 2025"
- ✅ **Frecuencia**: Una vez por sesión usando `sessionStorage`
- ✅ **CTA**: Botón de acción destacado que redirige a #contacto
- ✅ **Diseño**: Gradientes modernos con tema oscuro y acentos cyan/purple
- ✅ **Animaciones**: Entrada suave con efectos bounce
- ✅ **Z-index**: 9998 (debajo del banner de cookies)

### Banner de Cookies
- ✅ **RGPD Compliant**: Solicita consentimiento antes de usar cookies
- ✅ **Persistencia**: Guarda preferencia durante 365 días
- ✅ **Botones**: Aceptar y Rechazar claramente diferenciados
- ✅ **Z-index**: 9999 (por encima del popup navideño)
- ✅ **Analytics**: Placeholder para integrar Google Analytics

## 🎨 Diseño Responsive

### Mobile (<640px)
- Layout vertical single-column
- Botones táctiles 44x44px mínimo
- Texto legible sin zoom
- Padding optimizado
- Popup ocupa 100% ancho con margen

### Tablet (641px - 1024px)
- Layout horizontal adaptativo
- Max-width controlado
- Elementos bien espaciados

### Desktop (>1024px)
- Max-width: 500px (popup), 1200px (banner)
- Centrado con flexbox
- Animaciones completas

## ⚙️ Configuración y Timing

### Secuencia de Aparición
1. **Banner de Cookies**: 1 segundo después de cargar la página
2. **Popup Navideño**: 3 segundos después de cargar la página

### Configuración Editable

**popup-navidad.js:**
```javascript
const POPUP_CONFIG = {
    sessionKey: 'popupNavidadVisto',
    delayMostrar: 3000,  // Modificar aquí el delay
    delayCookies: 1500
};
```

**cookies-banner.js:**
```javascript
const COOKIES_CONFIG = {
    cookieName: 'cookies_aceptadas',
    cookieExpireDays: 365,      // Modificar duración
    delayMostrar: 1000          // Modificar delay
};
```

## 🔧 Integración

### Páginas Integradas
- ✅ index.html
- ✅ blog.html
- ✅ bienvenida.html

### Código de Integración (ya aplicado)

**En el `<head>`:**
```html
<!-- Popup Navideño y Banner de Cookies -->
<link rel="stylesheet" href="/assets/css/popup-navidad.css">
<link rel="stylesheet" href="/assets/css/cookies-banner.css">
```

**Antes del cierre `</body>`:**
```html
<!-- Banner de Cookies -->
<div id="cookiesBannerContainer"></div>

<!-- Popup Navideño -->
<div id="popupNavidadContainer"></div>

<!-- Scripts del Banner de Cookies y Popup Navideño -->
<script>
    // Cargar banner de cookies
    fetch('/partials/cookies-banner.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('cookiesBannerContainer').innerHTML = html;
        })
        .catch(error => console.error('Error cargando banner de cookies:', error));
    
    // Cargar popup navideño
    fetch('/partials/popup-navidad.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('popupNavidadContainer').innerHTML = html;
        })
        .catch(error => console.error('Error cargando popup navideño:', error));
</script>
<script src="/assets/js/cookies-banner.js"></script>
<script src="/assets/js/popup-navidad.js"></script>
```

## 🎯 Z-Index Management

```
Banner de Cookies: z-index: 9999 (más alto)
Popup Navideño:    z-index: 9998
Contenido normal:  z-index: < 9998
```

Esto asegura que:
1. El banner de cookies aparece primero y siempre visible
2. El popup navideño aparece después, sin interferir
3. No hay conflictos de visualización

## 📱 Características de Accesibilidad

- ✅ **Focus trap**: El botón de cierre recibe focus automáticamente
- ✅ **Tecla ESC**: Cierra el popup navideño
- ✅ **Click fuera**: Cierra el popup al hacer click en el overlay
- ✅ **ARIA labels**: Botones con aria-label apropiados
- ✅ **Reduced motion**: Respeta preferencias de animación reducida
- ✅ **Outline focus**: Indicadores visuales claros para navegación por teclado

## 🔄 Control de Frecuencia

### Popup Navideño (sessionStorage)
- Se muestra **una vez por sesión**
- Se resetea al cerrar el navegador
- No persiste entre pestañas nuevas

### Banner de Cookies (cookies)
- Se muestra **una vez** hasta que expira (365 días)
- Persiste entre sesiones y pestañas
- Se puede resetear desde consola:
  ```javascript
  resetearCookies()
  ```

## 🎨 Personalización del Contenido

### Modificar Mensaje del Popup
Editar: `partials/popup-navidad.html`

```html
<h2 class="popup-title">¡Felices Fiestas! 🎅</h2>

<p class="popup-message">
    Termina el año con el mejor regalo para tu negocio:<br>
    <strong>Precios especiales 2025</strong> en todos nuestros servicios
</p>

<a href="#contacto" class="popup-cta" onclick="cerrarPopupNavidad()">
    🎁 Ver Promoción
</a>
```

### Modificar Colores
Editar: `assets/css/popup-navidad.css`

Variables principales:
- Fondo: `#0f172a` / `#1e293b`
- Acentos: `#22d3ee` (cyan) / `#a855f7` (purple)
- Texto: `#fff` / `#e2e8f0`

## 📊 Integración con Analytics

Para activar Google Analytics cuando el usuario acepta cookies, editar `assets/js/cookies-banner.js`:

```javascript
function activarAnalytics() {
    // Descomentar y reemplazar GA_MEASUREMENT_ID
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
}
```

## 🐛 Testing y Debugging

### Resetear Popup Navideño
**Consola del navegador:**
```javascript
sessionStorage.removeItem('popupNavidadVisto')
location.reload()
```

### Resetear Banner de Cookies
**Consola del navegador:**
```javascript
resetearCookies()
location.reload()
```

### Forzar Mostrar Popup
```javascript
mostrarPopupNavidad()
```

## 📏 Optimización de Peso

### Tamaños Estimados
- `popup-navidad.html`: ~1.5 KB
- `popup-navidad.css`: ~4.5 KB
- `popup-navidad.js`: ~2.5 KB
- `cookies-banner.html`: ~1 KB
- `cookies-banner.css`: ~3 KB
- `cookies-banner.js`: ~2.5 KB

**Total: ~15 KB** (muy por debajo del límite de 200KB solicitado)

## ✅ Checklist de Requisitos Cumplidos

- ✅ Mensaje de felicitación navideña + promoción "Precios 2025"
- ✅ Copy breve e impactante (2-3 líneas)
- ✅ CTA claro y destacado
- ✅ Diseño mobile-first responsive
- ✅ Archivo independiente y modular
- ✅ Una vez por sesión (sessionStorage)
- ✅ Banner de cookies sin conflictos
- ✅ Z-index diferenciados
- ✅ Timing controlado
- ✅ Botón de cierre visible y accesible
- ✅ Layout vertical en móvil
- ✅ Botones táctiles 44x44px
- ✅ Texto legible sin zoom
- ✅ Peso ligero (<200KB)

## 🚀 Próximos Pasos (Opcionales)

1. **Integrar Google Analytics** en `cookies-banner.js`
2. **A/B Testing** del copy del popup
3. **Tracking de conversiones** desde el CTA
4. **Variantes estacionales** para otras épocas del año
5. **Personalización** basada en comportamiento del usuario

---

**Creado:** Diciembre 17, 2025  
**Versión:** 1.0.0  
**Autor:** Cambio Digital
