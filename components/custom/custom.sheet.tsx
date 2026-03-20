"use client";

import CustomButton from "@/components/custom/custom.button";
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
import { ReactNode } from "react";

interface CustomSheetProps {
  trigger: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onCancel?: () => void;
  saveLabel?: string;
  isSubmitting?: boolean;
  formId?: string;
  className?: string;
}

const CustomSheet = ({
  trigger,
  title,
  description,
  children,
  open,
  onOpenChange,
  onCancel,
  saveLabel = "Save",
  isSubmitting,
  formId,
  className = "sm:max-w-xl!",
}: CustomSheetProps) => {
  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className={className}>
        <SheetHeader>
          <SheetTitle className="font-bold">{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className="px-4">{children}</div>
        <SheetFooter>
          <CustomButton
            type="submit"
            form={formId}
            label={saveLabel}
            loading={isSubmitting}
            size="lg"
          />
          <SheetClose asChild>
            <CustomButton
              variant="outline"
              label="Cancel"
              size="lg"
              onClick={onCancel}
              loading={isSubmitting}
              showSpinner={false}
            />
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CustomSheet;
