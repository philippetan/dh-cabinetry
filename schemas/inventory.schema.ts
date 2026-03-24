import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export const inventorySchema = z.object({
  item_name: z.string().trim().min(1, "Item name is required."),
  item_unit: z.string().trim().min(1, "Item unit is required."),
  item_stock: z.string().trim().min(1, "Item stock is required."),
});

export type InventorySchema = z.infer<typeof inventorySchema>;

export const useInventoryForm = () =>
  useForm<InventorySchema>({
    resolver: zodResolver(inventorySchema),
    defaultValues: {
      item_name: "",
      item_unit: "",
      item_stock: "",
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
  };
};

export type InventoryFormWrapper = ReturnType<typeof inventoryFormWrapper>;
