import Sidebar from "@/components/custom/admin.sidebar";
import { AuthProvider } from "@/context/auth.context";
import { ReactNode } from "react";

export default function AdminLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <AuthProvider>
      <div className="flex flex-row gap-10 p-8 w-full max-w-7xl mx-auto">
        <div>
          <Sidebar />
        </div>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </AuthProvider>
  );
}
