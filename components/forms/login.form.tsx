"use client";

import CustomInput from "@/components/custom/custom.input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { loginFormWrapper } from "@/schemas/login.schema";
import { LoginFormProps } from "@/types/login.types";
import { LockKeyhole, LogIn, Mail } from "lucide-react";
import CustomButton from "../custom/custom.button";

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
