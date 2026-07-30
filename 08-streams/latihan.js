import fs from 'fs';
import { Transform } from 'stream';
import { pipeline } from 'stream/promises';

// Write dummy log data to app.log
const status = ['INFO', 'ERROR', 'WARN'];
const messages = {
    INFO: "Informasi umum tentang aplikasi. Contoh: Aplikasi berhasil dijalankan.",
    ERROR: "Kesalahan terjadi dalam aplikasi. Contoh: Gagal terhubung ke database.",
    WARN: "Peringatan tentang kondisi aplikasi. Contoh: Kapasitas penyimpanan hampir penuh."
};
const writeStream = fs.createWriteStream('app.log', { flags: 'w' }); // 'w' => default (menghapus isi ketika akan write)
const date = new Date().toISOString();

for (let i = 0; i < 100000; i++) {
    const randomNumber = Math.floor(Math.random() * status.length);
    const levelStatus = status[randomNumber];
    writeStream.write(`[${levelStatus}] - '${date} - ${messages[levelStatus]}'\n`);
}

// TODO: Soal 1 — baca app.log dengan stream, hitung total baris & baris [ERROR]
await new Promise(r => {
    writeStream.on('finish', () => {
        const readStream = fs.createReadStream('app.log', { encoding: 'utf-8' });
        let totalLines = 0;
        let errorLines = 0;

        readStream.on('data', (chunk) => {
            totalLines += chunk.split('\n').length - 1;
            errorLines += chunk.split('\n').filter(line => line.includes('[ERROR]')).length;
        });

        readStream.on('end', () => {
            // console.log(`Total baris: ${totalLines}`);
            // console.log(`Baris [ERROR]: ${errorLines}`);
        });
    });
    writeStream.end(); // tutup stream setelah selesai menulis
    writeStream.on('finish', r);
})

// TODO: Soal 2 — Transform stream filter [ERROR] -> errors.log
const errorLogs = new Transform({
    transform(chunk, encoding, callback) {
        const lines = chunk.toString().split('\n');
        const errorLogs = lines.filter(line => line.includes('[ERROR]')).join('\n') + '\n';

        callback(null, errorLogs);
    }
});

await pipeline(
    fs.createReadStream('app.log'),
    errorLogs,
    fs.createWriteStream('errors.log')
);

// Soal 3 — jawab di komentar sini
/**
 * Saya mau coba mengomentari soal 3. jika menggunakan readfileSync, seluruh file akan dibaca langsung ke dalam RAM, sehingga jika file sngat besar ukurannya, maka akan memakan banyak memori. sedangakan jika menggunakan stream, file akan dibaca secara bertahap (chunk by chunk), sehingga penggunaan memori lebih efisien dan tidak membebani RAM. dengan stream, kita bisa memproses data secara real-time tanpa harus menunggu seluruh file selesai dibaca. sehingga lebih efisien dan scalable untuk file besar.
 */

// TODO: Soal 4 (opsional) — progress reporting
const stats = fs.statSync('app.log');
const totalSize = stats.size;

let processedSize = 0;
let lastReported = 0;

const progressStream = new Transform({
    transform(chunk, encoding, callback) {
        processedSize += chunk.length;
        const progress = Math.min((processedSize / totalSize) * 100, 100);

        // selama sudah melewati kelipatan 10 berikutnya, cetak
        while (progress >= lastReported + 10) {
            lastReported += 10;
            console.log(`Progress: ${lastReported}%`);
        }

        callback(null, chunk);
    }
});

await pipeline(
    fs.createReadStream('app.log'),
    progressStream,
    fs.createWriteStream('errors.log')
);
