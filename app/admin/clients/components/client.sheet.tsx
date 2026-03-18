"use client";

import ClientForm from "@/components/forms/client.form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ClientSchema } from "@/schemas/client.schema";
import { ReactNode } from "react";

interface ClientSheetProps {
  trigger: ReactNode;
  title: string;
  description?: string;
}

const ClientSheet = ({ trigger, title, description }: ClientSheetProps) => {
  const onSubmit = async (data: ClientSchema) => {
    console.log("Submitted");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>

      <SheetContent
      //   className="!w-full sm:!max-w-2xl"
      >
        <SheetHeader>
          <SheetTitle className="font-bold">{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        <div className="px-4">
          <ClientForm
            onSubmit={onSubmit}
            mode="sheet"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ClientSheet;
