"use client";

import CustomButton from "@/components/custom/custom.button";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { projectFormWrapper, ProjectSchema } from "@/schemas/project.schema";
import ProjectForm from "@/components/forms/project.form";
import { addNewProject } from "@/services/project.services";
import { toast } from "sonner";

const NewProject = () => {
  const router = useRouter();
  const form = projectFormWrapper();

  const onSubmit = async (data: ProjectSchema) => {
    try {
      await addNewProject(data);
      toast.success("Project saved successfully!");
      form.reset();
    } catch (error) {
      console.error("Error saving new project: ", error);
      toast.error("Failed to save new project. Please try again.");
    }
  };

  return (
    <div className="flex flex-col h-full w-full space-y-4">
      <div>
        <CustomButton
          variant="link"
          label="Back"
          icon={<ChevronLeft />}
          onClick={() => router.back()}
        />
      </div>

      <Label className="font-bold text-lg">New Project</Label>

      <div>
        <ProjectForm
          form={form}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default NewProject;
