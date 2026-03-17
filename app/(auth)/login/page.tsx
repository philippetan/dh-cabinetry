"use client";

import CustomInput from "@/components/custom/custom.input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { auth, db } from "@/config/FirebaseConfig";
import { loginFormWrapper, LoginSchema } from "@/schemas/login.schema";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { LockKeyhole, LogIn, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Login() {
  const form = loginFormWrapper();
  const router = useRouter();

  const onSubmit = async (data: LoginSchema) => {
    try {
      const signIn = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      const user = signIn.user;
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        toast.error("Account not found.");
        return;
      }

      const token = await user.getIdToken();
      document.cookie = `session=${token}; path=/; max-age=3600`;

      toast.success("Signed in successfully.");
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Error logging in: ", error);
      if (error instanceof FirebaseError) {
        toast.error(
          error.code === "auth/invalid-credential"
            ? "Please check your email and password."
            : "Something went wrong. Please try again.",
        );
      }
    }
  };

  return (
    <div className="w-full space-y-10">
      <div className="flex flex-col items-center gap-2">
        <Label className="font-bold text-2xl">Dazzling Home</Label>
        <Label className="font-normal text-gray-600">
          Administrative Management Portal
        </Label>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">Sign In</CardTitle>
            <CardDescription>Please enter your credentials.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Field>
              <FieldLabel>Email Address</FieldLabel>
              <CustomInput
                placeholder="admin@example.com"
                icon={<Mail />}
                error={!!form.errors.email}
                readOnly={form.isSubmitting}
                {...form.register("email")}
              />
              {form.errors.email && (
                <FieldError>{form.errors.email.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel>Password</FieldLabel>
              <CustomInput
                type="password"
                placeholder="Enter your password"
                icon={<LockKeyhole />}
                error={!!form.errors.password}
                readOnly={form.isSubmitting}
                {...form.register("password")}
              />
              {form.errors.password && (
                <FieldError>{form.errors.password.message}</FieldError>
              )}
            </Field>

            <Button
              type="submit"
              size="lg"
              className="w-full mt-5 cursor-pointer"
              disabled={form.isSubmitting}
            >
              {form.isSubmitting && <Spinner />} Sign In <LogIn />
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
