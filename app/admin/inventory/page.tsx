"use client";

import CustomButton from "@/components/custom/custom.button";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import InventorySheet from "./components/inventory.sheet";
import { useState, useEffect } from "react";
import { DataTable } from "@/components/custom/data.table";
import { useColumns } from "./components/columns";
import {
  deleteMaterial,
  subscribeToInventory,
} from "@/services/inventory.services";
import { type Inventory } from "@/types/inventory.types";
import { toast } from "sonner";

export default function Inventory() {
  const columns = useColumns();

  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<Inventory[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToInventory(setData);
    return () => unsubscribe();
  }, []);

  const handleBulkDelete = async (ids: string[]) => {
    await Promise.all(ids.map((id) => deleteMaterial(id)));
    toast.success(`${ids.length} material(s) deleted successfully.`);
  };

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
        selection={false}
        bulkDeleteLabel="Delete selected materials?"
        onBulkDelete={handleBulkDelete}
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
