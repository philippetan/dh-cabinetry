"use client";

import CustomInput from "@/components/custom/custom.input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { loginFormWrapper } from "@/schemas/login.schema";
import { LoginFormProps } from "@/types/login.types";
import { LockKeyhole, LogIn, Mail } from "lucide-react";
import CustomButton from "../custom/custom.button";
import CustomField from "../custom/custom.field";

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const form = loginFormWrapper();

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle className="font-bold">Sign In</CardTitle>
          <CardDescription>Please enter your credentials.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <CustomField
            label="Email Address"
            required
            error={form.errors.email?.message}
          >
            <CustomInput
              type="email"
              placeholder="admin@example.com"
              icon={<Mail />}
              error={!!form.errors.email}
              readOnly={form.isSubmitting}
              {...form.register("email")}
            />
          </CustomField>

          <CustomField
            label="Password"
            required
            error={form.errors.password?.message}
          >
            <CustomInput
              type="password"
              placeholder="Enter your password"
              icon={<LockKeyhole />}
              error={!!form.errors.password}
              readOnly={form.isSubmitting}
              {...form.register("password")}
            />
          </CustomField>

          <CustomButton
            type="submit"
            size="lg"
            className="w-full mt-5"
            icon={<LogIn />}
            iconAlign="end"
            label="Sign In"
            loading={form.isSubmitting}
          />
        </CardContent>
      </Card>
    </form>
  );
};

export default LoginForm;
