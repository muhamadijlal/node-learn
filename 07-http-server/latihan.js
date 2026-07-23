import http from 'http';

let todos = [
  { id: 1, text: 'Belajar Node.js', done: false },
  { id: 2, text: 'Bikin REST API', done: false },
];

function bacaBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  // TODO: Soal 1 — GET /
  // TODO: Soal 2 — GET /todos
  // TODO: Soal 3 — POST /todos
  // TODO: Soal 4 — PATCH /todos/:id, DELETE /todos/:id
  // TODO: Soal 5 — status code & content-type yang benar
  // TODO: Soal 6 (opsional) — query string ?done=true

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
});

server.listen(3000, () => {
  console.log('Server jalan di http://localhost:3000');
});
