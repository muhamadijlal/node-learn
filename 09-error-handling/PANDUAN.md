# 09 — Error Handling & Debugging

## try/catch dengan async/await

```js
async function ambilUser(id) {
  try {
    const res = await fetch(`https://api.example.com/users/${id}`);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error('Gagal ambil user:', err.message);
    throw err; // re-throw kalau caller perlu tahu juga
  }
}
```

Catatan penting: `try/catch` **tidak menangkap** error dari callback biasa atau Promise yang tidak di-`await`:
```js
try {
  setTimeout(() => { throw new Error('boom'); }, 100);
} catch (err) {
  // TIDAK akan pernah masuk sini — errornya terjadi di macrotask terpisah
}
```

## Custom Error class

Bikin error yang lebih informatif daripada `Error` generik:
```js
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

throw new ValidationError('Email tidak valid', 'email');
```

Cek jenis error dengan `instanceof`:
```js
try {
  // ...
} catch (err) {
  if (err instanceof ValidationError) {
    console.log('Field bermasalah:', err.field);
  } else {
    throw err; // error tak terduga, lempar lagi
  }
}
```

## Process-level error handling (jaring pengaman terakhir)

```js
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1); // best practice: exit, jangan coba lanjut jalan di state tidak pasti
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});
```
Ini bukan pengganti error handling yang benar di kode kamu — cuma jaring pengaman terakhir supaya proses tidak mati diam-diam tanpa log.

## Error handling di HTTP server (penting untuk step 07)

Setiap route handler yang pakai `async`, kalau tidak dibungkus try/catch, error-nya bisa bikin server "menggantung" (request tidak pernah direspon) alih-alih crash dengan jelas:
```js
const server = http.createServer(async (req, res) => {
  try {
    // ... logic yang bisa throw
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
});
```

## Debugging dengan `--inspect`

```bash
node --inspect latihan.js
```
Lalu buka `chrome://inspect` di Chrome, atau kalau pakai VS Code, gunakan built-in debugger (breakpoint langsung di editor). `console.log` tetap valid buat debugging cepat, tapi debugger berguna untuk kasus kompleks (inspect variable state, step through code).

## Referensi
- https://nodejs.org/api/process.html#event-uncaughtexception
- https://nodejs.org/en/learn/getting-started/debugging
