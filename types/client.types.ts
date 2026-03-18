import { ClientSchema } from "@/schemas/client.schema";
import { SubmitHandler } from "react-hook-form";

export interface ClientFormProps {
  onSubmit: SubmitHandler<ClientSchema>;
  mode: "sheet" | "form";
}
