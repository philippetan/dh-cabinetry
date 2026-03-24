import { PurchaseFormProps } from "@/types/purchase.types";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox";
import CustomField from "../custom/custom.field";
import { Card, CardContent } from "../ui/card";
import CustomButton from "../custom/custom.button";
import SupplierSheet from "@/app/admin/suppliers/components/supplier.sheet";
import DatePicker from "../custom/custom.datepicker";

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"];

const PurchaseForm = ({ form, onSubmit }: PurchaseFormProps) => {
  return (
    <form
      id="purchase-form"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Card>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-row items-start justify-between gap-4">
              <div className="flex flex-row items-end gap-4 max-w-lg">
                <CustomField
                  label="Supplier"
                  required
                >
                  <Combobox items={frameworks}>
                    <ComboboxInput placeholder="Select a supplier" />
                    <ComboboxContent>
                      <ComboboxEmpty>No supplier found.</ComboboxEmpty>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem
                            key={item}
                            value={item}
                          >
                            {item}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </CustomField>

                <SupplierSheet
                  trigger={<CustomButton label="Add Supplier" />}
                  title="Add Supplier"
                  description="Fill in the details below to add a new supplier."
                  mode="add"
                />
              </div>

              <div className="w-64">
                <CustomField label="Date of purchase">
                  <DatePicker />
                </CustomField>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default PurchaseForm;
