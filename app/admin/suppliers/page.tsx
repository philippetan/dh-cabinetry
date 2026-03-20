import CustomButton from "@/components/custom/custom.button";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import SupplierSheet from "./components/supplier.sheet";

export default function Suppliers() {
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
    </div>
  );
}
