import { createContext, useContext, useState } from "react";

const NoteDrawerContext = createContext(null);

export function NoteDrawerProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState(null);
  const [folderId, setFolderId] = useState(null);

  const openDrawer = (noteToEdit = null, folderIdForCreate = null) => {
    setNote(noteToEdit);
    setFolderId(folderIdForCreate);
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
    setNote(null);
    setFolderId(null);
  };

  return (
    <NoteDrawerContext.Provider value={{ open, note, folderId, openDrawer, closeDrawer }}>
      {children}
    </NoteDrawerContext.Provider>
  );
}

export function useNoteDrawer() {
  const context = useContext(NoteDrawerContext);
  if (!context) {
    throw new Error("useNoteDrawer must be used within a NoteDrawerProvider");
  }
  return context;
}
