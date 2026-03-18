import CustomButton from "@/components/custom/custom.button";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "lucide-react";
import ClientDrawer from "./components/client.drawer";

export default function Clients() {
  return (
    <div className="space-y-3">
      <div className="flex w-full items-center">
        <Label className="font-bold text-lg">Clients</Label>

        <ClientDrawer
          trigger={
            <CustomButton
              icon={<PlusIcon />}
              label="Add Client"
            />
          }
        />
      </div>
    </div>
  );
}
