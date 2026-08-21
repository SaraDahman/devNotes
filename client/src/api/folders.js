import apiClient from "./client";

export async function getFolders() {
  const response = await apiClient.get("/folders");

  return response.data.data;
}

export async function getFolder(id) {
  const response = await apiClient.get(`/folders/${id}`);

  return response.data.data;
}

export async function createFolder(name) {
  const response = await apiClient.post("/folders", {
    name,
  });

  return response.data.data;
}

export async function updateFolder(id, name) {
  const response = await apiClient.patch(`/folders/${id}`, {
    name,
  });

  return response.data.data;
}

export async function deleteFolder(id) {
  await apiClient.delete(`/folders/${id}`);
}
