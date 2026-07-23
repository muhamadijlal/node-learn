// Soal 1 — CommonJS
// 1. Buat file stringUtils.js di folder ini, export kapital/balik/hitungKata
// 2. require di sini dan test

const stringUtils = require('./stringUtils');

console.log(stringUtils.kapital('hello world')); // "HELLO WORLD"
console.log(stringUtils.balik('hello world')); // "dlrow olleh"
console.log(stringUtils.hitungKata('hello world')); // 2

// const stringUtils = require('./stringUtils');


