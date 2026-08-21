import { useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Star } from "lucide-react";

import FoldersNav from "./FoldersNav";
import MainNav from "./MainNav";
import CreateFolderDialog from "./CreateFolderDialog";

export default function AppSidebar({ ...props }) {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <Sidebar
      collapsible="offcanvas"
      {...props}
      className="overflow-hidden bg-background"
    >
      {/* <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="flex gap-2 text-chart-5">
              <Star size={4} />
              <span>Favorite</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader> */}
      <SidebarContent>
        <MainNav />
        <FoldersNav />
      </SidebarContent>
      <SidebarFooter>
        <CreateFolderDialog />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
