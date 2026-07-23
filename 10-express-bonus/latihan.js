import express from 'express';

const app = express();
app.use(express.json());

// TODO: Soal 1 — migrasi to-do API dari 07-http-server


// TODO: Soal 2 — middleware logger


// TODO: Soal 3 — middleware validasi POST /todos


// TODO: Soal 4 — error handling middleware (4 parameter, di akhir file)


// TODO: Soal 5 (opsional) — express.Router() terpisah

app.listen(3000, () => console.log('Server jalan di http://localhost:3000'));
