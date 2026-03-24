"use client";

import CustomButton from "@/components/custom/custom.button";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import InventorySheet from "./components/inventory.sheet";
import { useState } from "react";

export default function Inventory() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col h-full w-full space-y-4">
      <div className="flex flex-row items-center justify-between">
        <Label className="font-bold text-lg">Inventory</Label>

        <CustomButton
          label="Add New Item"
          icon={<Plus />}
          onClick={() => setOpen(true)}
        />
      </div>

      <InventorySheet
        open={open}
        onOpenChange={setOpen}
        title="Add Item"
        description="Fill in the details below to add a new item to the inventory."
        mode="add"
      />
    </div>
  );
}
