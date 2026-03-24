import {
  InventoryFormWrapper,
  InventorySchema,
} from "@/schemas/inventory.schema";
import { ReactNode } from "react";
import { SubmitHandler } from "react-hook-form";

export interface InventoryFormProps {
  form: InventoryFormWrapper;
  onSubmit: SubmitHandler<InventorySchema>;
}

export interface InventorySheetProps {
  editId?: string;
  trigger: ReactNode;
  title: string;
  description?: string;
  mode: "add" | "edit";
}
