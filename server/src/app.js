import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middleware/error-handler.middleware.js";
import folderRoutes from "./routes/folder.routes.js";
import noteRoutes from "./routes/note.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/folders", folderRoutes);
app.use("/api/notes", noteRoutes);

app.use(errorMiddleware);

export default app;
