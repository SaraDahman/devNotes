import * as noteRepository from "../repositories/note.repository.js";
import * as folderRepository from "../repositories/folder.repository.js";
import { ApiError } from "../utils/api-error.js";

export async function getNotes(folderId) {
  if (folderId) {
    const folder = await folderRepository.findById(folderId);

    if (!folder) {
      throw new ApiError(404, "Folder not found");
    }
  }

  return noteRepository.findAll(folderId);
}

export async function getNoteById(id) {
  const note = await noteRepository.findById(id);

  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  return note;
}

export async function createNote({ title, content, folderId, favorite }) {
  if (folderId) {
    const folder = await folderRepository.findById(folderId);

    if (!folder) {
      throw new ApiError(404, "Folder not found");
    }
  }

  return noteRepository.create({
    title,
    content,
    folderId,
    favorite,
  });
}

export async function updateNote(id, { title, content, folderId, favorite }) {
  const note = await noteRepository.findById(id);

  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  if (folderId) {
    const folder = await folderRepository.findById(folderId);

    if (!folder) {
      throw new ApiError(404, "Folder not found");
    }
  }

  return noteRepository.update(id, {
    title,
    content,
    folderId,
    favorite,
  });
}

export async function deleteNote(id) {
  const note = await noteRepository.findById(id);

  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  await noteRepository.remove(id);
}
