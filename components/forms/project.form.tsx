"use client";

import { ProjectFormProps } from "@/types/project.types";
import { Card, CardContent } from "../ui/card";
import CustomField from "../custom/custom.field";
import CustomInput from "../custom/custom.input";
import { SquareChartGantt } from "lucide-react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox";
import { useEffect, useState } from "react";
import { subscribeToClients } from "@/services/project.services";

const ProjectForm = ({ form, onSubmit }: ProjectFormProps) => {
  const [clients, setClients] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const unsubscribeClients = subscribeToClients(setClients);

    return () => unsubscribeClients();
  }, []);

  return (
    <>
      <form
        id="project-form"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Card>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col gap-4 w-1/2">
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

                <div className="flex flex-row items-end gap-4">
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
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </>
  );
};

export default ProjectForm;
