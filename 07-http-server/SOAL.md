# Soal — 07 HTTP Server

Bangun REST API to-do list sederhana (in-memory, data disimpan di array biasa di memory — hilang kalau server restart, tidak apa-apa untuk latihan ini).

## Soal 1 — Server Dasar
Buat server yang listen di port 3000. Route `GET /` return JSON `{ message: 'To-Do API jalan!' }`. Test dengan browser atau `curl http://localhost:3000`.

## Soal 2 — GET /todos
Siapkan array `todos` in-memory berisi beberapa data awal: `{ id, text, done }`.
Buat route `GET /todos` yang return semua todos sebagai JSON array.

## Soal 3 — POST /todos
Buat route `POST /todos` yang:
- Baca body request (JSON `{ text: "..." }`)
- Buat todo baru dengan id auto-increment, `done: false`
- Push ke array `todos`
- Return todo yang baru dibuat dengan status code `201`

Test pakai `curl`:
```bash
curl -X POST http://localhost:3000/todos -H "Content-Type: application/json" -d "{\"text\":\"Belajar Node\"}"
```

## Soal 4 — PATCH /todos/:id dan DELETE /todos/:id
- `PATCH /todos/5` dengan body `{ "done": true }` → update field `done` todo dengan id 5
- `DELETE /todos/5` → hapus todo dengan id 5 dari array

Kalau id tidak ditemukan, return status `404` dengan pesan error JSON.

## Soal 5 — Content-Type & Status Code yang Benar
Pastikan semua response:
- Selalu set header `Content-Type: application/json`
- Pakai status code yang sesuai: `200` (OK), `201` (Created), `404` (Not Found), `400` (Bad Request — misal body tidak valid)

## Soal 6 (Opsional) — Query String
Tambahkan support `GET /todos?done=true` untuk filter todo yang sudah selesai saja (pakai `URL` dan `searchParams`).
