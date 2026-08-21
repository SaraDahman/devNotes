import { FileText } from "lucide-react";

export default function EmptyMessage() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] text-center">
      <FileText size={50} className="text-muted-foreground" />
      <h2 className="mt-4 text-lg font-medium">No note available for this list</h2>
      <p className="text-muted-foreground">Create a new note and add it to any of your folders</p>
    </div>
  );
}
