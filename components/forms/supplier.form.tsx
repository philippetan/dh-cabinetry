"use client";

import { SupplierFormProps } from "@/types/supplier.types";
import CustomInput from "../custom/custom.input";
import {
  Building,
  DoorOpen,
  Hash,
  Layers,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import CustomField from "../custom/custom.field";
import { useState } from "react";
import { getAddressByPostalCode } from "@/services/address.services";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";

const SupplierForm = ({ form, onSubmit }: SupplierFormProps) => {
  const [loadingAddress, setLoadingAddress] = useState<boolean>(false);

  const handlePostalCodeChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value.replace(/\D/g, "");
    e.target.value = value;
    form.register("address.postal_code").onChange(e);

    if (value.length === 6) {
      setLoadingAddress(true);
      try {
        const address = await getAddressByPostalCode(value);
        if (address) {
          form.setValue(
            "address.block_house_number",
            address.block_house_number || "",
          );
          form.setValue("address.street_name", address.street_name || "");
          form.setValue("address.building_name", address.building_name || "");
        } else {
          toast.error("No address found for this postal code.");
        }
      } catch (error) {
        console.error("Failed to fetch address:", error);
      } finally {
        setLoadingAddress(false);
      }
    } else {
      form.setValue("address.block_house_number", "");
      form.setValue("address.street_name", "");
      form.setValue("address.building_name", "");
      form.setValue("address.floor_number", "");
      form.setValue("address.unit_number", "");
    }
  };

  return (
    <form
      id="supplier-form"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="space-y-4">
        <CustomField
          label="Supplier Name"
          required
          error={form.errors.name?.message}
        >
          <CustomInput
            type="text"
            placeholder="Enter supplier name"
            icon={<User />}
            error={!!form.errors.name}
            readOnly={form.isSubmitting}
            {...form.register("name")}
          />
        </CustomField>

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
            label="Postal Code"
            error={form.errors.address?.postal_code?.message}
          >
            <CustomInput
              type="text"
              inputMode="numeric"
              placeholder="Enter postal code"
              icon={loadingAddress ? <Spinner /> : <Mail />}
              maxLength={6}
              error={!!form.errors.address?.postal_code}
              readOnly={form.isSubmitting || loadingAddress}
              {...form.register("address.postal_code")}
              onChange={handlePostalCodeChange}
            />
          </CustomField>

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
        </div>

        <div className="flex flex-row items-start gap-4">
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

        <div className="flex flex-row items-start gap-4">
          <CustomField label="Floor Number">
            <CustomInput
              type="text"
              placeholder="Enter floor number"
              icon={<Layers />}
              readOnly={form.isSubmitting}
              {...form.register("address.floor_number")}
            />
          </CustomField>

          <CustomField label="Unit Number">
            <CustomInput
              type="text"
              placeholder="Enter unit number"
              icon={<DoorOpen />}
              readOnly={form.isSubmitting}
              {...form.register("address.unit_number")}
            />
          </CustomField>
        </div>
      </div>
    </form>
  );
};

export default SupplierForm;
