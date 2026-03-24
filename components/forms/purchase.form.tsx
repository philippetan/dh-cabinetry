"use client";

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
import { Card, CardContent, CardFooter } from "../ui/card";
import CustomButton from "../custom/custom.button";
import SupplierSheet from "@/app/admin/suppliers/components/supplier.sheet";
import DatePicker from "../custom/custom.datepicker";
import CustomInput from "../custom/custom.input";
import { DollarSign, Hash, Minus } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchInventory, fetchSuppliers } from "@/services/purchase.services";
import { useFieldArray } from "react-hook-form";
import InventorySheet from "@/app/admin/inventory/components/inventory.sheet";
import { Label } from "../ui/label";

const PurchaseForm = ({ form, onSubmit }: PurchaseFormProps) => {
  const [suppliers, setSuppliers] = useState<{ id: string; name: string }[]>(
    [],
  );
  const [inventory, setInventory] = useState<{ id: string; name: string }[]>(
    [],
  );

  useEffect(() => {
    fetchSuppliers().then(setSuppliers);
    fetchInventory().then(setInventory);
  }, []);

  const items = form.watch("items_purchased");

  const totalCost = items.reduce((sum, item) => {
    const qty = parseFloat(item.item_qty) || 0;
    const price = parseFloat(item.item_price) || 0;
    return sum + qty * price;
  }, 0);

  useEffect(() => {
    form.setValue("total_cost", totalCost.toFixed(2));
  }, [totalCost]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items_purchased",
  });

  return (
    <form
      id="purchase-form"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Card>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-row items-start gap-4 w-full">
              <div
                className={`flex flex-row gap-4 w-[65%] ${form.errors.supplierId?.message ? "items-center" : "items-end"}`}
              >
                <CustomField
                  label="Supplier"
                  required
                  error={form.errors.supplierId?.message}
                >
                  <Combobox
                    items={suppliers}
                    value={form.watch("supplierId")}
                    onValueChange={(val) =>
                      form.setValue("supplierId", val ?? "")
                    }
                  >
                    <ComboboxInput
                      placeholder="Select a supplier"
                      readOnly={form.isSubmitting}
                      className={
                        form.errors.supplierId?.message &&
                        "border border-destructive"
                      }
                    />
                    <ComboboxContent>
                      <ComboboxEmpty>No supplier found.</ComboboxEmpty>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem
                            key={item.id}
                            value={item.name}
                            className="cursor-pointer"
                          >
                            {item.name}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </CustomField>

                <SupplierSheet
                  trigger={
                    <CustomButton
                      type="button"
                      label="Add Supplier"
                    />
                  }
                  title="Add Supplier"
                  description="Fill in the details below to add a new supplier."
                  mode="add"
                />
              </div>

              <div className="w-[20%]">
                <CustomField
                  label="Date of purchase"
                  required
                >
                  <DatePicker
                    value={form.watch("purchase_date")}
                    onSelect={(date) =>
                      form.setValue("purchase_date", date ?? new Date())
                    }
                  />
                </CustomField>
              </div>

              <div className="w-[15%]">
                <CustomField label="Total Cost">
                  <CustomInput
                    readOnly
                    icon={<DollarSign />}
                    value={totalCost.toFixed(2)}
                    className="pointer-events-none"
                  />
                </CustomField>
              </div>
            </div>

            <div className="space-y-4">
              <Card className="w-full">
                <CardContent className="space-y-4 ">
                  <div className="grid grid-cols-[45%_15%_15%_15%_10%] items-center w-full gap-3">
                    <Label className="text-xs text-muted-foreground">
                      Item Name
                    </Label>
                    <Label className="text-xs text-muted-foreground">
                      Quantity
                    </Label>
                    <Label className="text-xs text-muted-foreground">
                      Item Price
                    </Label>
                    <Label className="text-xs text-muted-foreground">
                      Total
                    </Label>
                    <div />
                  </div>

                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="grid grid-cols-[45%_15%_15%_15%_10%] items-start w-full gap-3"
                    >
                      <CustomField
                        error={
                          form.errors.items_purchased?.[index]?.inventory_id
                            ?.message
                        }
                      >
                        <Combobox
                          items={inventory}
                          value={form.watch(
                            `items_purchased.${index}.inventory_id`,
                          )}
                          onValueChange={(val) =>
                            form.setValue(
                              `items_purchased.${index}.inventory_id`,
                              val ?? "",
                            )
                          }
                        >
                          <ComboboxInput
                            placeholder="Enter item name"
                            readOnly={form.isSubmitting}
                            className={`${
                              form.errors.items_purchased?.[index]?.inventory_id
                                ?.message && "border border-destructive"
                            }`}
                          />
                          <ComboboxContent>
                            <ComboboxEmpty>No item found.</ComboboxEmpty>
                            <ComboboxList>
                              {(item) => (
                                <ComboboxItem
                                  key={item.id}
                                  value={item.name}
                                  className="cursor-pointer"
                                >
                                  {item.name}
                                </ComboboxItem>
                              )}
                            </ComboboxList>
                          </ComboboxContent>
                        </Combobox>
                      </CustomField>

                      <CustomField
                        error={
                          form.errors.items_purchased?.[index]?.item_qty
                            ?.message
                        }
                      >
                        <CustomInput
                          type="text"
                          inputMode="numeric"
                          icon={<Hash />}
                          placeholder="Enter quantity"
                          error={
                            !!form.errors.items_purchased?.[index]?.item_qty
                          }
                          readOnly={form.isSubmitting}
                          {...form.register(
                            `items_purchased.${index}.item_qty`,
                          )}
                        />
                      </CustomField>

                      <CustomField
                        error={
                          form.errors.items_purchased?.[index]?.item_price
                            ?.message
                        }
                      >
                        <CustomInput
                          type="text"
                          inputMode="numeric"
                          icon={<DollarSign />}
                          placeholder="Enter price"
                          error={
                            !!form.errors.items_purchased?.[index]?.item_price
                          }
                          readOnly={form.isSubmitting}
                          {...form.register(
                            `items_purchased.${index}.item_price`,
                            {
                              onBlur: (e) => {
                                const value = parseFloat(e.target.value);
                                if (!isNaN(value)) {
                                  form.setValue(
                                    `items_purchased.${index}.item_price`,
                                    value.toFixed(2),
                                  );
                                }
                              },
                            },
                          )}
                        />
                      </CustomField>

                      <CustomField>
                        <CustomInput
                          readOnly
                          value={(
                            parseFloat(
                              form.watch(`items_purchased.${index}.item_qty`) ||
                                "0",
                            ) *
                            parseFloat(
                              form.watch(
                                `items_purchased.${index}.item_price`,
                              ) || "0",
                            )
                          ).toFixed(2)}
                          icon={<DollarSign />}
                          className="pointer-events-none"
                        />
                      </CustomField>

                      <CustomField className="w-fit">
                        <CustomButton
                          type="button"
                          variant="destructive"
                          icon={<Minus />}
                          onClick={() => remove(index)}
                          disabled={fields.length === 1}
                        />
                      </CustomField>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="flex flex-row items-center justify-between gap-4 w-full">
                <InventorySheet
                  trigger={
                    <CustomButton
                      type="button"
                      variant="default"
                      label="Add item to inventory"
                    />
                  }
                  title="Add Item"
                  description="Fill in the details below to add a new item to the inventory."
                  mode="add"
                />

                <CustomButton
                  type="button"
                  variant="outline"
                  label="Add Item Purchase"
                  className="w-[75%]"
                  onClick={() =>
                    append({ inventory_id: "", item_qty: "", item_price: "" })
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex gap-3 justify-end">
          <CustomButton
            type="button"
            label="Clear"
            variant="outline"
            className="w-30"
            onClick={() => form.reset()}
          />
          <CustomButton
            type="submit"
            label="Save Purchase"
          />
        </CardFooter>
      </Card>
    </form>
  );
};

export default PurchaseForm;
