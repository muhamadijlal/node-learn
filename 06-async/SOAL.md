# Soal — 06 Async

## Soal 1 — Simulasi Fetch dengan Delay
Buat fungsi `ambilData(nama, delayMs)` yang return Promise, resolve setelah `delayMs` (pakai `setTimeout` di dalam `new Promise(...)`) dengan value `{ nama, data: 'hasil dari ' + nama }`.

```js
function ambilData(nama, delayMs) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ nama, data: `hasil dari ${nama}` }), delayMs);
  });
}
```

## Soal 2 — Sequential vs Parallel
Panggil `ambilData` untuk 3 sumber berbeda ("user", "produk", "order") dengan delay masing-masing 1000ms, 1500ms, 800ms.

- Versi A: pakai `await` satu-satu berurutan, ukur total waktu pakai `console.time`/`console.timeEnd`
- Versi B: pakai `Promise.all`, ukur total waktu juga

Bandingkan dan jelaskan (ke diri sendiri) kenapa hasilnya beda jauh.

## Soal 3 — Error Handling di Async
Modifikasi `ambilData` supaya kalau `nama === 'error'`, dia `reject(new Error('Sumber tidak ditemukan'))`.

Panggil dengan `Promise.all` untuk sumber `['user', 'error', 'produk']` dan bungkus dengan try/catch — amati semua request "gagal" walau cuma 1 yang error.

Lalu ganti dengan `Promise.allSettled` untuk sumber yang sama, dan print status tiap hasil (`fulfilled` atau `rejected`) tanpa menggagalkan semuanya.

## Soal 4 — Event Loop Prediction
Sebelum menjalankan kode ini, coba tebak dulu urutan outputnya di kertas/notes:
```js
console.log('A');

setTimeout(() => console.log('B'), 0);

Promise.resolve()
  .then(() => console.log('C'))
  .then(() => console.log('D'));

console.log('E');
```
Baru jalankan dan cocokkan. Kalau salah tebak, coba jelaskan alasannya sampai paham kenapa urutannya begitu.

## Soal 5 (Opsional) — Retry dengan Delay
Buat fungsi `ambilDataDenganRetry(nama, delayMs, maxRetry)` yang mencoba `ambilData` sampai `maxRetry` kali kalau reject, dengan jeda antar percobaan. Gunakan `async/await` + loop biasa (bukan recursive), jangan pakai library luar.
