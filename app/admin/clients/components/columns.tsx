"use client";

import CustomAlertDialog from "@/components/custom/custom.alert.dialog";
import CustomButton from "@/components/custom/custom.button";
import { deleteClient } from "@/services/client.service";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";
import { toast } from "sonner";

export type Clients = {
  id: string;
  client_name: string;
  email_address: string;
  contact_number: string;
  ongoing_projects: string;
  total_spent: string;
};

export const columns: ColumnDef<Clients>[] = [
  {
    accessorKey: "client_name",
    header: "Client Name",
  },
  {
    header: "Contact Information",
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
    header: "Ongoing Projects",
  },
  {
    accessorKey: "total_spent",
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
          <CustomButton
            variant="outline"
            icon={<Pencil />}
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
