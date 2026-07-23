# 04 — File System (fs)

Modul bawaan `fs` untuk baca/tulis file. Ada 3 gaya API:

## 1. Synchronous (blocking)
```js
import fs from 'fs';

const data = fs.readFileSync('data.txt', 'utf-8');
fs.writeFileSync('output.txt', 'halo dunia');
```
Blocking = program berhenti total sampai operasi selesai. Simpel, tapi buruk untuk server yang harus melayani banyak request sekaligus.

## 2. Callback-based (async, gaya lama)
```js
fs.readFile('data.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
```
Non-blocking, tapi kalau nested banyak jadi "callback hell".

## 3. Promise-based (async, gaya modern — pakai ini)
```js
import fs from 'fs/promises';

const data = await fs.readFile('data.txt', 'utf-8');
await fs.writeFile('output.txt', 'halo dunia');
```
Ini yang paling sering dipakai di kode modern, dikombinasikan dengan `async/await`.

## Operasi umum lainnya

```js
await fs.mkdir('folder-baru', { recursive: true });
await fs.readdir('.');              // list isi folder
await fs.stat('file.txt');          // info file (size, isFile(), isDirectory(), dsb)
await fs.appendFile('log.txt', 'baris baru\n');
await fs.rm('file.txt');            // hapus file
await fs.rename('a.txt', 'b.txt');
```

## Path handling

Selalu gabungkan path pakai modul `path`, jangan concat string manual (beda OS beda separator: `/` vs `\`):
```js
import path from 'path';
const fullPath = path.join(__dirname, 'data', 'file.txt');
```

## Error handling penting
File yang tidak ada akan throw error dengan `err.code === 'ENOENT'`. Selalu bungkus operasi fs async dengan try/catch (kalau pakai await) atau cek `err` di callback.

## Referensi
- https://nodejs.org/api/fs.html
- https://nodejs.org/api/path.html
