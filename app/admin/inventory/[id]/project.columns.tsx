import { Label } from "@/components/ui/label";
import { ProjectUsed } from "@/types/inventory.types";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

export const useProjectColumns = (): ColumnDef<ProjectUsed>[] => {
  const router = useRouter();
  return [
    {
      accessorKey: "project_name",
      header: () => <Label className="font-bold">Project Name</Label>,
      cell: ({ row }) => (
        <Label
          className="cursor-pointer hover:underline"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/admin/projects`);
          }}
        >
          {row.original.project_name}
        </Label>
      ),
    },
    {
      accessorKey: "start_date",
      header: () => <Label className="font-bold">Date</Label>,
      cell: ({ row }) => (
        <Label>
          {row.original.start_date?.toDate().toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </Label>
      ),
    },
    {
      accessorKey: "item_qty",
      header: () => <Label className="font-bold">Qty Used</Label>,
      cell: ({ row }) => <Label>- {row.original.item_qty}</Label>,
    },
    {
      accessorKey: "item_price",
      header: () => <Label className="font-bold">Price at Use</Label>,
      cell: ({ row }) => <Label>${row.original.item_price}</Label>,
    },
    {
      id: "subtotal",
      header: () => <Label className="font-bold">Subtotal</Label>,
      cell: ({ row }) => (
        <Label>
          $
          {(
            parseFloat(row.original.item_qty) *
            parseFloat(row.original.item_price)
          ).toFixed(2)}
        </Label>
      ),
    },
  ];
};
