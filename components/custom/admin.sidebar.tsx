"use client";

import { Button } from "../ui/button";
import { LayoutDashboard, Users } from "lucide-react";
import { Label } from "../ui/label";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-52 space-y-10">
      <div>
        <Label>DAZZLING HOME</Label>
      </div>

      <div className="w-full space-y-2">
        <Button
          variant={pathname.includes("/dashboard") ? "default" : "ghost"}
          className="cursor-pointer w-full justify-start"
        >
          <LayoutDashboard /> Dashboard
        </Button>

        <Button
          variant={pathname.includes("/clients") ? "default" : "ghost"}
          className="cursor-pointer w-full justify-start"
        >
          <Users /> Clients
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
