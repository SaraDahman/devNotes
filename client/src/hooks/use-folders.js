import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getFolders,
  getFolder,
  createFolder,
  updateFolder,
  deleteFolder,
} from "@/api/folders";

export function useFolders() {
  return useQuery({
    queryKey: ["folders"],
    queryFn: getFolders,
  });
}

export function useFolder(id) {
  return useQuery({
    queryKey: ["folders", id],
    queryFn: () => getFolder(id),
    enabled: Boolean(id),
  });
}

export function useCreateFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFolder,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["folders"],
      });
    },
  });
}

export function useUpdateFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, name }) => updateFolder(id, name),

    onSuccess: (updatedFolder) => {
      queryClient.setQueryData(["folders", updatedFolder.id], updatedFolder);

      queryClient.invalidateQueries({
        queryKey: ["folders"],
      });
    },
  });
}

export function useDeleteFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFolder,

    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({
        queryKey: ["folders", deletedId],
      });

      queryClient.invalidateQueries({
        queryKey: ["folders"],
      });

      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });
}
