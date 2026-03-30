import CustomAlertDialog from "@/components/custom/custom.alert.dialog";
import CustomButton from "@/components/custom/custom.button";
import { Label } from "@/components/ui/label";
import { completeProject } from "@/services/project.services";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export type Project = {
  id: string;
  project_name: string;
  client_id: string;
  start_date: any;
  project_fee: string;
  labor_cost: string;
  end_date: any;
};

export const useProjectColumns = (): ColumnDef<Project>[] => {
  const router = useRouter();
  return [
    {
      accessorKey: "project_name",
      header: ({ column }) => (
        <CustomButton
          className="font-bold"
          variant="ghost"
          label="Project Name"
          icon={<ArrowUpDown />}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      ),
      cell: ({ row }) => (
        <Label
          className="cursor-pointer hover:underline"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/admin/projects/${row.original.id}`);
          }}
        >
          {row.original.project_name}
        </Label>
      ),
    },
    {
      accessorKey: "start_date",
      header: ({ column }) => (
        <CustomButton
          className="font-bold"
          variant="ghost"
          label="Start Date"
          icon={<ArrowUpDown />}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      ),
      cell: ({ row }) => (
        <Label>
          {row.original.start_date?.toDate().toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </Label>
      ),
    },
    {
      accessorKey: "project_fee",
      header: ({ column }) => (
        <CustomButton
          className="font-bold"
          variant="ghost"
          label="Project Fee"
          icon={<ArrowUpDown />}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      ),
      cell: ({ row }) => <Label>${row.original.project_fee}</Label>,
    },
    {
      id: "status",
      header: () => <Label className="font-bold">Status</Label>,
      cell: ({ row }) => {
        const isDone = row.original.end_date !== null;
        return (
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              isDone
                ? "bg-green-100 text-green-600"
                : "bg-yellow-100 text-yellow-600"
            }`}
          >
            {isDone ? "Completed" : "Ongoing"}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="text-center">Actions</div>,
      cell: ({ row }) => {
        const isDone = row.original.end_date !== null;
        const handleDelete = async () => {};

        return (
          <div className="flex flex-row items-center justify-center gap-2">
            {!isDone && (
              <CustomButton
                size="icon-sm"
                variant="outline"
                icon={<Pencil />}
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/admin/projects/${row.original.id}`);
                }}
              />
            )}

            <CustomAlertDialog
              trigger={
                <CustomButton
                  size="icon-sm"
                  variant="destructive"
                  icon={<Trash />}
                  onClick={(e) => e.stopPropagation()}
                />
              }
              title="Are you absolutely sure?"
              description="This action cannot be undone."
              onClick={handleDelete}
              confirmText="Confirm"
            />
            {!isDone && (
              <CustomButton
                size="icon-sm"
                icon={<Check />}
                className="bg-green-300 text-green-800 hover:bg-green-400"
                onClick={(e) => {
                  e.stopPropagation();
                  completeProject(row.original.id);
                }}
              />
            )}
          </div>
        );
      },
    },
  ];
};
