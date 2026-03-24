import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { CustomFieldProps } from "./types/types";

const CustomField = ({
  label,
  required,
  error,
  children,
  description,
}: CustomFieldProps) => {
  return (
    <Field>
      <FieldLabel>
        {label} {required && <span className="text-destructive">*</span>}
      </FieldLabel>
      {children}
      {description && <FieldDescription>{description}</FieldDescription>}
      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
};

export default CustomField;
