import * as noteService from "../services/note.service.js";

export async function getNotes(req, res, next) {
  try {
    const notes = await noteService.getNotes(req.query);

    res.json({ data: notes });
  } catch (error) {
    next(error);
  }
}

export async function getOtherNotes(req, res, next) {
  try {
    const notes = await noteService.getOtherNotes();

    res.json({ data: notes });
  } catch (error) {
    next(error);
  }
}

export async function getNoteById(req, res, next) {
  try {
    const note = await noteService.getNoteById(req.params.id);

    res.json({ data: note });
  } catch (error) {
    next(error);
  }
}

export async function createNote(req, res, next) {
  try {
    const note = await noteService.createNote(req.body);

    res.status(201).json({ data: note });
  } catch (error) {
    next(error);
  }
}

export async function updateNote(req, res, next) {
  try {
    const note = await noteService.updateNote(req.params.id, req.body);

    res.json({ data: note });
  } catch (error) {
    next(error);
  }
}

export async function deleteNote(req, res, next) {
  try {
    await noteService.deleteNote(req.params.id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
