import fs from 'fs';

const before = process.memoryUsage().rss;

const content = fs.readFileSync('app.log', 'utf-8'); // seluruh file masuk RAM
const lines = content.split('\n');
const errorLines = lines.filter(line => line.includes('[ERROR]'));

const after = process.memoryUsage().rss;

console.log('Total baris:', lines.length);
console.log('Baris ERROR:', errorLines.length);
console.log(`Memory dipakai: ${((after - before) / 1024 / 1024).toFixed(2)} MB`);
