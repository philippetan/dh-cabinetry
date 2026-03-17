import React from "react";

export default function LoginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex w-full p-4 min-h-screen items-center justify-center max-w-xl mx-auto bg-app-background-light">
      {children}
    </div>
  );
}
