import { Request, Response } from 'express';
import * as noteService from './note.service';

export const index = async (req: Request, res: Response) => {
  const notes = await noteService.listNotes(req.session.userId!);
  res.json(notes);
};

export const create = async (req: Request, res: Response) => {
  const note = await noteService.createNote(req.body, req.session.userId!);
  res.status(201).json(note);
};

export const read = async (req: Request, res: Response) => {
  const note = await noteService.getNoteById(req.params.id, req.session.userId!);
  if (!note) return res.status(404).json({ msg: "Nota não encontrada" });
  res.json(note);
};

export const update = async (req: Request, res: Response) => {
  const note = await noteService.updateNote(req.params.id, req.session.userId!, req.body);
  if (!note) return res.status(404).json({ msg: "Nota não encontrada" });
  res.json(note);
};

export const remove = async (req: Request, res: Response) => {
  const note = await noteService.deleteNote(req.params.id, req.session.userId!);
  if (!note) return res.status(404).json({ msg: "Nota não encontrada" });
  res.status(204).send();
};