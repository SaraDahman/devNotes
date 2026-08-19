import * as folderRepository from "../repositories/folder.repository.js";
import { ApiError } from "../utils/api-error.js";

export async function getFolders() {
  return folderRepository.findAll();
}

export async function getFolderById(id) {
  const folder = await folderRepository.findById(id);

  if (!folder) {
    throw new ApiError(404, "Folder not found");
  }

  return folder;
}

export async function createFolder(name) {
  const existingFolder = await folderRepository.findByName(name);

  if (existingFolder) {
    throw new ApiError(409, "A folder with this name already exists");
  }

  return folderRepository.create(name);
}

export async function updateFolder(id, name) {
  const folder = await folderRepository.findById(id);

  if (!folder) {
    throw new ApiError(404, "Folder not found");
  }

  const existingFolder = await folderRepository.findByName(name);

  if (existingFolder && existingFolder.id !== Number(id)) {
    throw new ApiError(409, "A folder with this name already exists");
  }

  return folderRepository.update(id, name);
}

export async function deleteFolder(id) {
  const folder = await folderRepository.findById(id);

  if (!folder) {
    throw new ApiError(404, "Folder not found");
  }

  await folderRepository.remove(id);
}
