import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFolders, useDeleteFolder } from "@/hooks/use-folders";

const FolderContext = createContext(null);

export function FolderProvider({ children }) {
  const { data: folders, isLoading } = useFolders();
  const deleteFolder = useDeleteFolder();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeFolderId = searchParams.get("folder");

  useEffect(() => {
    if (activeFolderId && folders?.length) {
      const exists = folders.some((f) => f.id == activeFolderId);
      if (!exists) {
        navigate(`/notes?folder=${folders[0].id}`, { replace: true });
      }
    }
  }, [activeFolderId, folders, navigate]);

  const handleDeleteFolder = (folderId, callback) => {
    deleteFolder.mutate(folderId, {
      onSuccess: () => {
        callback?.();
      },
    });
  };

  return (
    <FolderContext.Provider
      value={{ folders, isLoading, activeFolderId, handleDeleteFolder }}
    >
      {children}
    </FolderContext.Provider>
  );
}

export function useFolderContext() {
  const context = useContext(FolderContext);
  if (!context) {
    throw new Error("useFolderContext must be used within a FolderProvider");
  }
  return context;
}
