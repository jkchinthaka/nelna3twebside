import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Product from './models/productModel.js';

dotenv.config();

function extractFallbackProductsArrayText(fileContent) {
  const marker = 'export const fallbackProducts =';
  const markerIndex = fileContent.indexOf(marker);
  if (markerIndex === -1) {
    throw new Error('Could not find fallbackProducts export in src/data/products.js');
  }

  const afterMarker = fileContent.slice(markerIndex + marker.length);
  const startBracket = afterMarker.indexOf('[');
  const endBracket = afterMarker.lastIndexOf(']');

  if (startBracket === -1 || endBracket === -1 || endBracket <= startBracket) {
    throw new Error('Could not locate fallbackProducts array brackets');
  }

  return afterMarker.slice(startBracket, endBracket + 1);
}

async function loadFallbackProducts() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const productsPath = path.resolve(__dirname, '../src/data/products.js');

  const raw = await fs.readFile(productsPath, 'utf8');

  // Remove any import lines (e.g., images) and normalize the image reference.
  const withoutImports = raw
    .split(/\r?\n/)
    .filter((line) => !line.trim().startsWith('import '))
    .join('\n');

  const arrayText = extractFallbackProductsArrayText(withoutImports)
    // Replace the imported image variable with a string placeholder.
    .replaceAll('imageUrl: recipe2', "imageUrl: 'recipe2.jpg'");

  // Evaluate the array literal safely in an isolated function context.
  // This is intended to run only against your local src/data/products.js.
  // eslint-disable-next-line no-new-func
  const products = new Function(`return (${arrayText});`)();

  if (!Array.isArray(products)) {
    throw new Error('Failed to parse products array');
  }
  return products;
}

const importData = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    console.log('Products Cleared...');

    const products = await loadFallbackProducts();

    await Product.insertMany(products);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
