import { useAllNotes } from "@/hooks/use-notes";
import NoteCard from "@/components/common/NoteCard";
import EmptyMessage from "@/components/common/EmptyMessage";

export default function AllNotesPage() {
  const { data: notes, isLoading } = useAllNotes();

  if (isLoading) {
    return <div className="text-muted-foreground">Loading notes...</div>;
  }

  if (!notes?.length) {
    return <EmptyMessage />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} showFolderBadge />
      ))}
    </div>
  );
}
