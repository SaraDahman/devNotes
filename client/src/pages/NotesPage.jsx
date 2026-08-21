import { useSearchParams } from "react-router-dom";
import { useNotes } from "@/hooks/use-notes";
import NoteCard from "@/components/common/NoteCard";
import EmptyMessage from "@/components/common/EmptyMessage";

export default function NotesPage() {
  const [searchParams] = useSearchParams();
  const folderId = searchParams.get("folder");
  const { data: notes, isLoading } = useNotes(folderId);

  if (isLoading) {
    return <div className="text-muted-foreground">Loading notes...</div>;
  }

  if (!notes?.length) {
    return <EmptyMessage />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}
