"use client";

import CustomButton from "@/components/custom/custom.button";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { projectFormWrapper, ProjectSchema } from "@/schemas/project.schema";
import ProjectForm from "@/components/forms/project.form";
import {
  addNewProject,
  getProjectById,
  updateProject,
} from "@/services/project.services";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import Loading from "../loading";

const ProjectPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isNew = id === "new";

  const form = projectFormWrapper();

  const [originalData, setOriginalData] = useState<ProjectSchema | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(!isNew);

  useEffect(() => {
    if (isNew) return;

    const fetchProject = async () => {
      try {
        const projectDoc = await getDoc(doc(db, "projects", id));
        if (!projectDoc.exists()) return;

        const raw = projectDoc.data();
        setIsCompleted(raw.end_date !== null);

        const data = await getProjectById(id);
        if (!data) return;
        setOriginalData(data);
        form.reset(data);
      } catch (error) {
        console.error("Error fetching project: ", error);
        toast.error("Failed to load project.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const onSubmit = async (data: ProjectSchema) => {
    try {
      if (isNew) {
        await addNewProject(data);
        toast.success("Project saved successfully!");
        form.reset();
      } else {
        await updateProject(id, data, originalData!);
        toast.success("Project updated successfully!");
      }
    } catch (error) {
      console.error("Error saving project: ", error);
      toast.error("Failed to save project. Please try again.");
    }
  };

  if (loading) {
    return <Loading />;
  }

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

      <Label className="font-bold text-lg">
        {isCompleted
          ? "Project Information"
          : isNew
            ? "New Project"
            : "Edit Project"}
      </Label>

      <div>
        <ProjectForm
          form={form}
          onSubmit={onSubmit}
          originalData={originalData}
          isReadOnly={!isNew && isCompleted}
        />
      </div>
    </div>
  );
};

export default ProjectPage;
