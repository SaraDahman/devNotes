import { Router } from "express";

import {
  getFolders,
  getFolderById,
  createFolder,
  updateFolder,
  deleteFolder,
} from "../controllers/folder.controller.js";

const router = Router();

router.get("/", getFolders);
router.get("/:id", getFolderById);
router.post("/", createFolder);
router.patch("/:id", updateFolder);
router.delete("/:id", deleteFolder);

export default router;
