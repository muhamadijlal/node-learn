# 10 — Bonus: Express.js

Setelah paham `http` bawaan (step 07), Express jadi jauh lebih masuk akal — dia cuma menyediakan lapisan kenyamanan di atas konsep yang sama.

## Install

```bash
npm init -y
npm install express
```
(pastikan `"type": "module"` di package.json kalau mau pakai `import`)

## Server dasar

```js
import express from 'express';

const app = express();
app.use(express.json()); // parsing body JSON otomatis, gantikan bacaBody() manual di step 07

app.get('/', (req, res) => {
  res.json({ message: 'Halo dari Express!' });
});

app.listen(3000, () => console.log('Server jalan di :3000'));
```

Bandingkan dengan step 07: tidak perlu `writeHead` manual, tidak perlu cek `req.url === '/'` manual, tidak perlu parsing body manual.

## Routing & Route Params

```js
app.get('/todos/:id', (req, res) => {
  const id = Number(req.params.id); // otomatis parsed dari URL
  const todo = todos.find(t => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: 'Not Found' });
  }
  res.json(todo);
});

app.post('/todos', (req, res) => {
  const { text } = req.body; // sudah di-parse otomatis oleh express.json()
  // ...
  res.status(201).json(newTodo);
});
```

## Middleware

Konsep inti Express: fungsi yang jalan sebelum route handler, bisa modify request/response atau stop chain (mis. untuk auth, logging).

```js
function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next(); // WAJIB dipanggil supaya lanjut ke handler berikutnya
}

app.use(logger); // jalan di semua route
```

## Error handling middleware (khusus Express, 4 parameter)

```js
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});
```
Harus didaftarkan **paling terakhir**, setelah semua route.

## Referensi
- https://expressjs.com/en/guide/routing.html
- https://expressjs.com/en/guide/using-middleware.html
