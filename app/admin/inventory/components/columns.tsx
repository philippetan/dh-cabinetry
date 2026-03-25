import CustomButton from "@/components/custom/custom.button";
import { Label } from "@/components/ui/label";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type Inventory = {
  id: string;
  item_name: string;
  item_unit: string;
  item_stock: number;
};

export const columns: ColumnDef<Inventory>[] = [
  {
    accessorKey: "id",
    header: () => {
      return <Label className="font-bold">Item ID</Label>;
    },
    cell: ({ row }) => <Label>{`${row.original.id.slice(0, 15)}...`}</Label>,
  },
  {
    accessorKey: "item_name",
    header: ({ column }) => {
      return (
        <CustomButton
          className="font-bold p-0!"
          variant="ghost"
          label="Item Name"
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
        className="font-bold p-0!"
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
    header: () => <Label className="font-bold">Status</Label>,
    cell: ({ row }) => {
      const getStatus = (stock: number) => {
        if (stock === 0)
          return { label: "Out of Stock", class: "bg-red-100 text-red-600" };
        if (stock <= 10)
          return { label: "Low Stock", class: "bg-yellow-100 text-yellow-600" };
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
];
