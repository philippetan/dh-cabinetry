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
  Users,
} from "lucide-react";
import { Label } from "../ui/label";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/config/FirebaseConfig";

const buttons = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard />,
    pathname: "/admin/dashboard",
  },
  {
    label: "Clients",
    icon: <Users />,
    pathname: "/admin/clients",
  },
  {
    label: "Projects",
    icon: <ClipboardList />,
    pathname: "/admin/projects",
  },
  {
    label: "Inventory",
    icon: <Box />,
    pathname: "/admin/inventory",
  },
  {
    label: "Purchases",
    icon: <Handbag />,
    pathname: "/admin/purchases",
  },
  {
    label: "Expenses",
    icon: <CircleDollarSign />,
    pathname: "/admin/expenses",
  },
  {
    label: "Sales",
    icon: <ChartNoAxesCombined />,
    pathname: "/admin/sales",
  },
  {
    label: "Suppliers",
    icon: <Building />,
    pathname: "/admin/suppliers",
  },
  { label: "Reports", icon: <ScrollText />, pathname: "/admin/reports" },
  { label: "Admins", icon: <ShieldUser />, pathname: "/admin/admins" },
];

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
        {buttons.map((button) => (
          <Button
            key={button.pathname}
            variant={pathname.includes(button.pathname) ? "default" : "ghost"}
            className="cursor-pointer w-full justify-start"
            onClick={() => router.push(button.pathname)}
          >
            {button.icon} {button.label}
          </Button>
        ))}
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
