import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export const loginSchema = z.object({
  email: z.email("Please input a valid email address."),
  password: z.string().trim().min(1, "Password is required."),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const useLoginForm = () =>
  useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

export const loginFormWrapper = () => {
  const loginForm = useLoginForm();

  return {
    register: loginForm.register,
    handleSubmit: loginForm.handleSubmit,
    errors: loginForm.formState.errors,
    isSubmitting: loginForm.formState.isSubmitting,
  };
};
