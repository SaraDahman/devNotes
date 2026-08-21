import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { useNoteDrawer } from "@/context/NoteDrawerContext";
import { useCreateNote, useUpdateNote } from "@/hooks/use-notes";

const noteSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export default function NoteDrawer() {
  const { open, note, folderId, closeDrawer } = useNoteDrawer();
  const createNote = useCreateNote();
  const updateNote = useUpdateNote();
  const isEditing = !!note;

  const form = useForm({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        title: note?.title || "",
        content: note?.content || "",
      });
    }
  }, [open, note]);

  const handleSave = (data) => {
    if (isEditing) {
      updateNote.mutate(
        { id: note.id, note: { ...data, folderId: note.folder_id } },
        { onSuccess: closeDrawer },
      );
    } else {
      createNote.mutate(
        { ...data, folderId },
        { onSuccess: closeDrawer },
      );
    }
  };

  return (
    <Drawer open={open} onOpenChange={closeDrawer} swipeDirection="right">
      <DrawerContent className="w-200 rounded-none! px-6 py-2">
        <DrawerHeader className="px-0">
          <div className="flex items-start justify-between gap-4">
            <Input
              {...form.register("title")}
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

        {isEditing && (
          <NoteDetailsRows
            folder={note.folder_name}
            date={formatDate(note.created_at)}
          />
        )}

        <div className="flex-1 overflow-y-auto mt-1">
          <NoteEditor
            content={form.getValues("content")}
            onChangeContent={(val) => form.setValue("content", val)}
          />
        </div>

        <DrawerFooter className="flex-row justify-end border-t border-border py-4">
          <DrawerClose variant="outline">Cancel</DrawerClose>
          <Button
            onClick={form.handleSubmit(handleSave)}
            disabled={createNote.isPending || updateNote.isPending || !form.watch("title") || !form.watch("content")}
          >
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
