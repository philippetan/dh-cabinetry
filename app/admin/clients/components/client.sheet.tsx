import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ReactNode } from "react";

interface ClientSheetProps {
  trigger: ReactNode;
  title: string;
  description?: string;
}

const ClientSheet = ({ trigger, title, description }: ClientSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        <div className="px-4">
          <Label>Sample label</Label>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ClientSheet;
