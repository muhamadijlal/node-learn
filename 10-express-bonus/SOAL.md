# Soal — 10 Express Bonus

## Soal 1 — Migrasi Step 07 ke Express
Ambil semua fitur to-do API yang sudah kamu buat di `07-http-server` (GET/POST/PATCH/DELETE `/todos`), bangun ulang pakai Express di folder ini (`latihan.js`).

Bandingkan jumlah baris kode & kompleksitasnya dengan versi `http` manual — ini melatih kamu menghargai kenapa framework ada.

## Soal 2 — Middleware Custom
Buat middleware `logger` yang print `[METHOD] /path - waktu response (ms)` untuk setiap request (hitung waktu mulai sebelum `next()`, hitung selisih setelah response selesai lewat event `res.on('finish', ...)`).

## Soal 3 — Validasi dengan Middleware
Buat middleware `validasiTodoBody` yang khusus dipasang di route `POST /todos` — cek `req.body.text` ada dan berupa string non-kosong. Kalau tidak valid, langsung `res.status(400).json({ error: '...' })` dan jangan panggil `next()`.

## Soal 4 — Error Handling Middleware
Sengaja buat 1 route yang bisa throw error (misal akses property dari `undefined`). Tanpa error middleware, lihat apa yang terjadi (Express default akan return HTML error page). Lalu tambahkan error-handling middleware di akhir dan bandingkan hasilnya — sekarang harus rapi dalam bentuk JSON.

## Soal 5 (Opsional) — Router terpisah
Pecah route `/todos/*` ke file terpisah pakai `express.Router()`, lalu `app.use('/todos', todosRouter)` di file utama. Ini pola umum di project Express nyata supaya route tidak numpuk di 1 file.
