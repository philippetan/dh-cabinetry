"use client";

import CustomButton from "@/components/custom/custom.button";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Purchases() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full w-full space-y-4">
      <div className="flex flex-row items-center justify-between">
        <Label className="font-bold text-lg">Purchases</Label>

        <CustomButton
          label="Add New Purchase"
          icon={<Plus />}
          onClick={() => router.push("/admin/purchases/new-purchase")}
        />
      </div>
    </div>
  );
}
