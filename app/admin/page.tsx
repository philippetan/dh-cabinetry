import CustomInput from "@/components/custom/custom.input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { LockKeyhole, LogIn, Mail } from "lucide-react";

export default function Login() {
  return (
    <div className="w-full space-y-10">
      <div className="flex flex-col items-center gap-2">
        <Label className="font-bold text-2xl">Dazzling Home</Label>
        <Label className="font-normal text-gray-600">
          Administrative Management Portal
        </Label>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-bold">Sign In</CardTitle>
          <CardDescription>Please enter your credentials.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          <Field>
            <FieldLabel>Email Address</FieldLabel>
            <CustomInput
              placeholder="admin@example.com"
              icon={<Mail />}
            />
          </Field>

          <Field>
            <FieldLabel>Password</FieldLabel>
            <CustomInput
              placeholder="Enter your password"
              icon={<LockKeyhole />}
            />
          </Field>

          <Button size="lg" className="w-full mt-5 cursor-pointer">
            Sign In <LogIn />
          </Button>
        </CardContent>

        {/* <CardFooter>
          <Button className="w-full">Sign In</Button>
        </CardFooter> */}
      </Card>
    </div>
  );
}
