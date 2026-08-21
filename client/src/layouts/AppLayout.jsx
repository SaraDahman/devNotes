import AppSidebar from "@/components/common/AppSidebar";
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  SidebarInset,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";
import { PanelLeft, Plus } from "lucide-react";
import { FolderProvider } from "@/context/FolderContext";

function HeaderSidebarToggle() {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
      aria-label="Toggle sidebar"
      className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground cursor-pointer"
    >
      <PanelLeft className="h-5 w-5" />
    </Button>
  );
}

export default function AppLayout() {
  return (
    <FolderProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 flex h-12 shrink-0 items-center gap-3 border-b border-border px-4">
            <HeaderSidebarToggle />
            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" className="h-8 gap-1.5">
                <Plus className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">New Note</span>
              </Button>
            </div>
          </header>
          <div className="p-4">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </FolderProvider>
  );
}
