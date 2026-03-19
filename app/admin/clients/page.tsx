import { Label } from "@/components/ui/label";
import ClientSheet from "./components/client.sheet";
import CustomButton from "@/components/custom/custom.button";
import { PlusIcon } from "lucide-react";
import { ClientDataTable } from "./components/client.data.table";
import { type Clients, columns } from "./components/columns";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";

async function getData(): Promise<Clients[]> {
  const clientsCollection = collection(db, "clients");

  const q = query(clientsCollection, where("deleted_at", "==", null));

  const snapshot = await getDocs(q);

  const data: Clients[] = snapshot.docs.map((doc) => {
    const client = doc.data();

    return {
      id: doc.id,
      client_name: `${client.first_name} ${client.last_name}`,
      email_address: client.email_address,
      contact_number: client.contact_number,
      ongoing_projects: "",
      total_spent: "0",
    };
  });

  return data;
}

export default async function Clients() {
  const data = await getData();
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
        />
      </div>

      <ClientDataTable
        columns={columns}
        data={data}
      />
    </div>
  );
}
