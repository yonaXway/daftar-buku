# Daftar Buku – CRUD Next.js + Prisma + SQLite

Latihan Front End Programming: Deployment with Vercel.

## Jalankan lokal

```bash
cp .env.example .env          # DATABASE_URL="file:./dev.db"
npm install
npx prisma db push            # membuat prisma/dev.db
npm run dev                   # http://localhost:3000
```

Lalu ambil 4 screenshot di localhost:
1. **Create** – isi form "Tambah Buku" lalu simpan
2. **Review (Read)** – daftar koleksi yang tampil
3. **Update** – halaman Edit setelah klik tombol Edit
4. **Delete** – hapus satu data lewat tombol Hapus

**Sebelum push, pastikan di database masih ada beberapa data** (Vercel read-only,
jadi data yang tampil di Vercel adalah isi `prisma/dev.db` yang ikut di-commit).

## Push ke GitHub

```bash
git init
git add .
git commit -m "CRUD Next.js + Prisma + SQLite"
git branch -M main
git remote add origin https://github.com/<username>/daftar-buku.git
git push -u origin main
```

`.env` sudah ada di `.gitignore`; `prisma/dev.db` sengaja ikut ter-push.

## Deploy ke Vercel

1. vercel.com → **Add New → Project** → import repo `daftar-buku`.
2. Framework Preset: **Next.js**.
3. Environment Variables: `DATABASE_URL` = `file:./dev.db` (atau **Import .env**).
4. **Deploy**.

Catatan: di Vercel, `lib/prisma.ts` menyalin `dev.db` ke `/tmp` agar SQLite bisa
dibuka. Perubahan data di Vercel hanya sementara; data permanen = isi `dev.db`
yang di-push dari lokal.
