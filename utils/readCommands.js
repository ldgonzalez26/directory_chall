const fs = require('fs');
// Read commands from a text file
const readCommands = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return data.split('\n').filter((line) => line.trim() !== '');
  } catch (err) {
    console.error(`Error reading file: ${err}`);
    return [];
  }
};

module.exports = { readCommands };
