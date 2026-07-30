import fs from 'fs';

const before2 = process.memoryUsage().rss;
let leftover = '';
let totalLines2 = 0;
let errorLines2 = 0;

const readStream = fs.createReadStream('app.log', { encoding: 'utf-8' });

readStream.on('data', (chunk) => {
    const data = leftover + chunk;
    const lines = data.split('\n');
    leftover = lines.pop(); // baris terakhir mungkin belum lengkap, simpan buat chunk berikutnya

    totalLines2 += lines.length;
    errorLines2 += lines.filter(l => l.includes('[ERROR]')).length;
});

readStream.on('end', () => {
    if (leftover.length > 0) {
        totalLines2 += 1;
        if (leftover.includes('[ERROR]')) errorLines2 += 1;
    }
    console.log('Total baris:', totalLines2);
    console.log('Baris ERROR:', errorLines2);
});
