# Soal — 04 File System

Gunakan `fs/promises` + `async/await` untuk semua soal (bukan sync, bukan callback), kecuali diminta lain.

## Soal 1 — Tulis & Baca
Buat fungsi `simpanCatatan(isi)` yang menambahkan (append) satu baris teks ke file `catatan.txt` dengan timestamp di depannya, contoh:
```
[2026-07-23T10:00:00.000Z] Beli susu
```
Lalu buat fungsi `tampilkanCatatan()` yang membaca dan print seluruh isi `catatan.txt`.

## Soal 2 — To-Do List (JSON)
Bikin CLI to-do list yang datanya disimpan di `todos.json` sebagai array of object `{ id, text, done }`.

Buat 3 fungsi:
- `tambahTodo(text)` — baca todos.json (kalau belum ada, mulai dari array kosong), tambah item baru, simpan lagi
- `selesaikanTodo(id)` — ubah `done` jadi `true` untuk id tertentu
- `listTodo()` — print semua todo, tandai yang `done` dengan `[x]` dan yang belum dengan `[ ]`

Test semua fungsi di `latihan.js` dengan beberapa data dummy.

## Soal 3 — Scan Folder
Buat fungsi yang menerima path folder, lalu:
- List semua file & folder di dalamnya (`fs.readdir`)
- Untuk tiap item, cek apakah itu file atau folder (`fs.stat` + `.isDirectory()`)
- Print dengan format: `[FILE] nama.txt` atau `[DIR] namafolder`

## Soal 4 — Error Handling
Coba `tampilkanCatatan()` (soal 1) saat file `catatan.txt` belum ada sama sekali. Pasti error. Perbaiki supaya kalau error-nya `ENOENT`, program print "Belum ada catatan." alih-alih crash — tapi kalau error lain (misal permission denied), tetap throw supaya kelihatan ada masalah nyata.
