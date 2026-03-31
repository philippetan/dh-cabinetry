"use client";

import CustomButton from "@/components/custom/custom.button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { db } from "@/config/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useColumns } from "./components/columns";
import { DataTable } from "@/components/custom/data.table";
import Loading from "../loading";
import { PurchaseItem } from "@/types/purchase.types";

interface PurchaseData {
  supplier_id: string;
  purchase_date: { toDate: () => Date };
  total_cost: string;
  items_purchased: {
    inventory_id: string;
    item_qty: string;
    item_price: string;
  }[];
}

const PurchaseInfo = () => {
  const params = useParams();
  const router = useRouter();
  const purchaseId = params.id as string;
  const columns = useColumns();

  const [purchase, setPurchase] = useState<PurchaseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [supplierName, setSupplierName] = useState<string>("");

  const [tableData, setTableData] = useState<PurchaseItem[]>([]);

  useEffect(() => {
    const fetchPurchaseInfo = async () => {
      try {
        const purchaseDoc = await getDoc(doc(db, "purchases", purchaseId));
        if (!purchaseDoc.exists()) return;
        const data = purchaseDoc.data() as PurchaseData;
        setPurchase(data);

        // Fetch supplier name
        const supplierDoc = await getDoc(
          doc(db, "suppliers", data.supplier_id),
        );
        if (supplierDoc.exists()) {
          setSupplierName(supplierDoc.data().name);
        }

        // Fetch all inventory item names
        const inventoryIds = data.items_purchased.map(
          (item) => item.inventory_id,
        );
        const inventoryDocs = await Promise.all(
          inventoryIds.map((id) => getDoc(doc(db, "inventory", id))),
        );
        const names: Record<string, string> = {};
        inventoryDocs.forEach((d, index) => {
          if (d.exists()) {
            names[inventoryIds[index]] = d.data().item_name;
          }
        });

        const tableRows: PurchaseItem[] = data.items_purchased.map((item) => ({
          inventory_id: item.inventory_id,
          item_name: names[item.inventory_id] || item.inventory_id,
          item_qty: item.item_qty,
          item_price: item.item_price,
        }));

        setTableData(tableRows);
      } catch (error) {
        console.error("Error fetching purchase:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPurchaseInfo();
  }, [purchaseId]);

  if (loading) return <Loading />;
  if (!purchase) return <div>Purchase not found.</div>;

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
              <Label className="text-muted-foreground text-xs">Supplier</Label>
              <CustomButton
                className="font-bold p-0 text-base"
                variant="link"
                label={supplierName}
                onClick={() => {
                  router.push(`/admin/suppliers`);
                }}
              />
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <Label className="text-muted-foreground text-xs">
                  Purchase Date
                </Label>
                <Label className="font-bold text-base">
                  {format(purchase.purchase_date.toDate(), "PPP")}
                </Label>
              </div>

              <div className="flex flex-col gap-1">
                <Label className="text-muted-foreground text-xs">
                  Total Cost
                </Label>
                <Label className="font-bold  text-base">
                  $
                  {parseFloat(purchase.total_cost).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Label>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <Label className="text-muted-foreground text-xs">
              List of items purchased
            </Label>
            <DataTable
              columns={columns}
              data={tableData}
              viewPagination={false}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PurchaseInfo;
