"use client";

import CustomButton from "@/components/custom/custom.button";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import InventorySheet from "./components/inventory.sheet";
import { useState, useEffect } from "react";
import { DataTable } from "@/components/custom/data.table";
import { columns, type Inventory } from "./components/columns";
import { subscribeToInventory } from "@/services/inventory.services";
import { useRouter } from "next/navigation";

export default function Inventory() {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<Inventory[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToInventory(setData);
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col h-full w-full space-y-4">
      <div className="flex flex-row items-center justify-between">
        <Label className="font-bold text-lg">Inventory</Label>

        <CustomButton
          label="Add Material"
          icon={<Plus />}
          onClick={() => setOpen(true)}
        />
      </div>

      <DataTable
        columns={columns}
        data={data}
        searchPlaceholder="Search by material name..."
        onRowClick={(row) => router.push(`/admin/inventory/${row.id}`)}
        selection={false}
      />

      <InventorySheet
        open={open}
        onOpenChange={setOpen}
        title="Add Material"
        description="Fill in the details below to add a new material to the inventory."
        mode="add"
      />
    </div>
  );
}
