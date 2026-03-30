import { Label } from "@/components/ui/label";
import { Purchase } from "@/types/inventory.types";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

export const usePurchaseColumns = (): ColumnDef<Purchase>[] => {
  const router = useRouter();

  return [
    {
      accessorKey: "id",
      header: () => <Label className="font-bold">Purchase ID</Label>,
      cell: ({ row }) => (
        <Label
          className="cursor-pointer hover:underline"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/admin/purchases/${row.original.id}`);
          }}
        >{`${row.original.id.slice(0, 15)}`}</Label>
      ),
    },
    {
      accessorKey: "purchase_date",
      header: () => <Label className="font-bold">Purchase Date</Label>,
      cell: ({ row }) => (
        <Label>
          {row.original.purchase_date?.toDate().toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </Label>
      ),
    },
    {
      accessorKey: "item_qty",
      header: () => <Label className="font-bold">Qty Purchased</Label>,
      cell: ({ row }) => <Label>+ {row.original.item_qty}</Label>,
    },
    {
      accessorKey: "item_price",
      header: () => <Label className="font-bold">Unit Price</Label>,
      cell: ({ row }) => <Label>${row.original.item_price}</Label>,
    },
    {
      accessorKey: "total_cost",
      header: () => <Label className="font-bold">Total Cost</Label>,
      cell: ({ row }) => <Label>${row.original.total_cost}</Label>,
    },
  ];
};
