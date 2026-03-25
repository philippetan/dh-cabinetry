import CustomButton from "@/components/custom/custom.button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Timestamp } from "firebase/firestore";
import { ArrowUpDown } from "lucide-react";

export type Purchases = {
  id: string;
  supplier_name: string;
  purchase_date: Timestamp;
  total_cost: string;
};

export const columns: ColumnDef<Purchases>[] = [
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
    header: ({ column }) => {
      return (
        <CustomButton
          className="font-bold p-0!"
          variant="ghost"
          label="Purchase ID"
          icon={<ArrowUpDown />}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
  },
  {
    accessorKey: "supplier_name",
    header: ({ column }) => {
      return (
        <CustomButton
          className="font-bold p-0!"
          variant="ghost"
          label="Supplier Name"
          icon={<ArrowUpDown />}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
  },
  {
    accessorKey: "purchase_date",
    header: ({ column }) => {
      return (
        <CustomButton
          className="font-bold p-0!"
          variant="ghost"
          label="Purchase Date"
          icon={<ArrowUpDown />}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("purchase_date") as Timestamp;

      return date?.toDate().toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    },
  },
  {
    accessorKey: "total_cost",
    header: ({ column }) => {
      return (
        <CustomButton
          className="font-bold p-0!"
          variant="ghost"
          label="Total Cost"
          icon={<ArrowUpDown />}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ row }) => {
      const amount = Number(row.getValue("total_cost"));

      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
    },
  },
];
