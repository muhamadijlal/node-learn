import { EventEmitter } from 'events';

// TODO: Soal 1 — class OrderSystem extends EventEmitter
class OrderSystem extends EventEmitter {
    createdOrder(customer, total) {
        const today = Date.now();
        const data = { id: today, customer, total, createdAt: today };

        this.emit('order:created', data);

        return data;
    }

    bulkOrder(id) {
        this.emit('order:high-value', { id, bulkAt: Date.now() });
    }

    cancelledOrder(id) {
        this.emit('order:canceled', { id, canceledAt: Date.now() });
    }
}

const orderSystem = new OrderSystem();

orderSystem.on('order:created', (data) => {
    orderSystem.emit('system:ready');
    orderSystem.emit('system:ready');

    if (data.total < 0) {
        orderSystem.emit('error', new Error(`Order [${data.id}] memiliki total negatif!`));
    }

    orderSystem.emit('order:notify', data.customer);
    orderSystem.emit('order:report', data);

    if (data.total >= 10000) {
        orderSystem.emit('order:high-value');
    }
});

orderSystem.on('order:notify', (customer) => {
    console.log(`Notifikasi terkirim ke [${customer}]`);
});

orderSystem.on('order:report', (data) => {
    console.log(`Order [${data.id}] senilai [${data.total}] dicatat ke laporan`);
});

orderSystem.on('order:canceled', (data) => {
    console.log(`"Order [${data.id}] dibatalkan."`);
});

orderSystem.on('order:high-value', () => {
    console.log('Order besar terdeteksi!');
});

orderSystem.once('system:ready', () => {
    console.log('Sistem siap!');
});

orderSystem.on('error', (err) => {
    console.error(`Terjadi error: ${err.message}`);
});

orderSystem.setMaxListeners(20);


for (let i = 1; i <= 12; i++) {
    orderSystem.on("data", () => console.log(`Listener ${i}`));
}

orderSystem.emit("data"); // semua 12 listener tetap dipanggil


// TODO: Soal 2 — batalkanOrder + order:high-value


// TODO: Soal 3 — once vs on


// TODO: Soal 4 — Error Event


// TODO: Soal 5 (opsional) — Max Listeners

// orderSystem.createdOrder('Budi', -1);
