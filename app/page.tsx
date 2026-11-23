import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createBook, deleteBook } from "./actions";

export const dynamic = "force-dynamic";

export default async function Home() {
  const books = await prisma.book.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <>
      <h1>📚 Daftar Buku</h1>
    
      {/* CREATE */}
      <section className="card">
        <h2>Tambah Buku</h2>
        <form action={createBook} className="form">
          <input name="title" placeholder="Judul" required />
          <input name="author" placeholder="Penulis" required />
          <input name="year" type="number" placeholder="Tahun terbit" required />
          <textarea name="notes" placeholder="Catatan / review (opsional)" rows={2} />
          <button type="submit">Simpan</button>
        </form>
      </section>

      {/* READ */}
      <section className="card">
        <h2>Koleksi ({books.length})</h2>
        {books.length === 0 && <p className="muted">Belum ada data.</p>}
        <ul className="list">
          {books.map((b) => (
            <li key={b.id}>
              <div>
                <strong>{b.title}</strong>
                <div className="muted">
                  {b.author} · {b.year}
                </div>
                {b.notes && <div className="notes">{b.notes}</div>}
              </div>
              <div className="actions">
                {/* UPDATE */}
                <Link href={`/books/${b.id}/edit`} className="btn">
                  Edit
                </Link>
                {/* DELETE */}
                <form action={deleteBook.bind(null, b.id)}>
                  <button type="submit" className="btn danger">
                    Hapus
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
