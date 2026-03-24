"use client";

import CustomButton from "@/components/custom/custom.button";
import PurchaseForm from "@/components/forms/purchase.form";
import { Label } from "@/components/ui/label";
import { purchaseFormWrapper, PurchaseSchema } from "@/schemas/purchase.schema";
import { addNewPurchase } from "@/services/purchase.services";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const NewPurchase = () => {
  const router = useRouter();
  const form = purchaseFormWrapper();

  const onSubmit = async (data: PurchaseSchema) => {
    try {
      await addNewPurchase(data);
      toast.success("Purchase saved successfully!");
      form.reset();
    } catch (error) {
      console.error("Error saving new purchase: ", error);
      toast.error("Failed to save new purchase. Please try again.");
    }
  };

  return (
    <div className="flex flex-col h-full w-full space-y-4">
      <div>
        <CustomButton
          variant="link"
          label="Back"
          icon={<ChevronLeft />}
          onClick={() => {
            router.back();
            form.reset();
          }}
        />
      </div>

      <Label className="font-bold text-lg">New Purchase</Label>

      <div>
        <PurchaseForm
          form={form}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default NewPurchase;
