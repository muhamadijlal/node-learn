import fs from 'fs/promises';

// TODO: Soal 1 — Tulis & Baca (simpanCatatan, tampilkanCatatan)
async function simpanCatatan(isi) {
    try {
        await fs.access('catatan.txt');
        await fs.appendFile('catatan.txt', new Date().toISOString() + ' ' + isi + '\n');

        return 'Catatan berhasil disimpan.';
    } catch (error) {
        if (error.code === 'ENOENT') {
            await fs.writeFile('catatan.txt', '', 'utf-8');

            return simpanCatatan(isi);
        }
        console.error('Error:', error);
    }
}

async function tampilkanCatatan() {
    try {
        const data = await fs.readFile('catatan.txt', 'utf-8');

        return `\n--- ISI FILE CATATAN ---\n${data}`;
    } catch (error) {
        console.error('Error:', error);

        return 'Gagal membaca catatan.';
    }
}

// (async () => {
//     console.log(await simpanCatatan('Ini adalah catatan pertama.'));
//     console.log(await simpanCatatan('Ini adalah catatan kedua.'));
//     console.log(await simpanCatatan('Ini adalah catatan ketiga.'));
//     console.log(await tampilkanCatatan());
// })();

// TODO: Soal 2 — To-Do List JSON (tambahTodo, selesaikanTodo, listTodo)
async function tambahTodo({ id = null, text = '', done = false }) {
    let fileContent = '';

    try {
        await fs.access('todos.json');
        fileContent = await fs.readFile('todos.json', 'utf-8');

        return true;
    } catch (error) {
        if (error.code === 'ENOENT') {
            fileContent = '[]';
        } else {
            console.log(`Error: ${error.message}`);
        }
    }

    if (fileContent.trim() === '') {
        fileContent = '[]';
    }

    try {
        const listTodo = JSON.parse(fileContent);

        listTodo.push({ id, text, done });

        await fs.writeFile('todos.json', JSON.stringify(listTodo, null, 2), 'utf-8');
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

async function selesaikanTodo(id) {

    let fileContent = '';

    try {
        await fs.access('todos.json');
        fileContent = await fs.readFile('todos.json', 'utf-8');
    } catch (error) {
        if (error.code === 'ENOENT') {
            return `Error: File todos.json tidak ditemukan.`;
        } else {
            return `Error: ${error.message}`;
        }
    }

    if (fileContent.trim() === '') {
        return `Error: File todos.json kosong.`;
    }

    try {
        const listTodo = JSON.parse(fileContent);

        const updatedListTodo = listTodo.map((todo) => {
            if (todo.id === id) {
                return { ...todo, done: true };
            }

            return todo;
        });

        await fs.writeFile('todos.json', JSON.stringify(updatedListTodo, null, 2), 'utf-8');
    } catch (error) {
        return `Gagal menulis ke file todos.json: ${error.message}`;
    }
}

async function listTodo() {
    try {
        await fs.access('todos.json');
        const fileContent = await fs.readFile('todos.json', 'utf-8');

        if (fileContent.trim() === '') {
            return `Error: File todos.json kosong.`;
        }

        const listTodo = JSON.parse(fileContent);

        return listTodo;
    } catch (error) {
        if (error.code === 'ENOENT') {
            return `Error: File todos.json tidak ditemukan.`;
        }

        return `Error: ${error.message}`;
    }
}


// console.log(await tambahTodo({ id: 1, text: "Belajar Node.js part 2", done: false }));
// console.log(await tambahTodo({ id: 2, text: "Belajar Node.js part 3", done: false }));
// console.log(await tambahTodo({ id: 3, text: "Belajar Node.js part 4", done: false }));
// console.log(await selesaikanTodo(2));


// TODO: Soal 3 — Scan Folder
console.log(await scanFolder('D:/var/www/html/p1'));

async function scanFolder(folderPath) {
    const items = await fs.readdir(folderPath);

    items.map(async (item) => {
        const path = `${folderPath}/${item}`;

        const stat = await fs.stat(path);
        const stats = await fs.stat(path);

        // Memanggil metode .isDirectory()
        if (stats.isDirectory()) {
            console.log(`[FOLDER] ${path}`);
        } else {
            console.log(`[FILE] ${path}`);
        }
    });
}

// TODO: Soal 4 — Error Handling
