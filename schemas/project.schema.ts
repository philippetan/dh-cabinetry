import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export const projectSchema = z.object({
  project_name: z.string().trim().min(1, "Project name is required."),
  project_description: z.string().trim().optional(),
  client_id: z.string().trim().min(1, "Client is required."),
  start_date: z.date(),
  status: z.string(),
  materials_used: z.array(
    z.object({
      inventory_id: z.string().trim().min(1, "Item is required"),
      item_qty: z.string().trim().min(1, "Quantity is required."),
    }),
  ),
  project_fee: z.string().trim().min(1, "Project fee is required."),
});

export type ProjectSchema = z.infer<typeof projectSchema>;

export const useProjectForm = () =>
  useForm<ProjectSchema>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      project_name: "",
      project_description: "",
      client_id: "",
      start_date: new Date(),
      status: "",
      materials_used: [
        {
          inventory_id: "",
          item_qty: "",
        },
      ],
      project_fee: "",
    },
  });

export const projectFormWrapper = () => {
  const projectForm = useProjectForm();

  return {
    register: projectForm.register,
    handleSubmit: projectForm.handleSubmit,
    errors: projectForm.formState.errors,
    isSubmitting: projectForm.formState.isSubmitting,
    reset: projectForm.reset,
    setValue: projectForm.setValue,
    watch: projectForm.watch,
    control: projectForm.control,
  };
};

export type ProjectFormWrapper = ReturnType<typeof projectFormWrapper>;
