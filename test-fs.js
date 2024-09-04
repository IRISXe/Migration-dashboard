const fs = require('fs');

// Write a file
fs.writeFileSync('test.txt', 'Hello, world!');

// Read the file
const data = fs.readFileSync('test.txt', 'utf8');
console.log(data); // Should output: Hello, world!
