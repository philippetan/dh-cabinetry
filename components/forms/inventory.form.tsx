import { InventoryFormProps } from "@/types/inventory.types";
import CustomField from "../custom/custom.field";
import CustomInput from "../custom/custom.input";
import { Boxes, DollarSign, Package, Ruler } from "lucide-react";

const InventoryForm = ({ form, onSubmit }: InventoryFormProps) => {
  return (
    <form
      id="inventory-form"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="space-y-4">
        <CustomField
          label="Material Name"
          required
          error={form.errors.item_name?.message}
        >
          <CustomInput
            type="text"
            placeholder="e.g. Door Hinge"
            icon={<Package />}
            error={!!form.errors.item_name}
            readOnly={form.isSubmitting}
            {...form.register("item_name")}
          />
        </CustomField>

        <div className="flex flex-row items-start gap-4">
          <CustomField
            label="Item Unit"
            required
            error={form.errors.item_unit?.message}
          >
            <CustomInput
              type="text"
              placeholder="e.g. pcs, sheets"
              icon={<Ruler />}
              error={!!form.errors.item_unit}
              readOnly={form.isSubmitting}
              {...form.register("item_unit")}
            />
          </CustomField>

          <CustomField
            label="Item Stock"
            required
            error={form.errors.item_stock?.message}
          >
            <CustomInput
              type="text"
              placeholder="e.g. 10"
              icon={<Boxes />}
              error={!!form.errors.item_stock}
              readOnly={form.isSubmitting}
              {...form.register("item_stock", { valueAsNumber: true })}
            />
          </CustomField>
        </div>

        <div>
          <CustomField
            label="Price"
            required
          >
            <CustomInput
              type="text"
              inputMode="numeric"
              icon={<DollarSign />}
              placeholder="Enter price"
              error={!!form.errors.item_price}
              readOnly={form.isSubmitting}
              {...form.register("item_price", {
                onBlur: (e) => {
                  const value = parseFloat(e.target.value.replace(/,/g, ""));
                  if (!isNaN(value)) {
                    form.setValue(
                      "item_price",
                      value.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }),
                    );
                  }
                },
              })}
            />
          </CustomField>
        </div>
      </div>
    </form>
  );
};

export default InventoryForm;
