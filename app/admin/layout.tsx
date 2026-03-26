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
        <div className="p-4 md:p-6 lg:p-8">
          <Sidebar />
        </div>

        <Separator orientation="vertical" />

        <main className="flex-1 overflow-y-auto px-4 md:px-6 lg:px-8 pt-4 md:pt-6 lg:pt-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="min-h-full pb-4 md:pb-6 lg:pb-8 flex flex-col">
            {children}
          </div>
        </main>
      </div>
    </AuthProvider>
  );
}
