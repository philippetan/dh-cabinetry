import { LoginSchema } from "@/schemas/login.schema";
import { SubmitHandler } from "react-hook-form";

export interface LoginFormProps {
  onSubmit: SubmitHandler<LoginSchema>;
}