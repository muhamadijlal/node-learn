# Soal — 03 NPM & package.json

## Soal 1 — Init Project
Di dalam folder ini, jalankan `npm init -y`. Buka `package.json` yang ter-generate, ubah `"main"` jadi `"latihan.js"`.

## Soal 2 — Install & Pakai Package
Install package `chalk` (buat warna-warni text terminal):
```bash
npm install chalk
```
Buat `latihan.js` yang import `chalk` dan print teks berwarna, misal:
```js
import chalk from 'chalk';
console.log(chalk.green('Berhasil!'));
console.log(chalk.red('Error!'));
```
(Catatan: chalk versi terbaru ESM-only, jadi pastikan `package.json` ada `"type": "module"`.)

## Soal 3 — NPM Scripts
Tambahkan di `package.json`:
```json
"scripts": {
  "start": "node latihan.js",
  "greet": "node latihan.js --greet"
}
```
Jalankan dengan `npm start` dan `npm run greet`. Modifikasi `latihan.js` supaya perilakunya beda tergantung ada tidaknya flag `--greet` di `process.argv`.

## Soal 4 — DevDependency
Install `nodemon` sebagai devDependency:
```bash
npm install -D nodemon
```
Tambahkan script `"dev": "nodemon latihan.js"` lalu jalankan `npm run dev`. Ubah isi `latihan.js` sambil `nodemon` jalan — perhatikan dia auto-restart. Jelaskan (ke diri sendiri atau saya) bedanya dependencies vs devDependencies dan kenapa nodemon masuk devDependencies.

## Soal 5 — Baca package-lock.json
Buka `package-lock.json`, cari bagian `chalk`. Amati ada berapa nested dependency yang ikut ke-install. Ini buat paham kenapa file lock itu penting untuk konsistensi antar environment.
