import * as folderService from "../services/folder.service.js";

export async function getFolders(req, res, next) {
  try {
    const folders = await folderService.getFolders();

    res.json({ data: folders });
  } catch (error) {
    next(error);
  }
}

export async function getFolderById(req, res, next) {
  try {
    const folder = await folderService.getFolderById(req.params.id);
    res.json({ data: folder });
  } catch (error) {
    next(error);
  }
}

export async function createFolder(req, res, next) {
  try {
    const folder = await folderService.createFolder(req.body.name);

    res.status(201).json({ data: folder });
  } catch (error) {
    next(error);
  }
}

export async function updateFolder(req, res, next) {
  try {
    const folder = await folderService.updateFolder(
      req.params.id,
      req.body.name,
    );

    res.json({ data: folder });
  } catch (error) {
    next(error);
  }
}

export async function deleteFolder(req, res, next) {
  try {
    await folderService.deleteFolder(req.params.id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
