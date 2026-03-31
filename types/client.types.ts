import { ClientFormWrapper, ClientSchema } from "@/schemas/client.schema";
import { ReactNode } from "react";
import { SubmitHandler } from "react-hook-form";

export type Clients = {
  id: string;
  client_name: string;
  email_address: string;
  contact_number: string;
  ongoing_projects: string;
  total_spent: string;
};

export interface ClientFormProps {
  form: ClientFormWrapper;
  onSubmit: SubmitHandler<ClientSchema>;
}

export interface ClientSheetProps {
  editId?: string;
  trigger?: ReactNode;
  title: string;
  description?: string;
  mode: "add" | "edit";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
