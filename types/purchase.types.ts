import { PurchaseFormWrapper, PurchaseSchema } from "@/schemas/purchase.schema";
import { Timestamp } from "firebase/firestore";
import { SubmitHandler } from "react-hook-form";

export type PurchaseItem = {
  inventory_id: string;
  item_name: string;
  item_qty: string;
  item_price: string;
};

export type Purchases = {
  id: string;
  supplier_name: string;
  purchase_date: Timestamp;
  total_cost: string;
};

export interface PurchaseFormProps {
  form: PurchaseFormWrapper;
  onSubmit: SubmitHandler<PurchaseSchema>;
}
