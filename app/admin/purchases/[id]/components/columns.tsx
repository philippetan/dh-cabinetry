import CustomButton from "@/components/custom/custom.button";
import { Label } from "@/components/ui/label";
import { PurchaseItem } from "@/types/purchase.types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useRouter } from "next/navigation";

export const useColumns = (): ColumnDef<PurchaseItem>[] => {
  const router = useRouter();

  return [
    {
      accessorKey: "inventory_id",
      header: "Material ID",
      cell: ({ row }) => (
        <Label
          className="cursor-pointer hover:underline"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/admin/inventory/${row.original.inventory_id}`);
          }}
        >
          {row.original.inventory_id.slice(0, 15)}
        </Label>
      ),
    },
    {
      accessorKey: "item_name",
      header: ({ column }) => {
        return (
          <CustomButton
            className="font-bold"
            variant="ghost"
            label="Material Name"
            icon={<ArrowUpDown />}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        );
      },
      cell: ({ row }) => (
        <span className="text-sm">{row.original.item_name}</span>
      ),
    },
    {
      accessorKey: "item_qty",
      header: ({ column }) => {
        return (
          <CustomButton
            className="font-bold"
            variant="ghost"
            label="Quantity"
            icon={<ArrowUpDown />}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        );
      },
      cell: ({ row }) => (
        <span className="text-sm">{row.original.item_qty}</span>
      ),
    },
    {
      accessorKey: "item_price",
      header: ({ column }) => {
        return (
          <CustomButton
            className="font-bold"
            variant="ghost"
            label="Price"
            icon={<ArrowUpDown />}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        );
      },
      cell: ({ row }) => (
        <span className="text-sm">
          $
          {parseFloat(row.original.item_price).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      ),
    },
    {
      id: "total",
      header: ({ column }) => {
        return (
          <CustomButton
            className="font-bold"
            variant="ghost"
            label="Total"
            icon={<ArrowUpDown />}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        );
      },
      cell: ({ row }) => (
        <span className="text-sm">
          $
          {(
            parseFloat(row.original.item_qty) *
            parseFloat(row.original.item_price)
          ).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      ),
    },
  ];
};
