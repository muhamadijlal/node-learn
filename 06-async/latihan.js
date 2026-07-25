// TODO: Soal 1 — ambilData(nama, delayMs)
function ambilData(nama, delayMs) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (nama === "error") {
                reject(new Error("Terjadi kesalahan saat mengambil data"));
            } else {
                resolve({ nama, delayMs });
            }
        }, delayMs);
    })
}

// TODO: Soal 2 — Sequential vs Parallel (console.time/console.timeEnd)

// const user = await ambilData("user", 1000)
// const produk = await ambilData("produk", 1500)
// const order = await ambilData("order", 800)


// console.log({ user, produk, order });
// console.timeEnd("sequential");

// console.time("parallel");
// const [userParallel, produkParallel, orderParallel] = await Promise.all([
//     ambilData("user", 1000),
//     ambilData("produk", 1500),
//     ambilData("order", 800)
// ]);


// console.log({ userParallel, produkParallel, orderParallel });
// console.timeEnd("parallel");

// TODO: Soal 3 — Error Handling (Promise.all vs Promise.allSettled)

// try {
//     const [user1, produk1, order1] = await Promise.allSettled([
//         ambilData("user", 1000),
//         ambilData("error", 1500),
//         ambilData("order", 800)
//     ]);

//     console.log({ user1, produk1, order1 });
// } catch (err) {
//     console.error(err.message);
// }

// console.log('A');

// setTimeout(() => console.log('B'), 0);

// Promise.resolve()
//     .then(() => console.log('C'))
//     .then(() => console.log('D'));

// console.log('E');


// TODO: Soal 4 — Event Loop Prediction


// TODO: Soal 5 (opsional) — Retry dengan Delay

// async function ambilDataDenganRetry(nama, delayMs, maxRetry) {
//     for (let i = 0; i < maxRetry; i++) {
//         try {
//             const data = await ambilData(nama, delayMs);

//             console.log(`Berhasil mengambil data pada percobaan ke-${i + 1}`);
//             return data;
//         } catch (error) {
//             console.log(`Gagal mengambil data pada percobaan ke-${i + 1} retry percobaan ke ${i + 2}`);
//             if (i === maxRetry - 1) {
//                 throw error;
//             }
//         }
//     }
// }

console.log(await ambilDataDenganRetry("error", 1000, 5));
