import CustomAlertDialog from "@/components/custom/custom.alert.dialog";
import CustomButton from "@/components/custom/custom.button";
import { Label } from "@/components/ui/label";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil, Trash } from "lucide-react";
import InventorySheet from "./inventory.sheet";
import { useRouter } from "next/navigation";

export type Inventory = {
  id: string;
  item_name: string;
  item_unit: string;
  item_stock: number;
};

export const useColumns = (): ColumnDef<Inventory>[] => {
  const router = useRouter();

  return [
    {
      accessorKey: "id",
      header: () => {
        return <Label className="font-bold">Material ID</Label>;
      },
      cell: ({ row }) => (
        <CustomButton
          className="font-normal"
          label={`${row.original.id.slice(0, 15)}...`}
          variant="link"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/admin/inventory/${row.original.id}`);
          }}
        />
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
        const getStatus = (stock: number) => {
          if (stock === 0)
            return { label: "Out of Stock", class: "bg-red-100 text-red-600" };
          if (stock <= 10)
            return {
              label: "Low Stock",
              class: "bg-yellow-100 text-yellow-600",
            };
          return { label: "In Stock", class: "bg-green-100 text-green-600" };
        };

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
        const handleDelete = async () => {};

        return (
          <div className="flex flex-row items-center justify-center gap-2">
            <InventorySheet
              editId={row.original.id}
              mode="edit"
              trigger={
                <CustomButton
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
