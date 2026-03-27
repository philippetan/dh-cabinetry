"use client";

import CustomButton from "@/components/custom/custom.button";
import { DataTable } from "@/components/custom/data.table";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useColumns, type Purchases } from "./components/columns";
import { useEffect, useState } from "react";
import { subscribeToPurchases } from "@/services/purchase.services";

export default function Purchases() {
  const router = useRouter();
  const columns = useColumns();
  const [data, setData] = useState<Purchases[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToPurchases(setData);

    return () => unsubscribe();
  }, []);

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

      <DataTable
        columns={columns}
        data={data}
        searchPlaceholder="Search by supplier name"
        selection={false}
      />
    </div>
  );
}
