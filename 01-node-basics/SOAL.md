# Soal — 01 Node Basics

Kerjakan di `latihan.js`. Jalankan pakai `node latihan.js`.

## Soal 1 — Info Sistem
Buat script yang mencetak:
- Versi Node.js yang terpasang
- Platform OS (`process.platform`)
- Folder tempat file dijalankan (`process.cwd()`)

## Soal 2 — Baca Argumen
Buat script yang menerima nama dari command line, contoh:
```bash
node latihan.js Ijal
```
Lalu cetak: `Halo, Ijal!`

Jika tidak ada argumen yang diberikan, cetak: `Halo, stranger!` (jangan sampai error/crash).

## Soal 3 — Kalkulator CLI sederhana
Buat script yang menerima 3 argumen: angka1, operator (`+ - * /`), angka2.
```bash
node latihan.js 5 + 3
```
Output: `5 + 3 = 8`

Ingat: `process.argv` berisi string, jadi perlu di-convert ke number dulu (`Number(...)`).
Kalau operatornya tidak dikenali, cetak pesan error yang jelas.

## Soal 4 — Exit Code
Modifikasi Soal 3: kalau ada pembagian dengan 0, cetak error dan panggil `process.exit(1)` (kode error). Kalau berhasil, biarkan program keluar normal (exit code 0).

Cek exit code di terminal dengan:
```bash
echo $?
```
