# Soal — 08 Streams

## Soal 0 — Siapkan File Log
Buat script kecil (boleh terpisah, `buatLog.js`) yang generate file `app.log` berisi 100.000 baris, campuran level log secara acak, format:
```
[INFO] 2026-07-23T10:00:00.000Z Request diterima
[ERROR] 2026-07-23T10:00:01.000Z Database connection timeout
[WARN] 2026-07-23T10:00:02.000Z Memory usage tinggi
```
Gunakan `fs.createWriteStream` + loop untuk `.write()` tiap baris (jangan bikin 1 string raksasa dulu baru ditulis sekali — latih nulis stream-nya).

## Soal 1 — Baca dengan Readable Stream
Baca `app.log` pakai `fs.createReadStream`, hitung total baris dan total jumlah baris `[ERROR]` — tanpa memuat seluruh file ke memory sekaligus (jangan pakai `readFile` biasa). Print hasilnya di event `'end'`.

## Soal 2 — Transform Stream: Filter Log
Buat custom `Transform` stream yang cuma meloloskan baris yang mengandung `[ERROR]`. Pakai `pipeline` (dari `stream/promises`) untuk menyambungkan:
```
createReadStream('app.log') -> transformFilterError -> createWriteStream('errors.log')
```
Setelah selesai, cek `errors.log` cuma berisi baris ERROR.

## Soal 3 — Bandingkan Memory (Konsep)
Tulis (di komentar atau catatan terpisah) perbandingan: kalau kamu pakai `fs.readFileSync('app.log')` lalu `.split('\n')` lalu filter manual — apa bedanya dari sisi memory usage dibanding pendekatan stream di Soal 2? Kapan sebaiknya pakai cara yang mana?

## Soal 4 (Opsional) — Progress Reporting
Modifikasi Soal 1: sambil membaca, hitung berapa persen file yang sudah diproses (pakai `fs.statSync` untuk tahu total size, lalu akumulasi `chunk.length` yang sudah lewat) dan print progress setiap kelipatan 10%.
