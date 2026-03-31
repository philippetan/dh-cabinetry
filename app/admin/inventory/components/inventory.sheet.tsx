"use client";

import CustomSheet from "@/components/custom/custom.sheet";
import InventoryForm from "@/components/forms/inventory.form";
import {
  inventoryFormWrapper,
  InventorySchema,
} from "@/schemas/inventory.schema";
import {
  addMaterial,
  fetchInventoryById,
  updateMaterial,
} from "@/services/inventory.services";
import { InventorySheetProps } from "@/types/inventory.types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const InventorySheet = ({
  editId,
  trigger,
  title,
  description,
  mode,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: InventorySheetProps) => {
  const [internalOpen, setInternalOpen] = useState<boolean>(false);

  const open = controlledOpen ?? internalOpen;
  const onOpenChange = controlledOnOpenChange ?? setInternalOpen;

  const form = inventoryFormWrapper();

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open]);

  useEffect(() => {
    if (mode !== "edit" || !editId || !open) return;

    const fetchInventory = async () => {
      try {
        const inventoryData = await fetchInventoryById(editId);
        if (!inventoryData) return;

        form.reset({
          item_name: inventoryData.item_name || "",
          item_unit: inventoryData.item_unit || "",
          item_price: inventoryData.item_price || "",
          item_stock: inventoryData.item_stock || "",
        });
      } catch (error) {
        console.error("Failed to load inventory data: ", error);
        toast.error("Failed to load inventory data.");
      }
    };
    fetchInventory();
  }, [mode, editId, open]);

  const onSubmit = async (data: InventorySchema) => {
    try {
      if (mode === "edit" && editId) {
        await updateMaterial(editId, data);
        toast.success("Material updated successfully!");
      } else {
        await addMaterial(data);
        toast.success("Material saved successfully!");
      }
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving item to inventory: ", error);
      toast.error("Failed to save item to inventory. Please try again.");
    }
  };

  return (
    <CustomSheet
      trigger={trigger}
      title={title}
      description={description}
      open={open}
      onOpenChange={onOpenChange}
      onCancel={() => form.reset()}
      formId="inventory-form"
      isSubmitting={form.isSubmitting}
    >
      <InventoryForm
        form={form}
        onSubmit={onSubmit}
      />
    </CustomSheet>
  );
};

export default InventorySheet;
