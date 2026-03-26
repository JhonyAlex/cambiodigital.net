const fs = require('fs');
const path = require('path');
const {
    BLOG_DIR,
    normalizeBlogPostHtml,
    readText,
    writeText
} = require('./blog-template-utils');

function main() {
    const files = fs.readdirSync(BLOG_DIR)
        .filter((fileName) => fileName.endsWith('.html'))
        .sort();

    let updatedCount = 0;

    files.forEach((fileName) => {
        const filePath = path.join(BLOG_DIR, fileName);
        const original = readText(filePath);
        const normalized = normalizeBlogPostHtml(original);

        if (normalized !== original) {
            writeText(filePath, normalized);
            updatedCount += 1;
        }
    });

    console.log(`Plantilla sincronizada en ${updatedCount} de ${files.length} posts.`);
}

try {
    main();
} catch (error) {
    console.error(error.message);
    process.exit(1);
}