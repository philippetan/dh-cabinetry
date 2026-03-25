"use client";

import CustomButton from "@/components/custom/custom.button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { db } from "@/config/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface InventoryData {
  item_id: string;
  item_name: string;
  item_unit: string;
  item_stock: number;
}

const ItemInfo = () => {
  const params = useParams();
  const router = useRouter();
  const itemId = params.id as string;

  const [inventory, setInventory] = useState<InventoryData | null>(null);

  useEffect(() => {
    const fetchInventoryInfo = async () => {
      try {
        const inventoryDoc = await getDoc(doc(db, "inventory", itemId));
        if (!inventoryDoc.exists()) return;

        const data = inventoryDoc.data() as InventoryData;
        setInventory(data);
      } catch (error) {}
    };

    fetchInventoryInfo();
  }, [itemId]);

  const getStatus = (stock: number) => {
    if (stock === 0)
      return { label: "Out of Stock", class: "bg-red-100 text-red-600" };
    if (stock <= 10)
      return { label: "Low Stock", class: "bg-yellow-100 text-yellow-600" };
    return { label: "In Stock", class: "bg-green-100 text-green-600" };
  };

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

      <Card>
        <CardContent className="space-y-4">
          <div className="flex flex-row items-start justify-between">
            <div className="flex flex-col gap-1">
              <Label className="text-muted-foreground text-xs">Name</Label>
              <Label className="font-bold text-base">
                {inventory?.item_name}
              </Label>
            </div>

            <div className="flex flex-col gap-1">
              <Label className="text-muted-foreground text-xs">Stock</Label>
              <Label className="font-bold text-base">
                {inventory?.item_stock} {inventory?.item_unit}
              </Label>
            </div>

            <div className="flex flex-col gap-1">
              <Label className="text-muted-foreground text-xs">Status</Label>
              {inventory &&
                (() => {
                  const status = getStatus(inventory.item_stock);
                  return (
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full w-fit ${status.class}`}
                    >
                      {status.label}
                    </span>
                  );
                })()}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ItemInfo;
