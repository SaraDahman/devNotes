import { Router } from "express";

import {
  getNotes,
  getOtherNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/note.controller.js";

const router = Router();

router.get("/", getNotes);
router.get("/other", getOtherNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.patch("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
