import Sidebar from "@/components/custom/admin.sidebar";
import { Separator } from "@/components/ui/separator";
import { AuthProvider } from "@/context/auth.context";
import { ReactNode } from "react";

export default function AdminLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <AuthProvider>
      <div className="flex flex-row h-screen w-full max-w-7xl mx-auto">
        <div className="p-8">
          <Sidebar />
        </div>

        <Separator orientation="vertical" />

        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </AuthProvider>
  );
}
