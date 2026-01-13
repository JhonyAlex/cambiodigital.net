# AGENTS Instructions

## Publicaciones del blog
- Cada vez que el usuario pida crear o actualizar un post, genera el HTML correspondiente manteniendo la estructura y la hoja de estilos de `assets/css/theme.css`.
- **Estructura Base:** El archivo debe incluir los contenedores `<div id="header-container"></div>` y `<div id="footer-container"></div>`.
- **Scripts:** Es OBLIGATORIO incluir `<script src="/assets/js/layout-loader.js"></script>` al final del body para cargar el header, footer y funcionalidades básicas. NO agregues scripts inline para cargar header/footer.
- Actualiza el listado en `blog.html` para incluir el nuevo post con una tarjeta consistente (imagen, título, fecha, resumen, tags y CTA) y enlaza hacia `blog/<archivo>.html`.
- Este repositorio mantiene la sección principal del blog centralizada en `blog.html`, por lo que cualquier nuevo contenido debe reflejarse allí sin saltarse esa regla.

## Nuevas Páginas (General)
- Cualquier nueva página HTML (Landing, Servicio, etc.) debe seguir la estructura base de `index.html`.
- **CSS:** Incluir siempre `assets/css/tailwind.generated.css` y `assets/css/theme.css`.
- **Header/Footer:** Usar siempre:
  ```html
  <div id="header-container"></div>
  <!-- Contenido -->
  <div id="footer-container"></div>
  <script src="/assets/js/layout-loader.js"></script>
  ```
- **NO** copiar y pegar el código HTML del header o footer directamente en la página. Usa siempre el loader.

## Seguimiento del post actual
- Es obligatoria la actualización de `blog.html` con la tarjeta del post generado, manteniendo el último archivo como referencia maestra para asegurar la coherencia en futuras peticiones.
- Si se trabaja con este post o se crea otro, confirma que el CSS provenga de `assets/css/theme.css` para que todos los artículos compartan la misma apariencia.