import { Label } from "@/components/ui/label";
import ClientSheet from "./components/client.sheet";
import CustomButton from "@/components/custom/custom.button";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Clients() {
  return (
    <div className="space-y-3">
      <Card>
        <CardContent>
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
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
