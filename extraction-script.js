const fs = require('fs');
const path = require('path');
const {JSDOM} = require('jsdom');

const assetsDir = path.join(__dirname, 'assets');
const resultJsonPath = path.join(__dirname, 'result.json');
const result = {};

// Function to recursively find .svg files
function findSvgFiles(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      findSvgFiles(filePath);
    } else if (path.extname(file).toLowerCase() === '.svg') {
      extractDAttribute(filePath);
    }
  });
}

// Function to extract "d" attribute from the last <path> element in an SVG file
function extractDAttribute(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const dom = new JSDOM(fileContent);
  const paths = dom.window.document.querySelectorAll('path');
  if (paths.length > 0) {
    const lastPath = paths[paths.length - 1];
    const dAttribute = lastPath.getAttribute('d');

    const fileNameWithoutExt = path.basename(filePath, path.extname(filePath)); // Extract filename without extension from filePath
    result[fileNameWithoutExt] = dAttribute; // Use fileName without extension in result
  }
}

// Find .svg files and extract data
findSvgFiles(assetsDir);

// Write the result to a JSON file
fs.writeFileSync(resultJsonPath, JSON.stringify(result, null, 2), 'utf8');

console.log('Extraction complete. Check result.json for output.');
