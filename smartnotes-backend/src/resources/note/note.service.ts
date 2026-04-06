import { PrismaClient } from '@prisma/client';
import { CreateNoteDTO, UpdateNoteDTO } from './note.types';

const prisma = new PrismaClient();

export const listNotes = (userId: string) => 
  prisma.note.findMany({ where: { userId } });

export const getNoteById = (id: string, userId: string) =>
  prisma.note.findFirst({ where: { id, userId } });

export const createNote = (data: CreateNoteDTO, userId: string) =>
  prisma.note.create({ data: { ...data, userId } });

export const updateNote = async (id: string, userId: string, data: UpdateNoteDTO) => {
  const note = await getNoteById(id, userId);
  if (!note) return null; // Proteção IDOR: nota não existe ou não é do usuário
  return prisma.note.update({ where: { id }, data });
};

export const deleteNote = async (id: string, userId: string) => {
  const note = await getNoteById(id, userId);
  if (!note) return null;
  return prisma.note.delete({ where: { id } });
};