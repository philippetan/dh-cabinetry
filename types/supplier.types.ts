import { SupplierFormWrapper, SupplierSchema } from "@/schemas/supplier.schema";
import { ReactNode } from "react";
import { SubmitHandler } from "react-hook-form";

export type Suppliers = {
  id: string;
  supplier_name: string;
  email_address: string;
  contact_number: string;
};

export interface SupplierFormProps {
  form: SupplierFormWrapper;
  onSubmit: SubmitHandler<SupplierSchema>;
}

export interface SupplierSheetProps {
  editId?: string;
  trigger?: ReactNode;
  title: string;
  description?: string;
  mode: "add" | "edit";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
