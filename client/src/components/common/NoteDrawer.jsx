import { useState, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import NoteEditor from "./NoteEditor";
import { MoreHorizontal } from "lucide-react";
import NoteDetailsRows from "./NoteDetailsRows";
import { formatDate } from "@/lib/utils";

export default function NoteDrawer({ note, open, onOpenChange }) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  useEffect(() => {
    console.log(note);

    setTitle(note.title);
    setContent(note.content);
  }, [note]);

  const handleSave = () => {
    console.log("Saving note:", { ...note, title, content });
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange} swipeDirection="right">
      <DrawerContent className="w-200 rounded-none! px-6 py-2">
        <DrawerHeader className="px-0">
          <div className="flex items-start justify-between gap-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Untitled"
              className="h-auto border-none bg-transparent px-0 text-2xl font-bold text-foreground shadow-none focus-visible:ring-0 placeholder:text-muted-foreground"
            />
            <Button
              variant="ghost"
              size="icon"
              className="mt-1 h-8 w-8 shrink-0 rounded-full border border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </DrawerHeader>

        <NoteDetailsRows
          folder={note.folder_name}
          date={formatDate(note.created_at)}
        />

        <div className="flex-1 overflow-y-auto mt-1">
          <NoteEditor content={content} onChangeContent={setContent} />
        </div>

        <DrawerFooter className="flex-row justify-end border-t border-border py-4">
          <DrawerClose variant="outline">Cancel</DrawerClose>
          <Button onClick={handleSave}>Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
