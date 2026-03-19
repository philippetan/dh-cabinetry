"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export const clientSchema = z.object({
  first_name: z.string().trim().min(1, "First name is required."),
  last_name: z.string().trim().min(1, "Last name is required."),
  email_address: z.email("Please input a valid email address."),
  contact_number: z.string().trim().min(1, "Contact number is required."),
  address: z.string().trim().min(1, "Address is required."),
});

export type ClientSchema = z.infer<typeof clientSchema>;

export const useClientForm = () =>
  useForm<ClientSchema>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email_address: "",
      contact_number: "",
      address: "",
    },
  });

export const clientFormWrapper = () => {
  const clientForm = useClientForm();

  return {
    register: clientForm.register,
    handleSubmit: clientForm.handleSubmit,
    errors: clientForm.formState.errors,
    isSubmitting: clientForm.formState.isSubmitting,
    reset: clientForm.reset,
  };
};

export type ClientFormWrapper = ReturnType<typeof clientFormWrapper>;
