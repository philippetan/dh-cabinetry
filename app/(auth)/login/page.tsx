"use client";

import LoginForm from "@/components/forms/login.form";
import { Label } from "@/components/ui/label";
import { auth, db } from "@/config/FirebaseConfig";
import { LoginSchema } from "@/schemas/login.schema";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter();

  const onSubmit = async (data: LoginSchema) => {
    try {
      const signIn = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      const user = signIn.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (!userDoc.exists()) {
        toast.error("Account not found.");
        return;
      }

      const token = await user.getIdToken();
      document.cookie = `session=${token}; path=/; max-age=3600`;

      toast.success("Signed in successfully.");
      router.push("/admin/dashboard");
    } catch (error) {
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

      <LoginForm onSubmit={onSubmit} />
    </div>
  );
}
