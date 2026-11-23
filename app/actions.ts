"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function parse(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    author: String(formData.get("author") ?? "").trim(),
    year: Number(formData.get("year")),
    notes: String(formData.get("notes") ?? "").trim() || null,
  };
}

export async function createBook(formData: FormData) {
  const data = parse(formData);
  if (!data.title || !data.author || !Number.isInteger(data.year)) return;
  await prisma.book.create({ data });
  revalidatePath("/");
}

export async function updateBook(id: number, formData: FormData) {
  const data = parse(formData);
  if (!data.title || !data.author || !Number.isInteger(data.year)) return;
  await prisma.book.update({ where: { id }, data });
  revalidatePath("/");
  redirect("/");
}

export async function deleteBook(id: number) {
  await prisma.book.delete({ where: { id } });
  revalidatePath("/");
}
