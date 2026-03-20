import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export const supplierSchema = z.object({
  name: z.string().trim().min(1, "Name of supplier is required."),
  email_address: z.email("Please input a valid email address."),
  contact_number: z.string().trim().min(1, "Contact number is required."),
  address: z.object({
    block_house_number: z
      .string()
      .trim()
      .min(1, "Block / House no. is required."),
    street_name: z.string().trim().min(1, "Street name is required."),
    unit_number: z.string().trim().optional().or(z.literal("")),
    floor_number: z.string().trim().optional().or(z.literal("")),
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

export type SupplierSchema = z.infer<typeof supplierSchema>;

export const useSupplierForm = () =>
  useForm<SupplierSchema>({
    resolver: zodResolver(supplierSchema),
    defaultValues: {
      name: "",
      email_address: "",
      contact_number: "",
      address: {
        block_house_number: "",
        street_name: "",
        unit_number: "",
        floor_number: "",
        postal_code: "",
        building_name: "",
      },
    },
  });

export const supplierFormWrapper = () => {
  const supplierForm = useSupplierForm();

  return {
    register: supplierForm.register,
    handleSubmit: supplierForm.handleSubmit,
    errors: supplierForm.formState.errors,
    isSubmitting: supplierForm.formState.isSubmitting,
    reset: supplierForm.reset,
    setValue: supplierForm.setValue,
  };
};

export type SupplierFormWrapper = ReturnType<typeof supplierFormWrapper>;
