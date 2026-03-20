import { ReactNode } from "react";
import { Field, FieldError, FieldLabel } from "../ui/field";

interface CustomFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}

const CustomField = ({
  label,
  required,
  error,
  children,
}: CustomFieldProps) => {
  return (
    <Field>
      <FieldLabel>
        {label} {required && <span className="text-destructive">*</span>}
      </FieldLabel>
      {children}
      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
};

export default CustomField;
