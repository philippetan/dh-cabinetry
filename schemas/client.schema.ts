"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export const clientSchema = z.object({
  first_name: z.string().trim().min(1, "First name is required."),
  last_name: z.string().trim().min(1, "Last name is required."),
  email_address: z.email("Please input a valid email address."),
  contact_number: z.string().trim().min(1, "Contact number is required."),
  address: z.object({
    block_house_number: z
      .string()
      .trim()
      .min(1, "Block / House no. is required."),
    street_name: z.string().trim().min(1, "Street name is required."),
    unit_number: z.string().trim().optional().or(z.literal("")),
    postal_code: z
      .string()
      .trim()
      .optional()
      .or(z.literal(""))
      .refine(
        (val) => !val || /^\d{6}$/.test(val),
        "Postal code must be 6 digits.",
      ),
    building_name: z.string().trim().optional().or(z.literal("")),
  }),
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
      address: {
        block_house_number: "",
        street_name: "",
        unit_number: "",
        postal_code: "",
        building_name: "",
      },
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
