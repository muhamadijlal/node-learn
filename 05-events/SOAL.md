# Soal — 05 Events

## Soal 1 — Order System Dasar
Buat class `OrderSystem extends EventEmitter` dengan method `buatOrder(customer, total)` yang meng-`emit` event `order:created` berisi object order (`id`, `customer`, `total`, `createdAt`).

Daftarkan 2 listener terpisah untuk `order:created`:
- Listener 1: print "Notifikasi terkirim ke [customer]"
- Listener 2: print "Order [id] senilai [total] dicatat ke laporan"

## Soal 2 — Multiple Events
Tambahkan method `batalkanOrder(id)` yang emit event `order:cancelled` dengan data `{ id }`. Tambahkan listener yang print "Order [id] dibatalkan."

Tambahkan juga: kalau total order melebihi 1.000.000, emit event tambahan `order:high-value` selain `order:created`. Pasang listener khusus buat notifikasi "Order besar terdeteksi!"

## Soal 3 — `once` vs `on`
Buat event `system:ready` yang di-emit sekali saat sistem pertama kali dijalankan. Pakai `.once()` untuk listener-nya, lalu coba `emit('system:ready')` dua kali — buktikan listener cuma jalan di emit pertama.

## Soal 4 — Error Event
Tambahkan method `buatOrder` supaya kalau `total` negatif atau bukan angka, dia `emit('error', new Error('Total tidak valid'))` alih-alih throw langsung. Pasang listener `'error'` yang menangkap dan print pesannya dengan rapi. Coba hapus listener error-nya sementara dan lihat apa yang terjadi saat error di-emit (program crash) — lalu pasang lagi.

## Soal 5 (Opsional) — Max Listeners Warning
Daftarkan lebih dari 10 listener untuk event yang sama pada satu emitter. Perhatikan Node akan print warning `MaxListenersExceededWarning`. Cari tahu kenapa warning ini ada (hint: mencegah memory leak) dan bagaimana cara menaikkan limitnya kalau memang sengaja (`emitter.setMaxListeners(n)`).
