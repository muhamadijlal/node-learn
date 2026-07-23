    # 03 — NPM & package.json

## package.json

File manifest project Node. Berisi metadata, dependencies, dan scripts.

```bash
npm init -y
```
akan generate `package.json` default. Field penting:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "node --watch index.js"
  },
  "dependencies": {},
  "devDependencies": {}
}
```

- `dependencies` — package yang dibutuhkan saat aplikasi jalan (production)
- `devDependencies` — package yang cuma dibutuhkan saat development (testing, linter, dsb)
- `scripts` — shortcut command, dijalankan dengan `npm run <nama>` (kecuali `start`/`test` bisa langsung `npm start`)

## Install package

```bash
npm install chalk          # -> masuk ke dependencies
npm install -D nodemon     # -> masuk ke devDependencies (-D = --save-dev)
npm install                # install semua dependencies dari package.json (biasanya setelah clone repo)
```

Ini akan membuat:
- folder `node_modules/` — isi package yang di-download (jangan di-commit ke git)
- `package-lock.json` — lock versi exact dari semua dependency (termasuk nested deps), harus di-commit

## Semantic Versioning (semver)

Format: `MAJOR.MINOR.PATCH`, misal `4.2.1`

Di package.json biasa muncul dengan prefix:
- `^4.2.1` — boleh update MINOR & PATCH, tidak boleh MAJOR (default npm install)
- `~4.2.1` — boleh update PATCH saja
- `4.2.1` — exact version, tidak boleh berubah

## npx

Jalankan package tanpa install permanen:
```bash
npx cowsay "halo"
```

## Referensi
- https://docs.npmjs.com/cli/v10/configuring-npm/package-json
- https://semver.org/
