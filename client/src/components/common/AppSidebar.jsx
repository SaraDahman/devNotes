import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
// import Workspaceswitcher from "../../../features/workspaces/components/Workspaceswitcher";
// import TeamsNav from "./TeamsNav";
// import TopNav from "./TopNav";
// import UserNav from "./UserNav";
import FoldersNav from "./FoldersNav";
import { Button } from "../ui/button";

export default function AppSidebar({ ...props }) {
  return (
    <Sidebar
      collapsible="offcanvas"
      {...props}
      className="overflow-hidden bg-background"
    >
      {/* <SidebarHeader>
        <h1 className="text-xl font-bold">Dev Notes</h1>
      </SidebarHeader> */}
      <SidebarContent>
        <FoldersNav />
      </SidebarContent>
      <SidebarFooter>
        <Button>Create Folder</Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
