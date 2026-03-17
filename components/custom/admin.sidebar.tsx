"use client";

import { Button } from "../ui/button";
import {
  Box,
  Building,
  ChartNoAxesCombined,
  CircleDollarSign,
  ClipboardList,
  Handbag,
  LayoutDashboard,
  LogOut,
  ScrollText,
  ShieldUser,
  StickyNote,
  Users,
} from "lucide-react";
import { Label } from "../ui/label";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/config/FirebaseConfig";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut(auth);
    document.cookie = "session=; path=/; max-age=0";
    router.push("/login");
  };

  return (
    <div className="flex flex-col w-52 space-y-10">
      <div>
        <Label>DAZZLING HOME</Label>
      </div>

      <div className="w-full space-y-2">
        <Button
          variant={pathname.includes("/dashboard") ? "default" : "ghost"}
          className="cursor-pointer w-full justify-start"
          onClick={() => router.push("/admin/dashboard")}
        >
          <LayoutDashboard /> Dashboard
        </Button>

        <Button
          variant={pathname.includes("/clients") ? "default" : "ghost"}
          className="cursor-pointer w-full justify-start"
          onClick={() => router.push("/admin/clients")}
        >
          <Users /> Clients
        </Button>

        <Button
          variant={pathname.includes("/projects") ? "default" : "ghost"}
          className="cursor-pointer w-full justify-start"
          onClick={() => router.push("/admin/projects")}
        >
          <ClipboardList /> Projects
        </Button>

        <Button
          variant={pathname.includes("/inventory") ? "default" : "ghost"}
          className="cursor-pointer w-full justify-start"
          onClick={() => router.push("/admin/inventory")}
        >
          <Box /> Inventory
        </Button>

        <Button
          variant={pathname.includes("/purchases") ? "default" : "ghost"}
          className="cursor-pointer w-full justify-start"
          onClick={() => router.push("/admin/purchases")}
        >
          <Handbag /> Purchases
        </Button>

        <Button
          variant={pathname.includes("/expenses") ? "default" : "ghost"}
          className="cursor-pointer w-full justify-start"
          onClick={() => router.push("/admin/expenses")}
        >
          <CircleDollarSign /> Expenses
        </Button>

        <Button
          variant={pathname.includes("/sales") ? "default" : "ghost"}
          className="cursor-pointer w-full justify-start"
          onClick={() => router.push("/admin/sales")}
        >
          <ChartNoAxesCombined /> Sales
        </Button>

        <Button
          variant={pathname.includes("/suppliers") ? "default" : "ghost"}
          className="cursor-pointer w-full justify-start"
          onClick={() => router.push("/admin/suppliers")}
        >
          <Building /> Suppliers
        </Button>

        <Button
          variant={pathname.includes("/reports") ? "default" : "ghost"}
          className="cursor-pointer w-full justify-start"
          onClick={() => router.push("/admin/reports")}
        >
          <ScrollText /> Reports
        </Button>

        <Button
          variant={pathname.includes("/admins") ? "default" : "ghost"}
          className="cursor-pointer w-full justify-start"
          onClick={() => router.push("/admin/admins")}
        >
          <ShieldUser /> Admins
        </Button>
      </div>

      <div className="w-full">
        <Button
          variant="outline"
          className="w-full justify-start cursor-pointer"
          onClick={handleLogout}
        >
          Logout <LogOut />
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
