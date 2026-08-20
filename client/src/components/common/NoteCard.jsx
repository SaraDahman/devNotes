import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import NoteDrawer from "./NoteDrawer";
import DeleteAlert from "./DeleteAlert";

export default function NoteCard({ note }) {
  const [open, setOpen] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleDelete = () => {
    console.log("Deleting note:", note.id);
  };

  return (
    <>
      <Card
        className="relative cursor-pointer transition-colors hover:bg-accent/50"
        onClick={() => setOpen(true)}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8 text-muted-foreground hover:text-destructive"
          onClick={(e) => {
            e.stopPropagation();
            setShowDelete(true);
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>

        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-3">{note.content}</p>
        </CardContent>
      </Card>

      <NoteDrawer note={note} open={open} onOpenChange={setOpen} />
      <DeleteAlert
        open={showDelete}
        onOpenChange={setShowDelete}
        onConfirm={handleDelete}
      />
    </>
  );
}
