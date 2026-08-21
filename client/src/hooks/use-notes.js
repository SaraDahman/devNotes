import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getNotes,
  getNote,
  getFavoriteNotes,
  getOtherNotes,
  createNote,
  updateNote,
  deleteNote,
} from "@/api/notes";

export function useNotes(folderId) {
  return useQuery({
    queryKey: ["notes", { folderId }],
    queryFn: () => getNotes(folderId),
  });
}

export function useAllNotes() {
  return useQuery({
    queryKey: ["notes"],
    queryFn: () => getNotes(),
  });
}

export function useFavoriteNotes() {
  return useQuery({
    queryKey: ["notes", "favorites"],
    queryFn: getFavoriteNotes,
  });
}

export function useOtherNotes() {
  return useQuery({
    queryKey: ["notes", "other"],
    queryFn: getOtherNotes,
  });
}

export function useNote(id) {
  return useQuery({
    queryKey: ["notes", id],
    queryFn: () => getNote(id),
    enabled: Boolean(id),
  });
}

export function useCreateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNote,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });
}

export function useUpdateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, note }) => updateNote(id, note),

    onSuccess: (updatedNote) => {
      queryClient.setQueryData(["notes", updatedNote.id], updatedNote);

      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });
}

export function useDeleteNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNote,

    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({
        queryKey: ["notes", deletedId],
      });

      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });
}
