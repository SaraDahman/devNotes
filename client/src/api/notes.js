import apiClient from "./client";

export async function getNotes(folderId) {
  const response = await apiClient.get("/notes", {
    params: folderId ? { folderId } : undefined,
  });

  return response.data.data;
}

export async function getFavoriteNotes() {
  const response = await apiClient.get("/notes", {
    params: { favorite: true },
  });

  return response.data.data;
}

export async function getOtherNotes() {
  const response = await apiClient.get("/notes/other");

  return response.data.data;
}

export async function getNote(id) {
  const response = await apiClient.get(`/notes/${id}`);

  return response.data.data;
}

export async function createNote(note) {
  const response = await apiClient.post("/notes", note);

  return response.data.data;
}

export async function updateNote(id, note) {
  const response = await apiClient.patch(`/notes/${id}`, note);

  return response.data.data;
}

export async function deleteNote(id) {
  await apiClient.delete(`/notes/${id}`);
}
