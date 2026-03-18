"use client";

import { clientFormWrapper } from "@/schemas/client.schema";
import { ClientFormProps } from "@/types/client.types";
import { Field, FieldLabel } from "../ui/field";
import CustomInput from "../custom/custom.input";

const ClientForm = ({ onSubmit }: ClientFormProps) => {
  const form = clientFormWrapper();

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <div className="flex flex-row items-start gap-3">
          <Field>
            <FieldLabel>First Name</FieldLabel>
            <CustomInput />
          </Field>

          <Field>
            <FieldLabel>Last Name</FieldLabel>
            <CustomInput />
          </Field>
        </div>
      </div>
    </form>
  );
};

export default ClientForm;
