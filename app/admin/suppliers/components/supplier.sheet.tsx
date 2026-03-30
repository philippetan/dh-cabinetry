"use client";

import CustomSheet from "@/components/custom/custom.sheet";
import SupplierForm from "@/components/forms/supplier.form";
import { supplierFormWrapper, SupplierSchema } from "@/schemas/supplier.schema";
import {
  addSupplier,
  fetchSupplierById,
  updateSupplier,
} from "@/services/supplier.services";
import { SupplierSheetProps } from "@/types/supplier.types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const SupplierSheet = ({
  editId,
  trigger,
  title,
  description,
  mode,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: SupplierSheetProps) => {
  const [internalOpen, setInternalOpen] = useState<boolean>(false);

  const open = controlledOpen ?? internalOpen;
  const onOpenChange = controlledOnOpenChange ?? setInternalOpen;

  const form = supplierFormWrapper();

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open]);

  useEffect(() => {
    if (mode !== "edit" || !editId || !open) return;
    const fetchSupplier = async () => {
      try {
        const supplierData = await fetchSupplierById(editId);
        if (!supplierData) return;

        form.reset({
          name: supplierData.name || "",
          email_address: supplierData.email_address || "",
          contact_number: supplierData.contact_number || "",
          address: {
            block_house_number: supplierData.address?.block_house_number || "",
            street_name: supplierData.address?.street_name || "",
            unit_number: supplierData.address?.unit_number || "",
            floor_number: supplierData.address?.floor_number || "",
            postal_code: supplierData.address?.postal_code || "",
            building_name: supplierData.address?.building_name || "",
          },
        });
      } catch (error) {
        toast.error("Failed to load client data.");
      }
    };
    fetchSupplier();
  }, [mode, editId, open]);

  const onSubmit = async (data: SupplierSchema) => {
    try {
      if (mode === "edit" && editId) {
        await updateSupplier(editId, data);
        toast.success("Supplier updated successfully!");
      } else {
        await addSupplier(data);
        toast.success("Supplier saved successfully!");
      }
      form.reset();
      onOpenChange(false);
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
      onOpenChange={onOpenChange}
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
