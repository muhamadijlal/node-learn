# Soal — 02 Modules

## Soal 1 — CommonJS
Buat file `stringUtils.js` (CommonJS) yang meng-export 3 fungsi:
- `kapital(str)` — ubah huruf pertama tiap kata jadi besar
- `balik(str)` — balik urutan string
- `hitungKata(str)` — hitung jumlah kata

Lalu buat `latihan.js` yang `require` file itu dan test ketiga fungsinya dengan `console.log`.

## Soal 2 — ES Modules
Buat folder `esm/` berisi `package.json` dengan isi:
```json
{ "type": "module" }
```
Buat `esm/mathUtils.js` yang export (pakai `export`/`export default`):
- `default export`: fungsi `luasPersegiPanjang(p, l)`
- named export: fungsi `luasLingkaran(r)` dan `kelilingLingkaran(r)`

Buat `esm/latihan.js` yang import dan test fungsi-fungsi itu. Jalankan dengan `node esm/latihan.js`.

## Soal 3 — Nested Modules
Di `stringUtils.js` (soal 1), pecah lagi jadi 2 file terpisah: `kapital.js` dan `balik.js`, masing-masing 1 module sendiri, lalu `stringUtils.js` meng-`require` keduanya dan re-export sebagai satu object gabungan.

Ini melatih pola umum di Node: "index/barrel file" yang menggabungkan beberapa module kecil.

## Soal 4 (Opsional, agak advance) — Circular Dependency
Buat 2 file CommonJS `a.js` dan `b.js` yang saling `require` satu sama lain (a require b, b require a). Jalankan dan lihat apa yang terjadi. Coba jelaskan kenapa itu terjadi (boleh tanya saya untuk verifikasi pemahaman kamu).
