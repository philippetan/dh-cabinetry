import CustomButton from "@/components/custom/custom.button";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import InventorySheet from "./components/inventory.sheet";

export default function Inventory() {
  return (
    <div className="flex flex-col h-full w-full space-y-4">
      <div className="flex flex-row items-center justify-between">
        <Label className="font-bold text-lg">Inventory</Label>

        <InventorySheet
          trigger={
            <CustomButton
              label="Add New Item"
              icon={<Plus />}
            />
          }
          title="Add Item"
          description="Fill in the details below to add a new item to the inventory."
          mode="add"
        />
      </div>
    </div>
  );
}
