# AGENTS Instructions

## Publicaciones del blog
- Cada vez que el usuario pida crear o actualizar un post, genera el HTML correspondiente manteniendo la estructura y la hoja de estilos de `assets/css/theme.css`.
- Actualiza el listado en `blog.html` para incluir el nuevo post con una tarjeta consistente (imagen, título, fecha, resumen, tags y CTA) y enlaza hacia `blog/<archivo>.html`.
- Este repositorio mantiene la sección principal del blog centralizada en `blog.html`, por lo que cualquier nuevo contenido debe reflejarse allí sin saltarse esa regla.

## Seguimiento del post actual
- Es obligatoria la actualización de `blog.html` con la tarjeta del post generado, manteniendo el último archivo como referencia maestra para asegurar la coherencia en futuras peticiones.
- Si se trabaja con este post o se crea otro, confirma que el CSS provenga de `assets/css/theme.css` para que todos los artículos compartan la misma apariencia.