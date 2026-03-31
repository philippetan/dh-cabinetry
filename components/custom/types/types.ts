import { Button } from "@/components/ui/button";
import {
  ComponentProps,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";

export interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  align?: "inline-start" | "inline-end";
  error?: boolean;
  className?: string;
  multiline?: boolean;
  textareaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
  inputClassName?: string;
}

export interface CustomFieldProps {
  label?: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  description?: string;
  className?: string;
}

export interface ButtonProps extends ComponentProps<typeof Button> {
  icon?: ReactNode;
  label?: string;
  iconAlign?: "start" | "end";
  loading?: boolean;
  showSpinner?: boolean;
}
