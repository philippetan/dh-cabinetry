"use client";

import CustomAlertDialog from "@/components/custom/custom.alert.dialog";
import CustomButton from "@/components/custom/custom.button";
import { deleteClient } from "@/services/client.services";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";
import ClientSheet from "./client.sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Clients } from "@/types/client.types";

export const columns: ColumnDef<Clients>[] = [
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
    accessorKey: "client_name",
    header: ({ column }) => {
      return (
        <CustomButton
          className="font-bold"
          variant="ghost"
          label="Client Name"
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
    accessorKey: "ongoing_projects",
    enableGlobalFilter: false,
    header: "Ongoing Projects",
  },
  {
    accessorKey: "total_spent",
    enableGlobalFilter: false,
    header: "Total Spent",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total_spent"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const handleDelete = async () => {
        try {
          await deleteClient(row.original.id);
          toast.success("Client deleted successfully.");
        } catch (error) {
          console.error("Error deleting client: ", error);
          toast.error("Failed to delete client. Please try again.");
        }
      };

      return (
        <div className="flex flex-row items-center justify-center gap-2">
          <ClientSheet
            editId={row.original.id}
            mode="edit"
            trigger={
              <CustomButton
                size="icon-sm"
                variant="outline"
                icon={<Pencil />}
              />
            }
            title="Edit Client"
            description="Update the client's details below."
          />

          <CustomAlertDialog
            trigger={
              <CustomButton
                size="icon-sm"
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
