"use client";

import CustomButton from "@/components/custom/custom.button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/custom/data.table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useProjectColumns } from "./project.columns";
import { InventoryData, ProjectUsed, Purchase } from "@/types/inventory.types";
import { usePurchaseColumns } from "./purchase.columns";
import {
  getInventoryById,
  getProjectsByInventoryId,
  getPurchasesByInventoryId,
} from "@/services/inventory.services";
import Loading from "../loading";

const ItemInfo = () => {
  const params = useParams();
  const router = useRouter();
  const itemId = params.id as string;
  const columns = usePurchaseColumns();
  const projectColumns = useProjectColumns();

  const [inventory, setInventory] = useState<InventoryData | null>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [projects, setProjects] = useState<ProjectUsed[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [inventoryData, purchasesData, projectsData] = await Promise.all([
          getInventoryById(itemId),
          getPurchasesByInventoryId(itemId),
          getProjectsByInventoryId(itemId),
        ]);

        setInventory(inventoryData);
        setPurchases(purchasesData);
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching item info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [itemId]);

  const priceHistory = purchases
    .slice()
    .sort((a, b) => a.purchase_date?.toDate() - b.purchase_date?.toDate())
    .map((p) => ({
      date: p.purchase_date?.toDate().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      price: parseFloat(p.item_price),
    }));

  const totalPurchased = purchases.reduce(
    (sum, p) => sum + parseFloat(p.item_qty),
    0,
  );

  const totalConsumed = projects.reduce(
    (sum, p) => sum + parseFloat(p.item_qty),
    0,
  );

  if (loading) {
    return <Loading />;
  }

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
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <Label className="text-muted-foreground text-xs">Name</Label>
                <Label className="font-bold text-base">
                  {inventory?.item_name}
                </Label>
              </div>
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

            <div className="flex flex-col gap-1">
              <Label className="text-muted-foreground text-xs">Price</Label>
              <Label className="font-bold">$ {inventory?.item_price}</Label>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-muted-foreground text-xs ">
              Price History
            </Label>
            {priceHistory.length < 2 ? (
              <div className="flex items-center justify-center h-50">
                <Label className="text-muted-foreground text-sm">
                  No price history yet.
                </Label>
              </div>
            ) : (
              <ResponsiveContainer
                width="100%"
                height={200}
              >
                <LineChart data={priceHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#000"
                    strokeWidth={1.5}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-2">
        <Label className="text-base font-bold">Purchase History</Label>
        <DataTable
          columns={columns}
          data={purchases}
          viewSearch={false}
          selection={false}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-base font-bold">Projects Used In</Label>
        <DataTable
          columns={projectColumns}
          data={projects}
          viewSearch={false}
          selection={false}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-base font-bold">Stock Movement Summary</Label>
        <Card>
          <CardContent>
            <div className="flex flex-row items-start justify-between">
              <div className="flex flex-col gap-1">
                <Label className="text-muted-foreground text-xs">
                  Total Purchased
                </Label>
                <Label className="font-bold text-base">
                  {totalPurchased} {inventory?.item_unit}
                </Label>
              </div>

              <div className="flex flex-col gap-1">
                <Label className="text-muted-foreground text-xs">
                  Total Consumed
                </Label>
                <Label className="font-bold text-base">
                  {totalConsumed} {inventory?.item_unit}
                </Label>
              </div>

              <div className="flex flex-col gap-1">
                <Label className="text-muted-foreground text-xs">
                  Current Stock
                </Label>
                <Label className="font-bold text-base">
                  {inventory?.item_stock} {inventory?.item_unit}
                </Label>
              </div>

              <div className="flex flex-col gap-1">
                <Label className="text-muted-foreground text-xs">
                  Unaccounted
                </Label>
                <Label className="font-bold text-base">
                  {totalPurchased -
                    totalConsumed -
                    (inventory?.item_stock ?? 0)}{" "}
                  {inventory?.item_unit}
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ItemInfo;
