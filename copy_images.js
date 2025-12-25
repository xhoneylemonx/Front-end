const fs = require('fs');
const path = require('path');

const sourceDir = "C:\\Users\\Aomsin\\.gemini\\antigravity\\brain\\e41c9967-f199-4c87-aa30-1509c273c553";
const targetDir = "c:\\Users\\Aomsin\\Desktop\\Code\\Front-end\\public\\products";

console.log(`Copying images from ${sourceDir} to ${targetDir}`);

if (!fs.existsSync(targetDir)) {
    console.log("Target dir does not exist, creating...");
    fs.mkdirSync(targetDir, { recursive: true });
}

try {
    const files = fs.readdirSync(sourceDir);
    let count = 0;
    files.forEach(file => {
        if (file.endsWith('.png')) {
            const srcPath = path.join(sourceDir, file);
            // Rename to match expected filenames (remove timestamp suffix if present, or just copy as is then rename in a map?)
            // The artifacts have timestamps: cpu_product_1766685631184.png -> we want cpu.png
            // HACK: I will map them based on prefix.

            let targetName = file;
            if (file.startsWith('cpu_product')) targetName = 'cpu.png';
            else if (file.startsWith('gpu_product')) targetName = 'gpu.png';
            else if (file.startsWith('ram_product')) targetName = 'ram.png';
            else if (file.startsWith('motherboard_product')) targetName = 'motherboard.png';
            else if (file.startsWith('psu_product')) targetName = 'psu.png';
            else if (file.startsWith('case_product')) targetName = 'case.png';
            else if (file.startsWith('ssd_product')) targetName = 'ssd.png';
            else if (file.startsWith('cooler_product')) targetName = 'cooler.png';
            else if (file.startsWith('keyboard_product')) targetName = 'keyboard.png';
            else if (file.startsWith('mouse_product')) targetName = 'mouse.png';

            if (targetName !== file) {
                const destPath = path.join(targetDir, targetName);
                fs.copyFileSync(srcPath, destPath);
                console.log(`Copied ${file} to ${targetName}`);
                count++;
            }
        }
    });
    console.log(`Successfully copied ${count} images.`);
} catch (err) {
    console.error("Error copying files:", err);
}
