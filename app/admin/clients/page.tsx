import { Label } from "@/components/ui/label";
import ClientSheet from "./components/client.sheet";
import CustomButton from "@/components/custom/custom.button";
import { PlusIcon } from "lucide-react";

export default function Clients() {
  return (
    <div className="space-y-3">
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
    </div>
  );
}
