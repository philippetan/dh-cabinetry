import CustomAlertDialog from "@/components/custom/custom.alert.dialog";
import CustomButton from "@/components/custom/custom.button";
import { Label } from "@/components/ui/label";
import { completeProject, deleteProject } from "@/services/project.services";
import { Project } from "@/types/project.types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
      cell: ({ row }) => (
        <Label>
          $
          {parseFloat(row.original.project_fee).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Label>
      ),
    },
    {
      id: "status",
      accessorFn: (row) => {
        if (row.end_date !== null) return "Completed";
        const startDate = row.start_date?.toDate();
        const now = new Date();
        return startDate && now >= startDate ? "In Progress" : "Pending";
      },
      header: ({ column }) => (
        <CustomButton
          className="font-bold"
          variant="ghost"
          label="Status"
          icon={<ArrowUpDown />}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      ),
      cell: ({ row }) => {
        const endDate = row.original.end_date;
        const startDate = row.original.start_date?.toDate();
        const now = new Date();

        const status =
          endDate !== null
            ? "Completed"
            : startDate && now >= startDate
              ? "In Progress"
              : "Pending";

        const styles: Record<string, string> = {
          Pending: "bg-yellow-100 text-yellow-600",
          "In Progress": "bg-blue-100 text-blue-600",
          Completed: "bg-green-100 text-green-600",
        };

        return (
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${styles[status]}`}
          >
            {status}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="text-center">Actions</div>,
      cell: ({ row }) => {
        const isDone = row.original.end_date !== null;

        const handleDelete = async () => {
          try {
            await deleteProject(row.original.id);
            toast.success("Project deleted successfully!");
          } catch (error) {
            console.error("Error deleting project: ", error);
            toast.error("Failed to delete project. Please try again.");
          }
        };

        return (
          <div className="flex flex-row items-center justify-center gap-2">
            {!isDone ? (
              <>
                <CustomButton
                  size="icon-sm"
                  variant="outline"
                  icon={<Pencil />}
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/admin/projects/${row.original.id}`);
                  }}
                />

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

                <CustomButton
                  size="icon-sm"
                  icon={<Check />}
                  className="bg-green-300 text-green-800 hover:bg-green-400"
                  onClick={(e) => {
                    e.stopPropagation();
                    completeProject(row.original.id);
                  }}
                />
              </>
            ) : (
              <span className="text-sm text-muted-foreground">
                No action needed
              </span>
            )}
          </div>
        );
      },
    },
  ];
};
