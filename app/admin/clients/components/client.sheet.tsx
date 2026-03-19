"use client";

import CustomButton from "@/components/custom/custom.button";
import ClientForm from "@/components/forms/client.form";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { db } from "@/config/FirebaseConfig";
import { clientFormWrapper, ClientSchema } from "@/schemas/client.schema";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { ReactNode } from "react";
import { toast } from "sonner";
import { ulid } from "ulid";

interface ClientSheetProps {
  trigger: ReactNode;
  title: string;
  description?: string;
}

const ClientSheet = ({ trigger, title, description }: ClientSheetProps) => {
  const form = clientFormWrapper();

  const onSubmit = async (data: ClientSchema) => {
    try {
      const id = ulid();

      await setDoc(doc(db, "clients", id), {
        ...data,
        created_at: serverTimestamp(),
        updated_at: null,
        deleted_at: null,
      });

      toast.success("Client saved successfully!");
      form.reset();
    } catch (error) {
      console.error("Error saving client:", error);
      toast.error("Failed to save client. Please try again.");
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="sm:max-w-md!">
        <SheetHeader>
          <SheetTitle className="font-bold">{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        <div className="px-4">
          <ClientForm
            form={form}
            onSubmit={onSubmit}
          />
        </div>

        <SheetFooter>
          <CustomButton
            type="submit"
            form="client-form"
            label="Save"
            loading={form.isSubmitting}
            size="lg"
          />

          <SheetClose asChild>
            <CustomButton
              variant="outline"
              label="Cancel"
              size="lg"
              onClick={() => form.reset()}
            />
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ClientSheet;
