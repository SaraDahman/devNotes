import path from "path";
import { fileURLToPath } from "node:url";
import express from "express";
import cors from "cors";
import env from "./config/env.js";
import { errorMiddleware } from "./middleware/error-handler.middleware.js";
import folderRoutes from "./routes/folder.routes.js";
import noteRoutes from "./routes/note.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

if (env.nodeEnv === "production") {
  const clientDist = path.join(__dirname, "../../client/dist");

  app.use(express.static(clientDist));
  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

app.use("/api/folders", folderRoutes);
app.use("/api/notes", noteRoutes);

app.use(errorMiddleware);

export default app;
