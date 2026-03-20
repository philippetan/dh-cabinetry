"use client";

import { ClientFormProps } from "@/types/client.types";
import { Field, FieldError, FieldLabel } from "../ui/field";
import CustomInput from "../custom/custom.input";
import {
  Building,
  DoorOpen,
  Hash,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import CustomField from "../custom/custom.field";

const ClientForm = ({ form, onSubmit }: ClientFormProps) => {
  return (
    <form
      id="client-form"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="space-y-4">
        <div className="flex flex-row items-start gap-4">
          <CustomField
            label="First Name"
            required
            error={form.errors.first_name?.message}
          >
            <CustomInput
              type="text"
              placeholder="Enter first name"
              icon={<User />}
              error={!!form.errors.first_name}
              readOnly={form.isSubmitting}
              {...form.register("first_name")}
            />
          </CustomField>

          <CustomField
            label="Last Name"
            required
            error={form.errors.last_name?.message}
          >
            <CustomInput
              type="text"
              placeholder="Enter last name"
              icon={<User />}
              error={!!form.errors.last_name}
              readOnly={form.isSubmitting}
              {...form.register("last_name")}
            />
          </CustomField>
        </div>

        <CustomField
          label="Email Address"
          required
          error={form.errors.email_address?.message}
        >
          <CustomInput
            type="email"
            placeholder="Enter email address"
            icon={<Mail />}
            error={!!form.errors.email_address}
            readOnly={form.isSubmitting}
            {...form.register("email_address")}
          />
        </CustomField>

        <CustomField
          label="Contact Number"
          required
          error={form.errors.contact_number?.message}
        >
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
        </CustomField>

        <div className="flex flex-row items-start gap-4">
          <CustomField
            label="Block / House No."
            required
            error={form.errors.address?.block_house_number?.message}
          >
            <CustomInput
              type="text"
              placeholder="Enter block / house no."
              icon={<Hash />}
              error={!!form.errors.address?.block_house_number}
              readOnly={form.isSubmitting}
              {...form.register("address.block_house_number")}
            />
          </CustomField>

          <CustomField
            label="Street Name"
            required
            error={form.errors.address?.street_name?.message}
          >
            <CustomInput
              type="text"
              placeholder="Enter street name"
              icon={<MapPin />}
              error={!!form.errors.address?.street_name}
              readOnly={form.isSubmitting}
              {...form.register("address.street_name")}
            />
          </CustomField>
        </div>

        <div className="flex flex-row items-start gap-4">
          <CustomField label="Unit Number">
            <CustomInput
              type="text"
              placeholder="Enter unit number"
              icon={<DoorOpen />}
              readOnly={form.isSubmitting}
              {...form.register("address.unit_number")}
            />
          </CustomField>

          <CustomField
            label="Postal Code"
            error={form.errors.address?.postal_code?.message}
          >
            <CustomInput
              type="text"
              inputMode="numeric"
              placeholder="Enter postal code"
              icon={<Mail />}
              maxLength={6}
              error={!!form.errors.address?.postal_code}
              readOnly={form.isSubmitting}
              {...form.register("address.postal_code")}
            />
          </CustomField>
        </div>

        <CustomField label="Building Name">
          <CustomInput
            type="text"
            placeholder="Enter building name"
            icon={<Building />}
            readOnly={form.isSubmitting}
            {...form.register("address.building_name")}
          />
        </CustomField>
      </div>
    </form>
  );
};

export default ClientForm;
