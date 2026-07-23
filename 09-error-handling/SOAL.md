# Soal — 09 Error Handling

## Soal 1 — Custom Error Classes
Buat 2 custom error: `ValidationError` (untuk input tidak valid) dan `NotFoundError` (untuk data tidak ditemukan), keduanya `extends Error`.

Buat fungsi `validasiTodo(text)` yang throw `ValidationError` kalau `text` kosong atau bukan string. Buat fungsi `cariTodo(todos, id)` yang throw `NotFoundError` kalau id tidak ada di array.

Test keduanya dengan try/catch, gunakan `instanceof` untuk membedakan jenis error dan cetak pesan yang berbeda untuk masing-masing.

## Soal 2 — Kembali ke Step 07 (HTTP Server)
Buka lagi project di `07-http-server`. Tambahkan error handling:
- Bungkus seluruh handler request dengan try/catch, kalau ada error tak terduga return `500` dengan JSON `{ error: 'Internal Server Error' }` (jangan sampai server crash gara-gara 1 request bermasalah)
- Body request yang bukan JSON valid (`JSON.parse` gagal) harus return `400`, bukan `500`
- Route `PATCH/DELETE /todos/:id` dengan id yang tidak ada harus tetap return `404` yang rapi (pakai `NotFoundError` dari Soal 1 kalau mau)

## Soal 3 — unhandledRejection
Buat script kecil yang sengaja punya Promise ter-reject tanpa `.catch()`/try-catch, contoh:
```js
async function gagal() {
  throw new Error('sengaja gagal');
}
gagal(); // tidak di-await, tidak di-catch
```
Jalankan tanpa handler dulu, lihat warning yang muncul di terminal. Lalu tambahkan `process.on('unhandledRejection', ...)` di atasnya dan jalankan lagi — bandingkan behaviornya.

## Soal 4 — Simulasi Uncaught Exception
Pasang `process.on('uncaughtException', ...)` yang log error lalu `process.exit(1)`. Lalu sengaja panggil fungsi yang throw error di luar try/catch manapun (misal dari dalam `setTimeout`). Amati proses tetap "aman" mati dengan log yang jelas, dibanding tanpa handler ini (Node akan print stack trace default lalu tetap exit, tapi tanpa log custom kamu).

## Soal 5 (Opsional) — Debugging
Jalankan salah satu file latihan kamu dari step sebelumnya dengan `node --inspect`, buka `chrome://inspect`, pasang breakpoint, dan step through eksekusinya. Atau kalau pakai VS Code, coba built-in debugger (F5) dengan breakpoint di editor.
