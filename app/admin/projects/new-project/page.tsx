"use client";

import CustomButton from "@/components/custom/custom.button";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { projectFormWrapper, ProjectSchema } from "@/schemas/project.schema";
import ProjectForm from "@/components/forms/project.form";

const NewProject = () => {
  const router = useRouter();
  const form = projectFormWrapper();

  const onSubmit = async (data: ProjectSchema) => {
    console.log(data);
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
