"use client";

import { Label } from "@/components/ui/label";
import ClientSheet from "./components/client.sheet";
import CustomButton from "@/components/custom/custom.button";
import { PlusIcon } from "lucide-react";
import { ClientDataTable } from "./components/client.data.table";
import { type Clients, columns } from "./components/columns";
import { useEffect, useState } from "react";
import { subscribeToClients } from "@/services/client.services";

export default function Clients() {
  const [data, setData] = useState<Clients[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToClients(setData);
    return () => unsubscribe();
  }, []);

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

      <ClientDataTable
        columns={columns}
        data={data}
      />
    </div>
  );
}
