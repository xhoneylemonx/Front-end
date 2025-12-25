const fs = require('fs');
const path = require('path');

const productsPath = "c:\\Users\\Aomsin\\Desktop\\Code\\Front-end\\src\\data\\products.json";
// Using the path identified from previous context
const artifactsDir = "C:\\Users\\Aomsin\\.gemini\\antigravity\\brain\\e41c9967-f199-4c87-aa30-1509c273c553";

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
    if (!fs.existsSync(productsPath)) {
        console.error("Products file not found at:", productsPath);
        process.exit(1);
    }

    const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
    // Read only .png files from artifacts to avoid reading other things
    const artifactFiles = fs.readdirSync(artifactsDir).filter(f => f.endsWith('.png'));

    console.log(`Found ${artifactFiles.length} png files in artifacts dir.`);

    let updatedCount = 0;

    products.forEach(product => {
        // Loose comparison to match string "5" with number 5
        const mapItem = mapping.find(m => m.id == product.id);

        if (mapItem) {
            // Find the most recent file matching the pattern
            const matchingFile = artifactFiles.find(f => f.startsWith(mapItem.pattern));

            if (matchingFile) {
                const filePath = path.join(artifactsDir, matchingFile);
                const bitmap = fs.readFileSync(filePath);
                const base64 = Buffer.from(bitmap).toString('base64');
                const dataUrl = `data:image/png;base64,${base64}`;

                // Always update to ensure it sticks
                product.imageUrl = dataUrl;
                updatedCount++;
                console.log(`Updated product ${product.id} (${product.name}) with image from ${matchingFile}`);
            } else {
                console.log(`No matching artifact file found for product ${product.id} (pattern: ${mapItem.pattern})`);
            }
        }
    });

    if (updatedCount > 0) {
        fs.writeFileSync(productsPath, JSON.stringify(products, null, 4));
        console.log(`Successfully updated ${updatedCount} products.`);
    } else {
        console.log("No products needed updating.");
    }

} catch (err) {
    console.error("Error processing products:", err);
}
