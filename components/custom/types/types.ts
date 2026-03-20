import { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

export interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  align?: "inline-start" | "inline-end";
  error?: boolean;
  className?: string;
  multiline?: boolean;
  textareaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
}
