import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateBook } from "@/app/actions";

export const dynamic = "force-dynamic";

export default async function EditBook({ params }: { params: { id: string } }) {
  const book = await prisma.book.findUnique({ where: { id: Number(params.id) } });
  if (!book) notFound();

  return (
    <>
      <h1>✏️ Edit Buku</h1>
      <section className="card">
        <form action={updateBook.bind(null, book.id)} className="form">
          <input name="title" defaultValue={book.title} required />
          <input name="author" defaultValue={book.author} required />
          <input name="year" type="number" defaultValue={book.year} required />
          <textarea name="notes" defaultValue={book.notes ?? ""} rows={3} />
          <div className="actions">
            <button type="submit">Update</button>
            <Link href="/" className="btn">
              Batal
            </Link>
          </div>
        </form>
      </section>
    </>
  );
}
