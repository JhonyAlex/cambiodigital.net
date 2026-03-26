# Flujo de Blog

- Para crear un blog nuevo, no duplicar posts manualmente. Usar siempre `npm run blog:new -- ...` para que el archivo nazca desde `Docs/PLANTILLA_BLOG_UNICA.html`.
- La plantilla fuente de verdad para posts es `Docs/PLANTILLA_BLOG_UNICA.html`.
- Si cambia la plantilla o hay que ajustar el diseño común de los posts, actualizar esa plantilla y ejecutar `npm run blog:sync-template` para propagar el shell compartido a todos los archivos de `blog/*.html`.
- El comportamiento visual compartido del blog vive en `assets/js/blog-post.js` y `assets/js/layout-loader.js`; no reimplementar esas piezas dentro de cada post.
- Si se solicita un nuevo blog desde el chat, el flujo correcto es: crear con `blog:new`, completar el contenido y, si la base cambió, resincronizar con `blog:sync-template`.
