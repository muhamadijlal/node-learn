# 01 — Node.js Basics

## Apa bedanya Node.js dengan JS di browser?

JS di browser jalan di dalam sandbox: ada `window`, `document`, dan dibatasi buat akses file/sistem karena alasan keamanan. Node.js menjalankan JS di luar browser (pakai V8 engine), jadi tidak ada `window`/`document`, tapi punya akses penuh ke file system, network, process, dsb.

## Global object di Node

Beberapa hal yang selalu tersedia tanpa `require`:

- `process` — informasi & kontrol atas proses Node yang sedang jalan
  - `process.argv` — array argumen command line
  - `process.env` — environment variables
  - `process.exit(code)` — hentikan proses
  - `process.platform`, `process.version`, `process.cwd()`
- `console` — sama seperti di browser (`log`, `error`, `warn`, `table`, dll)
- `__dirname` / `__filename` — path folder & file saat ini (CommonJS only, nanti ini beda di ES Modules)

## Menjalankan script

```bash
node namafile.js argumen1 argumen2
```

`process.argv` akan berisi:
```
[0] path ke node
[1] path ke file yang dijalankan
[2..] argumen yang kamu ketik
```

Contoh:

```js
console.log(process.argv);
// node hello.js Ijal umur=25
// -> ['/path/node', '/path/hello.js', 'Ijal', 'umur=25']
```

## REPL

Ketik `node` saja di terminal tanpa nama file untuk masuk mode interaktif (REPL) — mirip console browser tapi untuk Node. Berguna buat coba-coba cepat. Keluar dengan `.exit` atau Ctrl+D.

## Referensi
- https://nodejs.org/api/process.html
