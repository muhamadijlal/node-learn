# 07 — HTTP Server (built-in `http`)

Sebelum belajar Express, penting paham cara kerja server HTTP di level bawah pakai modul bawaan `http`. Express nantinya cuma "membungkus" ini dengan API yang lebih enak.

## Server paling dasar

```js
import http from 'http';

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Halo dari Node.js!');
});

server.listen(3000, () => {
  console.log('Server jalan di http://localhost:3000');
});
```

- `req` (IncomingMessage) — informasi request: `req.method`, `req.url`, `req.headers`
- `res` (ServerResponse) — untuk kirim response: `res.writeHead(status, headers)`, `res.write(chunk)`, `res.end(data)`

## Routing manual

Tidak ada router bawaan, jadi kamu cek `req.url` dan `req.method` sendiri:

```js
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Home' }));
  } else if (req.method === 'GET' && req.url === '/todos') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(todos));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});
```

## Baca request body (POST/PUT)

Body datang sebagai stream of chunks, harus dikumpulkan manual:

```js
function bacaBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

// pemakaian di dalam handler:
const bodyText = await bacaBody(req);
const data = JSON.parse(bodyText);
```

## Dynamic route params (manual)

Tidak ada `/todos/:id` otomatis. Kamu parse sendiri, misal pakai `URL`:
```js
const url = new URL(req.url, `http://${req.headers.host}`);
console.log(url.pathname); // '/todos/5'
const parts = url.pathname.split('/'); // ['', 'todos', '5']
const id = parts[2];
```

## Kenapa nanti pakai Express?

Karena semua di atas ini (routing, parsing body, params, dsb) akan jadi rumit begitu route-nya banyak. Express menyediakan itu semua sebagai fitur bawaan. Tapi paham cara manual dulu bikin kamu ngerti apa yang sebenarnya dilakukan Express di balik layar.

## Referensi
- https://nodejs.org/api/http.html
