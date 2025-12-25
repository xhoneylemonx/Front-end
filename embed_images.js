const fs = require('fs');
const path = require('path');

const productsPath = "c:\\Users\\Aomsin\\Desktop\\Code\\Front-end\\src\\data\\products.json";
const artifactsDir = "C:\\Users\\Aomsin\\.gemini\\antigravity\\brain\\e41c9967-f199-4c87-aa30-1509c273c553";

// Map product ID (or name part) to artifact file pattern
const mapping = [
    { id: "1", pattern: "gpu_product" },
    { id: "2", pattern: "psu_product" },
    { id: "3", pattern: "ram_product" },
    { id: "4", pattern: "motherboard_product" },
    { id: "5", pattern: "cpu_product" },
    { id: "6", pattern: "case_product" },
    { id: "7", pattern: "ssd_product" },
    { id: "8", pattern: "cooler_product" },
    { id: "9", pattern: "keyboard_product" },
    { id: "10", pattern: "mouse_product" }
];

try {
    const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
    const artifactFiles = fs.readdirSync(artifactsDir);

    let updatedCount = 0;

    products.forEach(product => {
        const mapItem = mapping.find(m => m.id === product.id);
        if (mapItem) {
            const file = artifactFiles.find(f => f.startsWith(mapItem.pattern) && f.endsWith('.png'));
            if (file) {
                const filePath = path.join(artifactsDir, file);
                const bitmap = fs.readFileSync(filePath);
                const base64 = Buffer.from(bitmap).toString('base64');
                const dataUrl = `data:image/png;base64,${base64}`;

                product.imageUrl = dataUrl;
                updatedCount++;
                console.log(`Updated product ${product.id} (${product.name}) with image from ${file}`);
            } else {
                console.log(`No image found for product ${product.id} using pattern ${mapItem.pattern}`);
            }
        }
    });

    fs.writeFileSync(productsPath, JSON.stringify(products, null, 4));
    console.log(`Successfully updated ${updatedCount} products with Base64 images.`);

} catch (err) {
    console.error("Error processing products:", err);
}
