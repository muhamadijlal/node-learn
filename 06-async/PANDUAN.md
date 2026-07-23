# 06 — Async Patterns & Event Loop

Ini topik paling penting di Node.js. Node itu **single-threaded** untuk kode JS-nya, tapi bisa handle ribuan operasi I/O bersamaan berkat **event loop** + operasi I/O yang didelegasikan ke sistem (libuv).

## Evolusi pola async di JS

### 1. Callback (gaya lama)
```js
fs.readFile('a.txt', 'utf-8', (err, data) => {
  if (err) return console.error(err);
  fs.readFile('b.txt', 'utf-8', (err, data2) => {
    // makin dalam makin "callback hell"
  });
});
```

### 2. Promise
```js
fs.promises.readFile('a.txt', 'utf-8')
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### 3. async/await (sintaks di atas Promise, paling enak dibaca)
```js
async function bacaFile() {
  try {
    const data = await fs.promises.readFile('a.txt', 'utf-8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```
`await` cuma bisa dipakai di dalam fungsi `async`. Function `async` selalu return Promise.

## Menjalankan banyak async bersamaan

```js
// SALAH kalau mau paralel — ini sequential, total waktu = jumlah semua delay
const a = await ambilData('a');
const b = await ambilData('b');

// BENAR untuk paralel — total waktu = delay terlama saja
const [a, b] = await Promise.all([ambilData('a'), ambilData('b')]);
```

- `Promise.all([...])` — tunggu semua selesai, kalau salah satu reject, langsung reject semua
- `Promise.allSettled([...])` — tunggu semua selesai apapun hasilnya (fulfilled/rejected), tidak short-circuit
- `Promise.race([...])` — resolve/reject secepat salah satu selesai duluan

## Event Loop (konsep, bukan cuma hafalan)

Urutan eksekusi kira-kira:
1. Semua kode synchronous jalan dulu, top to bottom
2. Setelah itu, **microtask queue** dikosongkan dulu (Promise `.then`/`.catch`, `queueMicrotask`, `async/await` continuation)
3. Baru **macrotask** berikutnya dari queue (`setTimeout`, `setImmediate`, I/O callback)
4. Ulangi dari step 2

Contoh classic buat ngetes pemahaman:
```js
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// Output: 1, 4, 3, 2
```
Kenapa? `1` dan `4` synchronous. `3` (microtask) selalu didahulukan sebelum `2` (macrotask timer), walau timeout-nya 0ms.

## Referensi
- https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
