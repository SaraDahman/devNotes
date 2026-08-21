import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Folder, Trash2 } from "lucide-react";
import { useFolderContext } from "@/context/FolderContext";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import DeleteAlert from "./DeleteAlert";

export default function FoldersNav() {
  const { folders, isLoading, activeFolderId, handleDeleteFolder } =
    useFolderContext();
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = () => {
    handleDeleteFolder(deleteId, () => setDeleteId(null));
  };

  if (isLoading) return null;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Folders</SidebarGroupLabel>
      <SidebarMenu>
        {folders?.length ? (
          folders?.map((folder) => (
            <SidebarMenuItem
              key={folder.id}
              className="mb-1 flex justify-between items-center"
            >
              <SidebarMenuButton
                isActive={activeFolderId == folder.id}
                onClick={() => navigate(`/notes?folder=${folder.id}`)}
                className={cn("flex gap-2 text-chart-5")}
              >
                <Folder />
                <span>{folder.name}</span>
              </SidebarMenuButton>

              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-muted-foreground hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteId(folder.id);
                }}
              >
                <Trash2 size={2} />
              </Button>
            </SidebarMenuItem>
          ))
        ) : (
          <div className="text-xs text-chart-2 capitalize px-2 flex items-center justify-center">
            no folders added
          </div>
        )}
      </SidebarMenu>

      <DeleteAlert
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </SidebarGroup>
  );
}
