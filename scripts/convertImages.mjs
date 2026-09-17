import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imgDir = path.join(__dirname, '../public/images');

async function processImages() {
  const files = fs.readdirSync(imgDir);
  for (const file of files) {
    if (file.match(/\.(png|jpeg|jpg)$/i)) {
      const inputPath = path.join(imgDir, file);
      const name = path.parse(file).name;
      const outputPath = path.join(imgDir, `${name}.webp`);
      
      console.log(`Converting ${file} to ${name}.webp...`);
      try {
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
        console.log(`Successfully converted ${file}`);
        // Remove the original file after successful conversion
        fs.unlinkSync(inputPath);
      } catch (err) {
        console.error(`Error converting ${file}:`, err);
      }
    }
  }
}

processImages();
