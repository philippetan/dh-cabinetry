import { ProjectFormWrapper, ProjectSchema } from "@/schemas/project.schema";
import { SubmitHandler } from "react-hook-form";

export interface ProjectFormProps {
  form: ProjectFormWrapper;
  onSubmit: SubmitHandler<ProjectSchema>;
  originalData?: ProjectSchema | null;
  isReadOnly?: boolean;
}
