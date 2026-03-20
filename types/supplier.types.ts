import { SupplierFormWrapper, SupplierSchema } from "@/schemas/supplier.schema";
import { ReactNode } from "react";
import { SubmitHandler } from "react-hook-form";

export interface SupplierFormProps {
  form: SupplierFormWrapper;
  onSubmit: SubmitHandler<SupplierSchema>;
}

export interface SupplierSheetProps {
  editId?: string;
  trigger: ReactNode;
  title: string;
  description?: string;
  mode: "add" | "edit";
}
