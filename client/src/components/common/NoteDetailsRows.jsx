import { CalendarDays, Folder } from "lucide-react";

export default function NoteDetailsRows({
  date = "1/1/2025",
  folder = "react",
}) {
  return (
    <div>
      <div className="flex items-center gap-3 border-b border-border py-3 text-sm">
        <div className="flex w-28 shrink-0 items-center gap-2 text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          <span>Date</span>
        </div>
        <div className="h-auto border-none bg-transparent px-0 text-sm font-medium text-foreground underline decoration-muted-foreground/50 underline-offset-4 shadow-none focus-visible:ring-0">
          {date}
        </div>
      </div>
      <div className="flex items-center gap-3 border-b border-border py-3 text-sm">
        <div className="flex w-28 shrink-0 items-center gap-2 text-muted-foreground">
          <Folder className="h-4 w-4" />
          <span>Folder</span>
        </div>
        <div className="h-auto border-none bg-transparent px-0 text-sm font-medium text-foreground underline decoration-muted-foreground/50 underline-offset-4 shadow-none focus-visible:ring-0">
          {folder}
        </div>
      </div>
    </div>
  );
}
