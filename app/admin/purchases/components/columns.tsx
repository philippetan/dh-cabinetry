import CustomButton from "@/components/custom/custom.button";
import { Label } from "@/components/ui/label";
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
    accessorKey: "id",
    header: () => {
      return <Label className="font-bold">Purchase ID</Label>;
    },
  },
  {
    accessorKey: "supplier_name",
    header: ({ column }) => {
      return (
        <CustomButton
          className="font-bold"
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
          className="font-bold"
          variant="ghost"
          label="Purchase Date"
          icon={<ArrowUpDown />}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("purchase_date") as Timestamp;
      return date?.toDate().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
  {
    accessorKey: "total_cost",
    header: ({ column }) => {
      return (
        <CustomButton
          className="font-bold"
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
