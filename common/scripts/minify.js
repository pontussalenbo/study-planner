const fs = require('fs');

const args = process.argv.slice(2);

function minifyJson(data) {
    // Remove comments (single-line and multi-line)
    let json = data.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '');

    // Remove whitespace
    json = json.replace(/\s+/g, '');

    return json;
}

function minifyJsonAndWriteToFile(inputFilePath) {
    // Read the input JSON file
    const json = fs.readFileSync(inputFilePath, 'utf8');

    // Minify the JSON
    const minifiedJson = minifyJson(json);

    // Write the minified JSON to the output file
    fs.writeFileSync(inputFilePath, minifiedJson, 'utf8');
}

// Example usage:
const inputFilePath = args[0];

minifyJsonAndWriteToFile(inputFilePath);
