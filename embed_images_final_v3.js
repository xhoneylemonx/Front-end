const fs = require('fs');
const path = require('path');

console.log("STARTING UPDATE SCRIPT");

const productsPath = "c:\\Users\\Aomsin\\Desktop\\Code\\Front-end\\src\\data\\products.json";
const artifactsDir = "C:\\Users\\Aomsin\\.gemini\\antigravity\\brain\\e41c9967-f199-4c87-aa30-1509c273c553";

// Ensure mappings match the IDs in products.json (integers there, but can be string/int here)
const mapping = [
    { id: 1, pattern: "gpu_product" },
    { id: 2, pattern: "psu_product" },
    { id: 3, pattern: "ram_product" },
    { id: 4, pattern: "motherboard_product" },
    { id: 5, pattern: "cpu_product" },
    { id: 6, pattern: "case_product" },
    { id: 7, pattern: "ssd_product" },
    { id: 8, pattern: "cooler_product" },
    { id: 9, pattern: "keyboard_product" },
    { id: 10, pattern: "mouse_product" }
];

try {
    if (!fs.existsSync(productsPath)) {
        console.error("Products file not found at:", productsPath);
        process.exit(1);
    }

    const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
    const artifactFiles = fs.readdirSync(artifactsDir).filter(f => f.endsWith('.png'));

    console.log(`Found ${artifactFiles.length} png files.`);

    let updatedCount = 0;

    products.forEach(product => {
        // Loose comparison handled effectively or just ensure types match
        // products.json has integers for IDs based on previous `view_file`.
        const mapItem = mapping.find(m => m.id === product.id || m.id == product.id);

        if (mapItem) {
            const matchingFile = artifactFiles.find(f => f.startsWith(mapItem.pattern));

            if (matchingFile) {
                const filePath = path.join(artifactsDir, matchingFile);
                try {
                    const bitmap = fs.readFileSync(filePath);
                    const base64 = Buffer.from(bitmap).toString('base64');
                    const dataUrl = `data:image/png;base64,${base64}`;

                    if (product.imageUrl !== dataUrl) {
                        product.imageUrl = dataUrl;
                        updatedCount++;
                        console.log(`Mapped ${product.id} -> ${matchingFile}`);
                    }
                } catch (readErr) {
                    console.error(`Error reading ${matchingFile}:`, readErr);
                }
            } else {
                console.log(`Missing file for ${product.id} (${mapItem.pattern})`);
            }
        }
    });

    if (updatedCount > 0) {
        fs.writeFileSync(productsPath, JSON.stringify(products, null, 4));
        console.log(`DONE: Updated ${updatedCount} products.`);
    } else {
        console.log("DONE: No updates needed.");
    }

} catch (err) {
    console.error("Error:", err);
}
