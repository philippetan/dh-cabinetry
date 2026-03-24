"use client";

import CustomButton from "@/components/custom/custom.button";
import CustomField from "@/components/custom/custom.field";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const PurchaseInfo = () => {
  const params = useParams();
  const router = useRouter();
  const purchaseId = params.id;

  return (
    <div className="flex flex-col h-full w-full space-y-4">
      <div>
        <CustomButton
          variant="link"
          label="Back"
          icon={<ChevronLeft />}
          onClick={() => {
            router.back();
          }}
        />
      </div>

      <div>
        <Card>
          <CardContent>
            <CustomField label="Supplier Name">
              <Label></Label>
            </CustomField>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PurchaseInfo;
