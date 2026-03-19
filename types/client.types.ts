import { ClientFormWrapper, ClientSchema } from "@/schemas/client.schema";
import { SubmitHandler } from "react-hook-form";

export interface ClientFormProps {
  form: ClientFormWrapper;
  onSubmit: SubmitHandler<ClientSchema>;
}
