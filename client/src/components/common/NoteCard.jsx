import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Star } from "lucide-react";
import { stripHtml, fromNow } from "@/lib/utils";
import DeleteAlert from "./DeleteAlert";
import { cn } from "@/lib/utils";
import { useDeleteNote, useUpdateNote } from "@/hooks/use-notes";
import { useNoteDrawer } from "@/context/NoteDrawerContext";

export default function NoteCard({ note, showFolderBadge = false }) {
  const [showDelete, setShowDelete] = useState(false);
  const deleteNote = useDeleteNote();
  const updateNote = useUpdateNote();
  const { openDrawer } = useNoteDrawer();

  const handleDelete = () => {
    deleteNote.mutate(note.id, {
      onSuccess: () => setShowDelete(false),
    });
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    updateNote.mutate({
      id: note.id,
      note: { ...note, folderId: note.folder_id, favorite: !note.favorite },
    });
  };

  return (
    <>
      <Card
        className="flex flex-col cursor-pointer transition-colors hover:bg-accent/50 p-3"
        onClick={() => openDrawer(note)}
      >
        <CardHeader className="p-0 flex items-center justify-between">
          <CardTitle className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={handleToggleFavorite}
            >
              <Star
                className="w-4 h-4"
                fill={note.favorite ? "currentColor" : "none"}
              />
            </Button>
            {note.title}
          </CardTitle>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              setShowDelete(true);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <p className="text-muted-foreground line-clamp-2">
            {stripHtml(note.content)}
          </p>
        </CardContent>
        <div className="mt-auto flex justify-between">
          {showFolderBadge && (
            <Badge
              variant="secondary"
              className={cn(
                note.folder_name && "bg-sky-50 text-sky-700",
                "max-w-40 inline-block! truncate",
              )}
            >
              {note.folder_name || "unclassified"}
            </Badge>
          )}
          <span className="text-xs text-muted-foreground">
            {fromNow(note.created_at)}
          </span>
        </div>
      </Card>

      <DeleteAlert
        open={showDelete}
        onOpenChange={setShowDelete}
        onConfirm={handleDelete}
      />
    </>
  );
}
