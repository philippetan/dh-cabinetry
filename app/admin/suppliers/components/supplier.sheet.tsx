"use client";

import CustomSheet from "@/components/custom/custom.sheet";
import SupplierForm from "@/components/forms/supplier.form";
import { supplierFormWrapper, SupplierSchema } from "@/schemas/supplier.schema";
import { addSupplier } from "@/services/supplier.services";
import { SupplierSheetProps } from "@/types/supplier.types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const SupplierSheet = ({
  editId,
  trigger,
  title,
  description,
  mode,
}: SupplierSheetProps) => {
  const form = supplierFormWrapper();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open]);

  const onSubmit = async (data: SupplierSchema) => {
    try {
      if (mode === "edit" && editId) {
      } else {
        await addSupplier(data);
        toast.success("Supplier saved successfully!");
      }
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error("Error saving supplier: ", error);
      toast.error("Failed to save supplier. Please try again.");
    }
  };

  return (
    <CustomSheet
      trigger={trigger}
      title={title}
      description={description}
      open={open}
      onOpenChange={setOpen}
      onCancel={() => form.reset()}
      formId="supplier-form"
      isSubmitting={form.isSubmitting}
    >
      <SupplierForm
        form={form}
        onSubmit={onSubmit}
      />
    </CustomSheet>
  );
};

export default SupplierSheet;
