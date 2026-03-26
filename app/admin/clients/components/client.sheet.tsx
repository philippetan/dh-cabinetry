"use client";

import ClientForm from "@/components/forms/client.form";
import CustomSheet from "@/components/custom/custom.sheet";
import { clientFormWrapper, ClientSchema } from "@/schemas/client.schema";
import {
  addClient,
  fetchClientById,
  updateClient,
} from "@/services/client.services";
import { ClientSheetProps } from "@/types/client.types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ClientSheet = ({
  editId,
  trigger,
  title,
  description,
  mode,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: ClientSheetProps) => {
  const [internalOpen, setInternalOpen] = useState<boolean>(false);

  const open = controlledOpen ?? internalOpen;
  const onOpenChange = controlledOnOpenChange ?? setInternalOpen;

  const form = clientFormWrapper();

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open]);

  useEffect(() => {
    if (mode !== "edit" || !editId || !open) return;
    const fetchClient = async () => {
      try {
        const clientData = await fetchClientById(editId);
        if (!clientData) return;
        form.reset({
          first_name: clientData.first_name || "",
          last_name: clientData.last_name || "",
          email_address: clientData.email_address || "",
          contact_number: clientData.contact_number || "",
          address: {
            block_house_number: clientData.address?.block_house_number || "",
            street_name: clientData.address?.street_name || "",
            unit_number: clientData.address?.unit_number || "",
            floor_number: clientData.address?.floor_number || "",
            postal_code: clientData.address?.postal_code || "",
            building_name: clientData.address?.building_name || "",
          },
        });
      } catch (error) {
        toast.error("Failed to load client data.");
      }
    };
    fetchClient();
  }, [mode, editId, open]);

  const onSubmit = async (data: ClientSchema) => {
    try {
      if (mode === "edit" && editId) {
        await updateClient(editId, data);
        toast.success("Client updated successfully!");
      } else {
        await addClient(data);
        toast.success("Client saved successfully!");
      }
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving client:", error);
      toast.error("Failed to save client. Please try again.");
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
      formId="client-form"
      isSubmitting={form.isSubmitting}
    >
      <ClientForm
        form={form}
        onSubmit={onSubmit}
      />
    </CustomSheet>
  );
};

export default ClientSheet;
