import { InputHTMLAttributes, ReactNode } from "react";

export interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  align?: "inline-start" | "inline-end";
  error?: boolean;
}
