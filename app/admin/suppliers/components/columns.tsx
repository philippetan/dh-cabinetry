import CustomButton from "@/components/custom/custom.button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";
import SupplierSheet from "./supplier.sheet";
import CustomAlertDialog from "@/components/custom/custom.alert.dialog";
import { deleteSupplier } from "@/services/supplier.services";

export type Suppliers = {
  id: string;
  supplier_name: string;
  email_address: string;
  contact_number: string;
};

export const columns: ColumnDef<Suppliers>[] = [
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
    accessorKey: "email_address",
    header: ({ column }) => {
      return (
        <CustomButton
          className="font-bold"
          variant="ghost"
          label="Contact Information"
          icon={<ArrowUpDown />}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ row }) => {
      const email = row.original.email_address;
      const phone = row.original.contact_number;

      return (
        <div className="flex flex-col">
          <span className="text-sm">{email}</span>
          <span className="text-xs text-muted-foreground">{phone}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const handleDelete = async () => {
        try {
          await deleteSupplier(row.original.id);
          toast.success("Client deleted successfully.");
        } catch (error) {
          console.error("Error deleting client: ", error);
          toast.error("Failed to delete client. Please try again.");
        }
      };

      return (
        <div className="flex flex-row items-center justify-center gap-2">
          <SupplierSheet
            editId={row.original.id}
            mode="edit"
            trigger={
              <CustomButton
                variant="outline"
                icon={<Pencil />}
              />
            }
            title="Edit Supplier"
            description="Update the supplier's details below."
          />

          <CustomAlertDialog
            trigger={
              <CustomButton
                variant="destructive"
                icon={<Trash />}
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
