"use client";

import { ClientFormProps } from "@/types/client.types";
import { Field, FieldError, FieldLabel } from "../ui/field";
import CustomInput from "../custom/custom.input";
import { Mail, MapPin, Phone } from "lucide-react";

const ClientForm = ({ form, onSubmit }: ClientFormProps) => {
  return (
    <form
      id="client-form"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="space-y-4">
        <div className="flex flex-row items-start gap-4">
          <Field>
            <FieldLabel>
              First Name <span className="text-destructive">*</span>
            </FieldLabel>
            <CustomInput
              type="text"
              placeholder="Enter first name"
              error={!!form.errors.first_name}
              readOnly={form.isSubmitting}
              {...form.register("first_name")}
            />
            {form.errors.first_name && (
              <FieldError>{form.errors.first_name.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>
              Last Name <span className="text-destructive">*</span>
            </FieldLabel>
            <CustomInput
              type="text"
              placeholder="Enter last name"
              error={!!form.errors.last_name}
              readOnly={form.isSubmitting}
              {...form.register("last_name")}
            />
            {form.errors.last_name && (
              <FieldError>{form.errors.last_name.message}</FieldError>
            )}
          </Field>
        </div>

        <Field>
          <FieldLabel>
            Email Address <span className="text-destructive">*</span>
          </FieldLabel>
          <CustomInput
            type="email"
            placeholder="Enter email address"
            icon={<Mail />}
            error={!!form.errors.email_address}
            readOnly={form.isSubmitting}
            {...form.register("email_address")}
          />
          {form.errors.email_address && (
            <FieldError>{form.errors.email_address.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>
            Contact Number <span className="text-destructive">*</span>
          </FieldLabel>
          <CustomInput
            type="text"
            inputMode="numeric"
            placeholder="Enter contact number"
            icon={<Phone />}
            error={!!form.errors.contact_number}
            readOnly={form.isSubmitting}
            maxLength={13}
            {...form.register("contact_number", {
              onChange: (e) => {
                e.target.value = e.target.value
                  .replace(/[^0-9+]/g, "")
                  .replace(/(?!^)\+/g, "");
              },
            })}
          />
          {form.errors.contact_number && (
            <FieldError>{form.errors.contact_number.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>
            Address <span className="text-destructive">*</span>
          </FieldLabel>
          <CustomInput
            type="text"
            placeholder="Enter address"
            icon={<MapPin />}
            error={!!form.errors.address}
            readOnly={form.isSubmitting}
            {...form.register("address")}
          />
          {form.errors.address && (
            <FieldError>{form.errors.address.message}</FieldError>
          )}
        </Field>
      </div>
    </form>
  );
};

export default ClientForm;
