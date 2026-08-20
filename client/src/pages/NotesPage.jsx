import NoteCard from "@/components/common/NoteCard";

const mockNotes = [
  {
    id: 1,
    title: "First Note",
    content: "This is the content of the first note.",
  },
  {
    id: 2,
    title: "Second Note",
    content: "This is the content of the second note.",
  },
  {
    id: 3,
    title: "Third Note",
    content: "This is the content of the third note.",
  },
];

export default function NotesPage() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {mockNotes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}
