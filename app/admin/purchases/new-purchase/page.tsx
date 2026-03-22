"use client";

import CustomButton from "@/components/custom/custom.button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const NewPurchase = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full w-full space-y-4">
      <div>
        <CustomButton
          variant="link"
          label="Back"
          icon={<ChevronLeft />}
          onClick={() => router.back()}
        />
      </div>

      <div></div>
    </div>
  );
};

export default NewPurchase;
