# 08 — Streams & Buffer

## Kenapa streams penting?

Bayangkan baca file 2GB dengan `fs.readFile` biasa — semua data harus masuk RAM sekaligus. Stream memproses data **per potongan (chunk)**, jadi memory usage tetap kecil walau file-nya raksasa. Ini alasan Node cocok untuk aplikasi yang handle file besar / data streaming (video, log processing, dsb).

## Buffer

Representasi data biner mentah di Node (sebelum ada `Uint8Array` dkk sebagai standar JS). Saat baca file/stream tanpa encoding, kamu dapat `Buffer`, bukan string:
```js
const buf = Buffer.from('halo', 'utf-8');
console.log(buf);          // <Buffer 68 61 6c 6f>
console.log(buf.toString()); // 'halo'
```

## 4 Jenis Stream

- **Readable** — sumber data (misal. `fs.createReadStream`)
- **Writable** — tujuan data (misal. `fs.createWriteStream`)
- **Duplex** — bisa dibaca & ditulis (misal. TCP socket)
- **Transform** — Duplex yang mengubah data saat lewat (misal. compress, encrypt)

## Baca file besar dengan Readable Stream

```js
import fs from 'fs';

const readStream = fs.createReadStream('bigfile.log', { encoding: 'utf-8' });

readStream.on('data', (chunk) => {
  console.log('Dapat potongan sepanjang', chunk.length);
});

readStream.on('end', () => {
  console.log('Selesai baca semua file');
});

readStream.on('error', (err) => {
  console.error('Error:', err);
});
```

## Pipe — menyambungkan Readable ke Writable

```js
const readStream = fs.createReadStream('input.log');
const writeStream = fs.createWriteStream('output.log');

readStream.pipe(writeStream);
// otomatis handle backpressure (kalau writable lebih lambat dari readable)
```

## Transform Stream — custom pemrosesan tiap chunk

```js
import { Transform } from 'stream';

const filterBaris = new Transform({
  transform(chunk, encoding, callback) {
    const baris = chunk.toString().split('\n');
    const hasil = baris.filter(b => b.includes('ERROR')).join('\n');
    callback(null, hasil + '\n');
  }
});

fs.createReadStream('app.log')
  .pipe(filterBaris)
  .pipe(fs.createWriteStream('errors.log'));
```

## `pipeline` (cara modern & aman, lebih baik dari `.pipe()` manual)

`.pipe()` tidak otomatis meneruskan error dan tidak selalu cleanup stream dengan benar kalau ada error di tengah. Gunakan `pipeline` dari `stream/promises`:

```js
import { pipeline } from 'stream/promises';

await pipeline(
  fs.createReadStream('app.log'),
  filterBaris,
  fs.createWriteStream('errors.log')
);
console.log('Selesai, semua error sudah ditangani otomatis');
```

## Referensi
- https://nodejs.org/api/stream.html
- https://nodejs.org/api/buffer.html
