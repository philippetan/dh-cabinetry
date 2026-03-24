import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export const purchaseSchema = z.object({
  supplier_id: z.string().trim().min(1, "Supplier is required."),
  purchase_date: z.date(),
  items_purchased: z.array(
    z.object({
      inventory_id: z.string().trim().min(1, "Item is required."),
      item_qty: z.string().trim().min(1, "Quantity is required."),
      item_price: z.string().trim().min(1, "Price is required."),
    }),
  ),
});

export type PurchaseSchema = z.infer<typeof purchaseSchema>;

export const usePurchaseForm = () =>
  useForm<PurchaseSchema>({
    resolver: zodResolver(purchaseSchema),
    defaultValues: {
      supplier_id: "",
      purchase_date: new Date(),
      items_purchased: [
        {
          inventory_id: "",
          item_qty: "",
          item_price: "",
        },
      ],
    },
  });

export const purchaseFormWrapper = () => {
  const purchaseForm = usePurchaseForm();

  return {
    register: purchaseForm.register,
    handleSubmit: purchaseForm.handleSubmit,
    errors: purchaseForm.formState.errors,
    isSubmitting: purchaseForm.formState.isSubmitting,
    reset: purchaseForm.reset,
    setValue: purchaseForm.setValue,
    watch: purchaseForm.watch,
    control: purchaseForm.control,
  };
};

export type PurchaseFormWrapper = ReturnType<typeof purchaseFormWrapper>;
