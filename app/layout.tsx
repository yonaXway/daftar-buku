import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar Buku – CRUD Next.js + Prisma",
  description: "Latihan CRUD dengan Next.js, Prisma, dan SQLite",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
