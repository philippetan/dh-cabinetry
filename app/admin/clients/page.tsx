"use client";

import { Label } from "@/components/ui/label";
import ClientSheet from "./components/client.sheet";
import CustomButton from "@/components/custom/custom.button";
import { PlusIcon } from "lucide-react";
import { columns } from "./components/columns";
import { useEffect, useState } from "react";
import { deleteClient, subscribeToClients } from "@/services/client.services";
import { toast } from "sonner";
import { DataTable } from "../../../components/custom/data.table";
import { type Clients } from "@/types/client.types";

export default function Clients() {
  const [data, setData] = useState<Clients[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToClients(setData);
    return () => unsubscribe();
  }, []);

  const handleBulkDelete = async (ids: string[]) => {
    await Promise.all(ids.map((id) => deleteClient(id)));
    toast.success(`${ids.length} client(s) deleted successfully.`);
  };

  return (
    <div className="flex flex-col h-full w-full space-y-4">
      <div className="flex w-full items-center justify-between">
        <Label className="font-bold text-lg">Clients</Label>
        <ClientSheet
          trigger={
            <CustomButton
              label="Add Client"
              icon={<PlusIcon />}
            />
          }
          title="Add Client"
          description="Fill in the details below to add a new client."
          mode="add"
        />
      </div>

      <DataTable
        columns={columns}
        data={data}
        searchPlaceholder="Search by name or email..."
        bulkDeleteLabel="Delete selected clients?"
        onBulkDelete={handleBulkDelete}
      />
    </div>
  );
}
