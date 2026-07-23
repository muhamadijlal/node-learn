# 05 — Events & EventEmitter

Node.js dibangun di atas pola **event-driven**. Banyak API bawaan (HTTP server, streams, dll) adalah `EventEmitter` di baliknya. Paham `EventEmitter` = paham cara Node bekerja secara internal.

## Dasar EventEmitter

```js
import { EventEmitter } from 'events';

const emitter = new EventEmitter();

// Daftar listener untuk event 'order:created'
emitter.on('order:created', (order) => {
  console.log('Notifikasi: order baru dari', order.customer);
});

// Bisa daftar banyak listener untuk event yang sama
emitter.on('order:created', (order) => {
  console.log('Log: order', order.id, 'dibuat');
});

// Trigger event
emitter.emit('order:created', { id: 1, customer: 'Ijal' });
```

Semua listener yang di-`on` akan dipanggil **synchronously** dan **berurutan** sesuai urutan didaftarkan, saat `emit` dipanggil.

## Method penting

- `emitter.on(event, listener)` — daftar listener, bisa dipanggil berkali-kali
- `emitter.once(event, listener)` — listener cuma jalan sekali lalu otomatis dilepas
- `emitter.off(event, listener)` / `removeListener` — lepas listener tertentu
- `emitter.emit(event, ...args)` — trigger event, kirim data ke semua listener
- `emitter.listenerCount(event)` — cek berapa listener terdaftar

## Error event khusus

Kalau kamu `emit('error', ...)` tanpa ada listener untuk `'error'`, Node akan **throw** dan crash proses. Ini behavior sengaja (supaya error tidak silent). Jadi kalau emitter kamu bisa emit error, selalu sediakan listener:
```js
emitter.on('error', (err) => console.error('Ada error:', err.message));
```

## Extends EventEmitter (pola umum)

Class custom biasanya extends EventEmitter, bukan cuma pakai instance langsung:
```js
class OrderSystem extends EventEmitter {
  buatOrder(customer) {
    const order = { id: Date.now(), customer };
    this.emit('order:created', order);
    return order;
  }
}
```

## Referensi
- https://nodejs.org/api/events.html
