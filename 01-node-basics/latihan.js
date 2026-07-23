import { argv, version, platform, cwd, exit } from "node:process";

// Kerjakan soal-soal dari SOAL.md di sini.
// Jalankan: node latihan.js

// TODO: Soal 1 — Info Sistem
console.log(`Version node : ${version}`)
console.log(`Info Sistem : ${platform}`)
console.log(`Working Directory : ${cwd()}`)

// TODO: Soal 2 — Baca Argumen
argv.length === 2 ? console.log('halo, stranger') : console.log(`Helo, ${argv.slice(2).join(", ")}`);

// TODO: Soal 3 — Kalkulator CLI sederhana
const params = argv.slice(2);
const number1 = parseFloat(params[0]);
const operator = params[1];
const number2 = parseFloat(params[2]);

switch (operator) {
    case '+':
        console.log(`Hasil: ${number1} + ${number2} = ${number1 + number2}`);
        break;
    case '-':
        console.log(`Hasil: ${number1} - ${number2} = ${number1 - number2}`);
        break;
    case '*':
        console.log(`Hasil: ${number1} * ${number2} = ${number1 * number2}`);
        break;
    case '/':
        if (number2 === 0) {
            console.log('Error: Pembagian dengan nol tidak diperbolehkan.');
            exit(1);
        } else {
            console.log(`Hasil: ${number1} / ${number2} = ${number1 / number2}`);
        }
        break;
    default:
        console.log('Operator tidak valid. Gunakan +, -, *, atau /.');
}
