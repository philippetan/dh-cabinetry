import { PurchaseFormWrapper, PurchaseSchema } from "@/schemas/purchase.schema";
import { SubmitHandler } from "react-hook-form";

export interface PurchaseFormProps {
  form: PurchaseFormWrapper;
  onSubmit: SubmitHandler<PurchaseSchema>;
}
