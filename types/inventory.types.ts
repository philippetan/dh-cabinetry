import {
  InventoryFormWrapper,
  InventorySchema,
} from "@/schemas/inventory.schema";
import { ReactNode } from "react";
import { SubmitHandler } from "react-hook-form";

export type Inventory = {
  id: string;
  item_name: string;
  item_unit: string;
  item_stock: number;
};

export interface InventoryFormProps {
  form: InventoryFormWrapper;
  onSubmit: SubmitHandler<InventorySchema>;
}

export interface InventorySheetProps {
  editId?: string;
  trigger?: ReactNode;
  title: string;
  description?: string;
  mode: "add" | "edit";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface InventoryData {
  item_id: string;
  item_name: string;
  item_unit: string;
  item_stock: number;
  item_price: string;
}

export interface Purchase {
  id: string;
  purchase_date: any;
  supplier_id: string;
  total_cost: string;
  item_qty: string;
  item_price: string;
}

export interface ProjectUsed {
  id: string;
  project_name: string;
  start_date: any;
  item_qty: string;
  item_price: string;
  item_name: string;
}
