import { useState, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import NoteEditor from "./NoteEditor";

export default function NoteDrawer({ note, open, onOpenChange }) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
  }, [note]);

  const handleSave = () => {
    console.log("Saving note:", { ...note, title, content });
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange} swipeDirection="right">
      <DrawerContent className="w-200 rounded-none!">
        <DrawerHeader>
          <DrawerTitle>
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent outline-none font-heading text-3xl font-medium"
            />
          </DrawerTitle>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-4 mt-1">
          <NoteEditor content={content} onChange={setContent} />
        </div>

        <DrawerFooter className="flex-row justify-end">
          <DrawerClose>Cancel</DrawerClose>
          <Button size="sm" onClick={handleSave}>
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
