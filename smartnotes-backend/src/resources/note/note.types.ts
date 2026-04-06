import { Note } from '@prisma/client';

export type CreateNoteDTO = Pick<Note, 'title' | 'content'>;
export type UpdateNoteDTO = Partial<CreateNoteDTO>;