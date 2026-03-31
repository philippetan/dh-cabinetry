"use client";

import CustomButton from "@/components/custom/custom.button";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/custom/data.table";
import { Project, useProjectColumns } from "./components/columns";
import { subscribeToProjects } from "@/services/project.services";

export default function Projects() {
  const router = useRouter();
  const columns = useProjectColumns();
  const [data, setData] = useState<Project[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToProjects(setData);
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col h-full w-full space-y-4">
      <div className="flex w-full items-center justify-between">
        <Label className="font-bold text-lg">Projects</Label>
        <CustomButton
          icon={<Plus />}
          label="New Project"
          onClick={() => router.push("/admin/projects/new")}
        />
      </div>

      <DataTable
        columns={columns}
        data={data}
        searchPlaceholder="Search by project name..."
        selection={false}
        bulkDeleteLabel="Delete selected projects?"
      />
    </div>
  );
}
