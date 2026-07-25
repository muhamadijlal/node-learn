import http from 'http';

const todos = [
    { id: 1, title: 'Belajar Node.js', completed: false },
    { id: 2, title: 'Membuat Aplikasi To-Do', completed: false },
    { id: 3, title: 'Menyelesaikan Proyek', completed: false }
];

const allowedFields = ['id', 'title', 'completed'];

// baca body — cukup baca saja, tanpa validasi
function bacaBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', (chunk) => { body += chunk; });
        req.on('end', () => resolve(body));
        req.on('error', (err) => reject(err));
    });
}

const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;

    if (req.method === 'GET' && pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'To-Do API jalan' }));

    } else if (req.method === 'GET' && pathname === '/todos') {
        const completedParam = url.searchParams.get('completed'); // "true" | "false" | null

        let hasil = todos;
        if (completedParam !== null) {
            const nilai = completedParam.toLowerCase() === 'true';
            hasil = todos.filter(todo => todo.completed === nilai);
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Daftar To-Do', data: hasil }));

    } else if (req.method === 'POST' && pathname === '/todos') {
        const bodyText = await bacaBody(req);

        let body;
        try {
            body = JSON.parse(bodyText);
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Format JSON tidak valid' }));
            return;
        }

        const invalidFields = Object.keys(body).filter(key => !allowedFields.includes(key));
        if (invalidFields.length > 0) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Field tidak valid', invalidFields }));
            return;
        }

        const newTodo = {
            id: todos.length + 1,
            title: body.title,
            completed: false
        };
        todos.push(newTodo);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'To-Do berhasil ditambahkan', data: todos }));

    } else if (req.method === 'DELETE' && pathname.startsWith('/todos/')) {
        const id = parseInt(pathname.split('/')[2]);
        const index = todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
            todos.splice(index, 1);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'To-Do berhasil dihapus', data: todos }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'To-Do tidak ditemukan' }));
        }

    } else if (req.method === 'PATCH' && pathname.startsWith('/todos/')) {
        const id = parseInt(pathname.split('/')[2]);
        const index = todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
            const bodyText = await bacaBody(req);

            let body;
            try {
                body = JSON.parse(bodyText);
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Format JSON tidak valid' }));
                return;
            }

            const invalidFields = Object.keys(body).filter(key => !allowedFields.includes(key));
            if (invalidFields.length > 0) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Field tidak valid', invalidFields }));
                return;
            }

            if (body.title !== undefined) todos[index].title = body.title;
            if (body.completed !== undefined) todos[index].completed = body.completed;

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'To-Do berhasil diperbarui', data: todos }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'To-Do tidak ditemukan' }));
        }

    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route tidak ditemukan' }));
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
