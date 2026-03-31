import CustomAlertDialog from "@/components/custom/custom.alert.dialog";
import CustomButton from "@/components/custom/custom.button";
import { Label } from "@/components/ui/label";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil, Trash } from "lucide-react";
import InventorySheet from "./inventory.sheet";
import { useRouter } from "next/navigation";
import { getStatus } from "@/lib/inventory.utils";
import { Inventory } from "@/types/inventory.types";
import { Checkbox } from "@/components/ui/checkbox";
import { deleteMaterial } from "@/services/inventory.services";
import { toast } from "sonner";

export const useColumns = (): ColumnDef<Inventory>[] => {
  const router = useRouter();

  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          className="cursor-pointer"
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          className="cursor-pointer"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: () => {
        return <Label className="font-bold">Material ID</Label>;
      },
      cell: ({ row }) => (
        <Label
          className="cursor-pointer hover:underline"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/admin/inventory/${row.original.id}`);
          }}
        >
          {row.original.id.slice(0, 14)}
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
    },
    {
      accessorFn: (row) => row.item_stock,
      sortingFn: "basic",
      id: "stock_unit",
      header: ({ column }) => (
        <CustomButton
          className="font-bold"
          variant="ghost"
          label="Stock"
          icon={<ArrowUpDown />}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      ),
      cell: ({ row }) => (
        <Label>
          {row.original.item_stock} {row.original.item_unit}
        </Label>
      ),
    },
    {
      id: "status",
      accessorFn: (row) => {
        if (row.item_stock === 0) return "Out of Stock";
        if (row.item_stock <= 10) return "Low Stock";
        return "In Stock";
      },
      sortingFn: (rowA, rowB) => {
        const order = { "Out of Stock": 0, "Low Stock": 1, "In Stock": 2 };
        return (
          order[rowA.getValue("status") as keyof typeof order] -
          order[rowB.getValue("status") as keyof typeof order]
        );
      },
      header: ({ column }) => (
        <CustomButton
          className="font-bold"
          variant="ghost"
          label="Status"
          icon={<ArrowUpDown />}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      ),
      cell: ({ row }) => {
        const status = getStatus(row.original.item_stock);
        return (
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${status.class}`}
          >
            {status.label}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="text-center">Actions</div>,
      cell: ({ row }) => {
        const handleDelete = async () => {
          try {
            await deleteMaterial(row.original.id);
            toast.success("Material deleted successfully!");
          } catch (error) {
            console.error("Error in deleting material: ", error);
            toast.error("Error deleting the material. Please try again.");
          }
        };

        return (
          <div className="flex flex-row items-center justify-center gap-2">
            <InventorySheet
              editId={row.original.id}
              mode="edit"
              trigger={
                <CustomButton
                  size="icon-sm"
                  variant="outline"
                  icon={<Pencil />}
                  onClick={(e) => e.stopPropagation()}
                />
              }
              title="Edit Material"
              description="Update the material details below."
            />

            <CustomAlertDialog
              trigger={
                <CustomButton
                  size="icon-sm"
                  variant="destructive"
                  icon={<Trash />}
                  onClick={(e) => e.stopPropagation()}
                />
              }
              title="Are you absolutely sure?"
              description="This action cannot be undone."
              onClick={handleDelete}
              confirmText="Confirm"
            />
          </div>
        );
      },
    },
  ];
};
