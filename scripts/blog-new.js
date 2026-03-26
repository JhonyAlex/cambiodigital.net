const path = require('path');
const {
    BLOG_DIR,
    buildPostFromTemplate,
    parseCliArgs,
    writeText
} = require('./blog-template-utils');

function printUsage() {
    console.log([
        'Uso:',
        '  npm run blog:new -- --title "Titulo" --slug "mi-post" --description "Resumen" --date 2026-03-26 --category Ventas --image "https://..."',
        '',
        'Opciones utiles:',
        '  --keywords "crm, automatizacion, ventas"',
        '  --read-time "6 min lectura"',
        '  --image-alt "Texto alternativo"',
        '  --intro "Primer parrafo destacado"',
        '  --opening "Parrafo inicial"',
        '  --section-title "Subtitulo"',
        '  --section-body "Desarrollo"',
        '  --cta-title "Titulo CTA"',
        '  --cta-description "Descripcion CTA"',
        '  --cta-button "Texto boton"',
        '  --content-file ".\\ruta\\contenido.html"',
        '  --force'
    ].join('\n'));
}

function main() {
    const args = parseCliArgs(process.argv.slice(2));

    if (args.help || args.h) {
        printUsage();
        process.exit(0);
    }

    if (!args.title) {
        printUsage();
        process.exit(1);
    }

    const { slug, html } = buildPostFromTemplate(args);
    const outputPath = path.join(BLOG_DIR, `${slug}.html`);

    if (!args.force && require('fs').existsSync(outputPath)) {
        throw new Error(`El archivo ya existe: ${outputPath}. Usa --force para sobrescribir.`);
    }

    writeText(outputPath, html);
    console.log(`Blog creado desde plantilla única: ${outputPath}`);
}

try {
    main();
} catch (error) {
    console.error(error.message);
    process.exit(1);
}