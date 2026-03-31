import { ProjectFormWrapper, ProjectSchema } from "@/schemas/project.schema";
import { SubmitHandler } from "react-hook-form";

export type Project = {
  id: string;
  project_name: string;
  client_id: string;
  start_date: any;
  project_fee: string;
  labor_cost: string;
  end_date: any;
};

export interface ProjectFormProps {
  form: ProjectFormWrapper;
  onSubmit: SubmitHandler<ProjectSchema>;
  originalData?: ProjectSchema | null;
  isReadOnly?: boolean;
}
