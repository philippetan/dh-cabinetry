import CustomButton from "@/components/custom/custom.button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type PurchaseItem = {
  inventory_id: string;
  item_name: string;
  item_qty: string;
  item_price: string;
};

export const columns: ColumnDef<PurchaseItem>[] = [
  {
    accessorKey: "inventory_id",
    header: "Item ID",
    cell: ({ row }) => (
      <CustomButton
        className="font-normal"
        label={row.original.inventory_id.slice(0, 13)}
        variant="link"
      />
    ),
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
    cell: ({ row }) => (
      <span className="text-sm">{row.original.item_name}</span>
    ),
  },
  {
    accessorKey: "item_qty",
    header: ({ column }) => {
      return (
        <CustomButton
          className="font-bold p-0!"
          variant="ghost"
          label="Quantity"
          icon={<ArrowUpDown />}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ row }) => <span className="text-sm">{row.original.item_qty}</span>,
  },
  {
    accessorKey: "item_price",
    header: ({ column }) => {
      return (
        <CustomButton
          className="font-bold p-0!"
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
          className="font-bold p-0!"
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
