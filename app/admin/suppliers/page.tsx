"use client";

import CustomButton from "@/components/custom/custom.button";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import SupplierSheet from "./components/supplier.sheet";
import { DataTable } from "@/components/custom/data.table";
import { columns } from "./components/columns";
import { useEffect, useState } from "react";
import { subscribeToSuppliers } from "@/services/supplier.services";
import { type Suppliers } from "@/types/supplier.types";

export default function Suppliers() {
  const [data, setData] = useState<Suppliers[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToSuppliers(setData);
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col h-full w-full space-y-4">
      <div className="flex w-full items-center justify-between">
        <Label className="font-bold text-lg">Suppliers</Label>
        <SupplierSheet
          trigger={
            <CustomButton
              icon={<Plus />}
              label="Add Supplier"
            />
          }
          title="Add Supplier"
          description="Fill in the details below to add a new supplier."
          mode="add"
        />
      </div>

      <DataTable
        columns={columns}
        data={data}
        searchPlaceholder="Search by name or email..."
      />
    </div>
  );
}
