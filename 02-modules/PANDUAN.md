# 02 — Module System

Node punya 2 sistem module: **CommonJS** (default lama, pakai `require`) dan **ES Modules** (standar JS modern, pakai `import`/`export`). Kamu wajib paham dua-duanya karena banyak project lama masih pakai CommonJS.

## CommonJS

`math.js`:
```js
function tambah(a, b) {
  return a + b;
}

function kurang(a, b) {
  return a - b;
}

module.exports = { tambah, kurang };
// atau: module.exports.tambah = tambah;
```

`index.js`:
```js
const { tambah, kurang } = require('./math');
console.log(tambah(2, 3));
```

Ciri khas: file `.js` biasa, ada `require`/`module.exports`, ada `__dirname`/`__filename` otomatis, loading bersifat **synchronous**.

## ES Modules (ESM)

Supaya Node mengenali file sebagai ESM, ada 2 cara:
1. Ekstensi file `.mjs`, atau
2. Tambahkan `"type": "module"` di `package.json` (berlaku untuk semua `.js` di project itu)

`math.mjs`:
```js
export function tambah(a, b) {
  return a + b;
}

export function kurang(a, b) {
  return a - b;
}

export default function kali(a, b) {
  return a * b;
}
```

`index.mjs`:
```js
import kali, { tambah, kurang } from './math.mjs';
console.log(tambah(2, 3));
```

Perbedaan penting dari CommonJS:
- Loading bersifat **asynchronous** secara internal
- Tidak ada `__dirname`/`__filename` bawaan (pakai `import.meta.url` kalau perlu)
- `export default` vs `export { namedExport }`
- Sekali `import`, semua top-level code di file itu jalan lebih dulu sebelum dipakai

## Kapan pakai yang mana?

- Kalau mulai project baru dari nol → ESM (`"type": "module"`) lebih modern dan jadi standar ke depan
- Kalau kerja di project/library lama → kemungkinan besar CommonJS
- Banyak package npm masih CommonJS-only, jadi kamu perlu paham cara mixing keduanya (walau ini agak tricky dan sering jadi sumber bug pemula)

## Referensi
- https://nodejs.org/api/modules.html
- https://nodejs.org/api/esm.html
