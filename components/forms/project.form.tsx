"use client";

import { ProjectFormProps } from "@/types/project.types";
import { Card, CardContent, CardFooter } from "../ui/card";
import CustomField from "../custom/custom.field";
import CustomInput from "../custom/custom.input";
import { DollarSign, Hash, Minus, Plus, SquareChartGantt } from "lucide-react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox";
import { useEffect, useRef, useState } from "react";
import { subscribeToClients } from "@/services/project.services";
import CustomButton from "../custom/custom.button";
import ClientSheet from "@/app/admin/clients/components/client.sheet";
import DatePicker from "../custom/custom.datepicker";
import { Label } from "../ui/label";
import { useFieldArray } from "react-hook-form";
import { subscribeToInventory } from "@/services/project.services";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const ProjectForm = ({ form, onSubmit }: ProjectFormProps) => {
  const [clients, setClients] = useState<{ id: string; name: string }[]>([]);
  const [clientSheetOpen, setClientSheetOpen] = useState<boolean>(false);
  const [materialsOpen, setMaterialsOpen] = useState<boolean>(true);

  const materialsContentRef = useRef<HTMLDivElement>(null);

  const [inventory, setInventory] = useState<
    { id: string; name: string; quantity: number; price: string }[]
  >([]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "materials_used",
  });

  useEffect(() => {
    const unsubscribeClients = subscribeToClients(setClients);
    const unsubscribeInventory = subscribeToInventory(setInventory);

    return () => {
      unsubscribeClients();
      unsubscribeInventory();
    };
  }, []);

  useEffect(() => {
    const materials = form.watch("materials_used");
    const laborCost =
      parseFloat(form.watch("labor_cost")?.replace(/,/g, "") || "0") || 0;

    const materialsTotal = materials.reduce((sum, m) => {
      const qty = parseFloat(m.item_qty) || 0;
      const price = parseFloat(m.item_price) || 0;
      return sum + qty * price;
    }, 0);

    const total = laborCost + materialsTotal;

    form.setValue(
      "project_fee",
      total.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    );
  }, [form.watch("materials_used"), form.watch("labor_cost")]);

  return (
    <>
      <form
        id="project-form"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Card>
          <CardContent>
            <div className="space-y-4">
              <CustomField
                label="Project Name"
                required
                error={form.errors.project_name?.message}
              >
                <CustomInput
                  type="text"
                  icon={<SquareChartGantt />}
                  placeholder="Enter project name"
                  error={!!form.errors.project_name}
                  readOnly={form.isSubmitting}
                  {...form.register("project_name")}
                />
              </CustomField>

              <CustomField
                label="Project Description"
                error={form.errors.project_description?.message}
              >
                <CustomInput
                  type="text"
                  multiline
                  placeholder="Enter project description (optional)"
                  readOnly={form.isSubmitting}
                  error={!!form.errors.project_description}
                  {...form.register("project_description")}
                />
              </CustomField>

              <div className="flex flex-row items-start gap-4 w-full">
                <div
                  className={`flex flex-row gap-4 w-1/2 ${form.errors.client_id ? "items-center" : "items-end"}`}
                >
                  <CustomField
                    label="Client Name"
                    required
                    error={form.errors.client_id?.message}
                  >
                    <Combobox
                      items={clients}
                      value={
                        clients.find((c) => c.id === form.watch("client_id"))
                          ?.name ?? ""
                      }
                      onValueChange={(val) => {
                        const selected = clients.find((c) => c.name === val);
                        form.setValue("client_id", selected?.id ?? "");
                      }}
                    >
                      <ComboboxInput
                        placeholder="Select a client"
                        className={
                          form.errors.client_id?.message &&
                          "border border-destructive"
                        }
                        showClear={!!form.watch("client_id")}
                      />
                      <ComboboxContent>
                        <ComboboxEmpty>No client found.</ComboboxEmpty>
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
                    label="Add Client"
                    onClick={() => setClientSheetOpen(true)}
                  />
                </div>
                <div className="w-1/4">
                  <CustomField
                    label="Start Date"
                    required
                  >
                    <DatePicker
                      value={form.watch("start_date")}
                      onSelect={(date) =>
                        form.setValue("start_date", date ?? new Date())
                      }
                    />
                  </CustomField>
                </div>

                <div className="w-1/4">
                  <CustomField
                    label="Labor Cost"
                    required
                    error={form.errors.labor_cost?.message}
                  >
                    <CustomInput
                      type="text"
                      inputMode="numeric"
                      icon={<DollarSign />}
                      placeholder="Enter labor cost"
                      error={!!form.errors.labor_cost}
                      readOnly={form.isSubmitting}
                      {...form.register("labor_cost", {
                        onBlur: (e) => {
                          const value = parseFloat(
                            e.target.value.replace(/,/g, ""),
                          );

                          if (!isNaN(value)) {
                            form.setValue(
                              "labor_cost",
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

              {/* <CustomField
                label="Materials Used"
                required
              >
                <Accordion
                  type="single"
                  collapsible
                  defaultValue="materials"
                  className="w-full"
                >
                  <AccordionItem
                    value="materials"
                    className="border rounded-lg"
                  >
                    <AccordionTrigger className="px-4 py-3 cursor-pointer hover:no-underline">
                      <span className="text-sm font-medium">
                        {fields.length} material{fields.length !== 1 ? "s" : ""}{" "}
                        added
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="p-4">
                      <div className="grid grid-cols-[45%_15%_15%_15%_10%] items-center w-full gap-3">
                        <Label className="text-xs text-muted-foreground">
                          Material Name
                        </Label>
                        <Label className="text-xs text-muted-foreground">
                          Quantity
                        </Label>
                        <Label className="text-xs text-muted-foreground">
                          Price per pc.
                        </Label>
                        <Label className="text-xs text-muted-foreground">
                          Total
                        </Label>
                      </div>

                      {fields.map((field, index) => {
                        const selectedItem = inventory.find(
                          (i) =>
                            i.id ===
                            form.watch(`materials_used.${index}.inventory_id`),
                        );

                        return (
                          <div
                            key={field.id}
                            className="grid grid-cols-[45%_15%_15%_15%_10%] items-start w-full gap-3"
                          >
                            <CustomField
                              error={
                                form.errors.materials_used?.[index]
                                  ?.inventory_id?.message
                              }
                            >
                              <Combobox
                                items={inventory.filter((i) => {
                                  const selectedIds = form
                                    .watch("materials_used")
                                    .map((m) => m.inventory_id)
                                    .filter((_, idx) => idx !== index); // exclude current row
                                  return !selectedIds.includes(i.id);
                                })}
                                value={
                                  inventory.find(
                                    (i) =>
                                      i.id ===
                                      form.watch(
                                        `materials_used.${index}.inventory_id`,
                                      ),
                                  )?.name ?? ""
                                }
                                onValueChange={(val) => {
                                  const selected = inventory.find(
                                    (s) => s.name === val,
                                  );
                                  form.setValue(
                                    `materials_used.${index}.inventory_id`,
                                    selected?.id ?? "",
                                  );
                                  // Auto-populate price when item is selected
                                  form.setValue(
                                    `materials_used.${index}.item_price`,
                                    selected?.price ?? "",
                                  );
                                  // Reset quantity when item changes
                                  form.setValue(
                                    `materials_used.${index}.item_qty`,
                                    "",
                                  );
                                }}
                              >
                                <ComboboxInput
                                  placeholder="Enter material name"
                                  readOnly={form.isSubmitting}
                                  className={`${
                                    form.errors.materials_used?.[index]
                                      ?.inventory_id?.message &&
                                    "border border-destructive"
                                  }`}
                                  showClear={
                                    !!form.watch(
                                      `materials_used.${index}.inventory_id`,
                                    )
                                  }
                                />

                                <ComboboxContent>
                                  <ComboboxEmpty>
                                    No material found.
                                  </ComboboxEmpty>
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
                                form.errors.materials_used?.[index]?.item_qty
                                  ?.message
                              }
                            >
                              <CustomInput
                                type="text"
                                inputMode="numeric"
                                icon={<Hash />}
                                placeholder={
                                  selectedItem
                                    ? `Stock: ${selectedItem.quantity}`
                                    : "Enter quantity"
                                }
                                error={
                                  !!form.errors.materials_used?.[index]
                                    ?.item_qty
                                }
                                readOnly={form.isSubmitting}
                                {...form.register(
                                  `materials_used.${index}.item_qty`,
                                  {
                                    onChange: (e) => {
                                      if (!selectedItem) return;
                                      const inputQty =
                                        parseFloat(e.target.value) || 0;
                                      if (inputQty > selectedItem.quantity) {
                                        form.setError(
                                          `materials_used.${index}.item_qty`,
                                          {
                                            type: "manual",
                                            message: `Exceeds current stock (${selectedItem.quantity})`,
                                          },
                                        );
                                      } else if (inputQty > 0) {
                                        form.clearErrors(
                                          `materials_used.${index}.item_qty`,
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
                                icon={<DollarSign />}
                                className="pointer-events-none"
                                value={
                                  form.watch(
                                    `materials_used.${index}.item_price`,
                                  ) ?? ""
                                }
                              />
                            </CustomField>

                            <CustomField>
                              <CustomInput
                                readOnly
                                icon={<DollarSign />}
                                className="pointer-events-none"
                                value={(
                                  (parseFloat(
                                    form.watch(
                                      `materials_used.${index}.item_qty`,
                                    ),
                                  ) || 0) *
                                  (parseFloat(
                                    form.watch(
                                      `materials_used.${index}.item_price`,
                                    ),
                                  ) || 0)
                                ).toFixed(2)}
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
                        );
                      })}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CustomField> */}

              <CustomField
                label="Materials Used"
                required
              >
                <div className="flex flex-row items-start gap-4 w-full">
                  <Card className="w-full">
                    <CardContent>
                      <div className="grid grid-cols-[45%_15%_15%_15%_10%] items-center w-full gap-3">
                        <Label className="text-xs text-muted-foreground">
                          Material Name
                        </Label>
                        <Label className="text-xs text-muted-foreground">
                          Quantity
                        </Label>
                        <Label className="text-xs text-muted-foreground">
                          Price per pc.
                        </Label>
                        <Label className="text-xs text-muted-foreground">
                          Total
                        </Label>
                      </div>

                      {fields.map((field, index) => {
                        const selectedItem = inventory.find(
                          (i) =>
                            i.id ===
                            form.watch(`materials_used.${index}.inventory_id`),
                        );

                        return (
                          <div
                            key={field.id}
                            className="grid grid-cols-[45%_15%_15%_15%_10%] items-start w-full gap-3"
                          >
                            <CustomField
                              error={
                                form.errors.materials_used?.[index]
                                  ?.inventory_id?.message
                              }
                            >
                              <Combobox
                                items={inventory.filter((i) => {
                                  const selectedIds = form
                                    .watch("materials_used")
                                    .map((m) => m.inventory_id)
                                    .filter((_, idx) => idx !== index); // exclude current row
                                  return !selectedIds.includes(i.id);
                                })}
                                value={
                                  inventory.find(
                                    (i) =>
                                      i.id ===
                                      form.watch(
                                        `materials_used.${index}.inventory_id`,
                                      ),
                                  )?.name ?? ""
                                }
                                onValueChange={(val) => {
                                  const selected = inventory.find(
                                    (s) => s.name === val,
                                  );
                                  form.setValue(
                                    `materials_used.${index}.inventory_id`,
                                    selected?.id ?? "",
                                  );
                                  // Auto-populate price when item is selected
                                  form.setValue(
                                    `materials_used.${index}.item_price`,
                                    selected?.price ?? "",
                                  );
                                  // Reset quantity when item changes
                                  form.setValue(
                                    `materials_used.${index}.item_qty`,
                                    "",
                                  );
                                }}
                              >
                                <ComboboxInput
                                  placeholder="Enter material name"
                                  readOnly={form.isSubmitting}
                                  className={`${
                                    form.errors.materials_used?.[index]
                                      ?.inventory_id?.message &&
                                    "border border-destructive"
                                  }`}
                                  showClear={
                                    !!form.watch(
                                      `materials_used.${index}.inventory_id`,
                                    )
                                  }
                                />

                                <ComboboxContent>
                                  <ComboboxEmpty>
                                    No material found.
                                  </ComboboxEmpty>
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
                                form.errors.materials_used?.[index]?.item_qty
                                  ?.message
                              }
                            >
                              <CustomInput
                                type="text"
                                inputMode="numeric"
                                icon={<Hash />}
                                placeholder={
                                  selectedItem
                                    ? `Stock: ${selectedItem.quantity}`
                                    : "Enter quantity"
                                }
                                error={
                                  !!form.errors.materials_used?.[index]
                                    ?.item_qty
                                }
                                readOnly={form.isSubmitting}
                                {...form.register(
                                  `materials_used.${index}.item_qty`,
                                  {
                                    onChange: (e) => {
                                      if (!selectedItem) return;
                                      const inputQty =
                                        parseFloat(e.target.value) || 0;
                                      if (inputQty > selectedItem.quantity) {
                                        form.setError(
                                          `materials_used.${index}.item_qty`,
                                          {
                                            type: "manual",
                                            message: `Exceeds current stock (${selectedItem.quantity})`,
                                          },
                                        );
                                      } else if (inputQty > 0) {
                                        form.clearErrors(
                                          `materials_used.${index}.item_qty`,
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
                                icon={<DollarSign />}
                                className="pointer-events-none"
                                value={
                                  form.watch(
                                    `materials_used.${index}.item_price`,
                                  ) ?? ""
                                }
                              />
                            </CustomField>

                            <CustomField>
                              <CustomInput
                                readOnly
                                icon={<DollarSign />}
                                className="pointer-events-none"
                                value={(
                                  (parseFloat(
                                    form.watch(
                                      `materials_used.${index}.item_qty`,
                                    ),
                                  ) || 0) *
                                  (parseFloat(
                                    form.watch(
                                      `materials_used.${index}.item_price`,
                                    ),
                                  ) || 0)
                                ).toFixed(2)}
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
                        );
                      })}
                    </CardContent>
                  </Card>
                </div>
              </CustomField>

              <CustomButton
                type="button"
                variant="default"
                icon={<Plus />}
                label="Add Material"
                className="w-full"
                onClick={() =>
                  append({ inventory_id: "", item_qty: "", item_price: "" })
                }
              />

              {/* Project Breakdown */}
              <div className="space-y-2">
                <Label>Project Breakdown</Label>
                <Card>
                  <CardContent className="space-y-2 pt-4">
                    {/* Materials rows */}
                    {fields.map((field, index) => {
                      const name =
                        inventory.find(
                          (i) =>
                            i.id ===
                            form.watch(`materials_used.${index}.inventory_id`),
                        )?.name ?? `Material ${index + 1}`;
                      const qty =
                        parseFloat(
                          form.watch(`materials_used.${index}.item_qty`),
                        ) || 0;
                      const price =
                        parseFloat(
                          form.watch(`materials_used.${index}.item_price`),
                        ) || 0;
                      const total = qty * price;

                      if (!form.watch(`materials_used.${index}.inventory_id`))
                        return null;

                      return (
                        <div
                          key={field.id}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-muted-foreground">
                            {name} × {qty}
                          </span>
                          <span>
                            $
                            {total.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                      );
                    })}

                    {/* Divider */}
                    <div className="border-t pt-2 space-y-2">
                      {/* Labor Cost row */}
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Labor Cost
                        </span>
                        <span>
                          $
                          {(
                            parseFloat(
                              form.watch("labor_cost")?.replace(/,/g, "") ||
                                "0",
                            ) || 0
                          ).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>

                      {/* Total row */}
                      <div className="flex justify-between font-medium border-t pt-2">
                        <span>Project Fee</span>
                        <span>
                          $
                          {(
                            parseFloat(
                              form.watch("project_fee")?.replace(/,/g, "") ||
                                "0",
                            ) || 0
                          ).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
              form="project-form"
              label="Save Project"
              loading={form.isSubmitting}
            />
          </CardFooter>
        </Card>
      </form>

      <ClientSheet
        open={clientSheetOpen}
        onOpenChange={setClientSheetOpen}
        title="Add Client"
        description="Fill in the details below to add a new client."
        mode="add"
      />
    </>
  );
};

export default ProjectForm;
