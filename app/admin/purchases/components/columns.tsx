import CustomAlertDialog from "@/components/custom/custom.alert.dialog";
import CustomButton from "@/components/custom/custom.button";
import { Label } from "@/components/ui/label";
import { deletePurchase } from "@/services/purchase.services";
import { Purchases } from "@/types/purchase.types";
import { ColumnDef } from "@tanstack/react-table";
import { Timestamp } from "firebase/firestore";
import { ArrowUpDown, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useColumns = (): ColumnDef<Purchases>[] => {
  const router = useRouter();

  return [
    {
      accessorKey: "id",
      header: () => {
        return <Label className="font-bold">Purchase ID</Label>;
      },
      cell: ({ row }) => (
        <Label
          className="cursor-pointer hover:underline"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/admin/purchases/${row.original.id}`);
          }}
        >
          {row.original.id.slice(0, 15)}
        </Label>
      ),
    },
    {
      accessorKey: "supplier_name",
      header: ({ column }) => {
        return (
          <CustomButton
            className="font-bold"
            variant="ghost"
            label="Supplier Name"
            icon={<ArrowUpDown />}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        );
      },
    },
    {
      accessorKey: "purchase_date",
      header: ({ column }) => {
        return (
          <CustomButton
            className="font-bold"
            variant="ghost"
            label="Purchase Date"
            icon={<ArrowUpDown />}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        );
      },
      cell: ({ row }) => {
        const date = row.getValue("purchase_date") as Timestamp;
        return date?.toDate().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      },
    },
    {
      accessorKey: "total_cost",
      header: ({ column }) => {
        return (
          <CustomButton
            className="font-bold"
            variant="ghost"
            label="Total Cost"
            icon={<ArrowUpDown />}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        );
      },
      cell: ({ row }) => {
        const amount = Number(row.getValue("total_cost"));

        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
      },
    },
    {
      id: "actions",
      header: () => <div className="text-center">Action</div>,
      cell: ({ row }) => {
        const handleDelete = async () => {
          try {
            await deletePurchase(row.original.id);
            toast.success("Purchase deleted successfully.");
          } catch (error) {
            console.error("Error deleting purchase: ", error);
            toast.error("Failed to delete purchase. Please try again.");
          }
        };

        return (
          <div className="flex items-center justify-center">
            <CustomAlertDialog
              trigger={
                <CustomButton
                  size="icon-sm"
                  variant="destructive"
                  icon={<Trash />}
                />
              }
              title="Are you absolutely sure?"
              description="This action cannot be undone."
              onClick={handleDelete}
              confirmText="Confirm"
            />
          </div>
        );
      },
    },
  ];
};
