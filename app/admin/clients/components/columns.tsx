"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

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
    header: () => <div className="text-right">Total Spent</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total_spent"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
