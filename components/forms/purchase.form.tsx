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
import { DollarSign, Hash, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import {
  subscribeToInventory,
  subscribeToSuppliers,
} from "@/services/purchase.services";
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
  const [inventorySheetOpen, setInventorySheetOpen] = useState<boolean>(false);
  const [supplierSheetOpen, setSupplierSheetOpen] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribeSuppliers = subscribeToSuppliers(setSuppliers);
    const unsubscribeInventory = subscribeToInventory(setInventory);
    return () => {
      unsubscribeSuppliers();
      unsubscribeInventory();
    };
  }, []);

  const items = form.watch("items_purchased");

  const totalCost = items.reduce((sum, item) => {
    const qty = parseFloat(item.item_qty) || 0;
    const price = parseFloat(item.item_price?.replace(/,/g, "")) || 0;
    return sum + qty * price;
  }, 0);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items_purchased",
  });

  return (
    <>
      <form
        id="purchase-form"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Card>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-row items-start gap-4 w-full">
                <div
                  className={`flex flex-row gap-4 w-[65%] ${form.errors.supplier_id?.message ? "items-center" : "items-end"}`}
                >
                  <CustomField
                    label="Supplier"
                    required
                    error={form.errors.supplier_id?.message}
                  >
                    <Combobox
                      items={suppliers}
                      value={
                        suppliers.find(
                          (s) => s.id === form.watch("supplier_id"),
                        )?.name ?? ""
                      }
                      onValueChange={(val) => {
                        const selected = suppliers.find((s) => s.name === val);
                        form.setValue("supplier_id", selected?.id ?? "");
                      }}
                    >
                      <ComboboxInput
                        placeholder="Select a supplier"
                        className={
                          form.errors.supplier_id?.message &&
                          "border border-destructive"
                        }
                        showClear={!!form.watch("supplier_id")}
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

                  <CustomButton
                    type="button"
                    label="Add Supplier"
                    onClick={() => setSupplierSheetOpen(true)}
                  />
                </div>

                <div className="w-[20%]">
                  <CustomField
                    label="Date of purchase"
                    required
                    error={form.errors.purchase_date?.message}
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
                      value={totalCost.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
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
                            value={
                              inventory.find(
                                (i) =>
                                  i.id ===
                                  form.watch(
                                    `items_purchased.${index}.inventory_id`,
                                  ),
                              )?.name ?? ""
                            }
                            onValueChange={(val) => {
                              const selected = inventory.find(
                                (s) => s.name === val,
                              );
                              form.setValue(
                                `items_purchased.${index}.inventory_id`,
                                selected?.id ?? "",
                              );
                            }}
                          >
                            <ComboboxInput
                              placeholder="Enter item name"
                              readOnly={form.isSubmitting}
                              className={`${
                                form.errors.items_purchased?.[index]
                                  ?.inventory_id?.message &&
                                "border border-destructive"
                              }`}
                              showClear={
                                !!form.watch(
                                  `items_purchased.${index}.inventory_id`,
                                )
                              }
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
                                  const value = parseFloat(
                                    e.target.value.replace(/,/g, ""),
                                  );
                                  if (!isNaN(value)) {
                                    form.setValue(
                                      `items_purchased.${index}.item_price`,
                                      value.toLocaleString("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      }),
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
                                form.watch(
                                  `items_purchased.${index}.item_qty`,
                                ) || "0",
                              ) *
                              parseFloat(
                                form
                                  .watch(`items_purchased.${index}.item_price`)
                                  ?.replace(/,/g, "") || "0",
                              )
                            ).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
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
                  <CustomButton
                    type="button"
                    variant="default"
                    label="Add item to inventory"
                    onClick={() => setInventorySheetOpen(true)}
                  />

                  <CustomButton
                    type="button"
                    variant="outline"
                    icon={<Plus />}
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
              disabled={form.isSubmitting}
            />
            <CustomButton
              type="submit"
              form="purchase-form"
              label="Save Purchase"
              loading={form.isSubmitting}
            />
          </CardFooter>
        </Card>
      </form>

      <InventorySheet
        open={inventorySheetOpen}
        onOpenChange={setInventorySheetOpen}
        title="Add Item"
        description="Fill in the details below to add a new item to the inventory."
        mode="add"
      />

      <SupplierSheet
        open={supplierSheetOpen}
        onOpenChange={setSupplierSheetOpen}
        title="Add Supplier"
        description="Fill in the details below to add a new supplier."
        mode="add"
      />
    </>
  );
};

export default PurchaseForm;
