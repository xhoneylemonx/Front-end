const fs = require('fs');
const path = require('path');

const productsPath = "c:\\Users\\Aomsin\\Desktop\\Code\\Front-end\\src\\data\\products.json";
const artifactsDir = "C:\\Users\\Aomsin\\.gemini\\antigravity\\brain\\e41c9967-f199-4c87-aa30-1509c273c553";

// Map Product IDs (as they SHOUD BE) to artifact filenames
const idToImageMap = {
    "1": "gpu_product_1766683900923.png",
    "2": "psu_product_1766683917784.png",
    "3": "ram_product_1766683933621.png",
    "4": "motherboard_product_1766683948414.png",
    "5": "cpu_product_1766685631184.png",
    "6": "case_product_1766685646848.png",
    "7": "ssd_product_1766685662136.png",
    "8": "cooler_product_1766685690533.png",
    "9": "keyboard_product_1766685707526.png",
    "10": "mouse_product_1766685722612.png"
};

try {
    if (!fs.existsSync(productsPath)) {
        console.error("Products file not found!");
        process.exit(1);
    }

    let products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
    let updatedCount = 0;

    products = products.map(p => {
        // 1. Fix ID to be string
        const oldId = p.id;
        const newId = String(p.id);

        if (typeof oldId !== 'string') {
            console.log(`Fixing ID type for product ${p.name}: ${typeof oldId} -> string`);
        }

        p.id = newId;

        // 2. Embed Image
        const artifactName = idToImageMap[newId];
        if (artifactName) {
            const artifactPath = path.join(artifactsDir, artifactName);
            if (fs.existsSync(artifactPath)) {
                try {
                    const bitmap = fs.readFileSync(artifactPath);
                    const base64 = Buffer.from(bitmap).toString('base64');
                    const dataUrl = `data:image/png;base64,${base64}`;

                    // Force update if different or if it was a file path
                    if (p.imageUrl !== dataUrl) {
                        p.imageUrl = dataUrl;
                        updatedCount++;
                        console.log(`Embedded image for product ${newId} (${p.name})`);
                    }
                } catch (e) {
                    console.error(`Error reading artifact ${artifactName}: ${e.message}`);
                }
            } else {
                console.warn(`Artifact not found: ${artifactPath}`);
            }
        } else {
            console.warn(`No image mapping found for ID ${newId}`);
        }

        return p;
    });

    // Write back
    fs.writeFileSync(productsPath, JSON.stringify(products, null, 4));
    console.log(`\nSuccess! Updated ${updatedCount} products. All IDs converted to strings.`);

} catch (err) {
    console.error("Fatal Error:", err);
}
