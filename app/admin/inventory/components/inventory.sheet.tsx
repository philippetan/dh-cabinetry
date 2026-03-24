"use client";

import CustomSheet from "@/components/custom/custom.sheet";
import InventoryForm from "@/components/forms/inventory.form";
import {
  inventoryFormWrapper,
  InventorySchema,
} from "@/schemas/inventory.schema";
import { addInventory } from "@/services/inventory.services";
import { InventorySheetProps } from "@/types/inventory.types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const InventorySheet = ({
  editId,
  trigger,
  title,
  description,
  mode,
  open,
  onOpenChange,
}: InventorySheetProps) => {
  const form = inventoryFormWrapper();

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open]);

  const onSubmit = async (data: InventorySchema) => {
    try {
      await addInventory(data);
      toast.success("Item saved successfully!");
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
