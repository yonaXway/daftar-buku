import { PrismaClient } from "@prisma/client";
import fs from "node:fs";
import path from "node:path";

// Di Vercel filesystem project bersifat read-only, sedangkan SQLite butuh
// membuat file journal. Solusinya: salin dev.db ke /tmp saat cold start.
// Data bawaan (yang di-commit) tetap terbaca; perubahan di Vercel bersifat sementara.
function resolveDatasourceUrl(): string | undefined {
  if (!process.env.VERCEL) return undefined; // lokal: pakai DATABASE_URL dari .env

  const source = path.join(process.cwd(), "prisma", "dev.db");
  const target = "/tmp/dev.db";
  if (!fs.existsSync(target) && fs.existsSync(source)) {
    fs.copyFileSync(source, target);
  }
  return `file:${target}`;
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ datasourceUrl: resolveDatasourceUrl() });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
