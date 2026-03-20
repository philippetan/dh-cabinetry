"use client";

import CustomButton from "@/components/custom/custom.button";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Projects() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full w-full space-y-4">
      <div className="flex w-full items-center justify-between">
        <Label className="font-bold text-lg">Projects</Label>

        <CustomButton
          icon={<Plus />}
          label="New Project"
          onClick={() => router.push("/admin/projects/new-project")}
        />
      </div>
    </div>
  );
}
