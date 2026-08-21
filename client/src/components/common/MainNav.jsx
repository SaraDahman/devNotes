import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Star, NotebookPen, FolderX } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export default function MainNav() {
  const navigate = useNavigate();

  return (
    <SidebarGroup>
      {/* <SidebarGroupLabel>Folders</SidebarGroupLabel> */}
      <SidebarMenu>
        <SidebarMenuItem className="mb-1 flex justify-between items-center">
          <SidebarMenuButton
            onClick={() => navigate(`/notes/all`)}
            className={cn("flex gap-2 text-chart-5")}
          >
            <NotebookPen />
            <span>All Notes</span>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem className="mb-1 flex justify-between items-center">
          <SidebarMenuButton
            onClick={() => navigate(`/notes/favorite`)}
            className={cn("flex gap-2 text-chart-5")}
          >
            <Star />
            <span>Favorite notes</span>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem className="mb-1 flex justify-between items-center">
          <SidebarMenuButton
            onClick={() => navigate(`/notes/other`)}
            className={cn("flex gap-2 text-chart-5")}
          >
            <FolderX />
            <span>Other Notes</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
