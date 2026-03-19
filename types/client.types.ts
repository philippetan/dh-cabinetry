import { ClientFormWrapper, ClientSchema } from "@/schemas/client.schema";
import { ReactNode } from "react";
import { SubmitHandler } from "react-hook-form";

export interface ClientFormProps {
  form: ClientFormWrapper;
  onSubmit: SubmitHandler<ClientSchema>;
}

export interface ClientSheetProps {
  editId?: string;
  trigger: ReactNode;
  title: string;
  description?: string;
  mode: "add" | "edit";
}
