import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export const inventorySchema = z.object({
  item_name: z.string().trim().min(1, "Material name is required."),
  item_unit: z.string().trim().min(1, "Unit is required."),
  item_stock: z.number().min(0, "Item stock is required."),
  item_price: z.string().trim().min(1, "Price is required."),
});

export type InventorySchema = z.infer<typeof inventorySchema>;

export const useInventoryForm = () =>
  useForm<InventorySchema>({
    resolver: zodResolver(inventorySchema),
    defaultValues: {
      item_name: "",
      item_unit: "",
      item_stock: 0,
      item_price: "",
    },
  });

export const inventoryFormWrapper = () => {
  const inventoryForm = useInventoryForm();

  return {
    register: inventoryForm.register,
    handleSubmit: inventoryForm.handleSubmit,
    errors: inventoryForm.formState.errors,
    isSubmitting: inventoryForm.formState.isSubmitting,
    reset: inventoryForm.reset,
    setValue: inventoryForm.setValue,
  };
};

export type InventoryFormWrapper = ReturnType<typeof inventoryFormWrapper>;
