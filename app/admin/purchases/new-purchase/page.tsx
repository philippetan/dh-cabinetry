"use client";

import CustomButton from "@/components/custom/custom.button";
import PurchaseForm from "@/components/forms/purchase.form";
import { Label } from "@/components/ui/label";
import { purchaseFormWrapper } from "@/schemas/purchase.schema";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const NewPurchase = () => {
  const router = useRouter();
  const form = purchaseFormWrapper();

  const onSubmit = async () => {
    console.log("Clicked");
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
