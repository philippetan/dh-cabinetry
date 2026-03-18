import { cn } from "@/lib/utils";
import { ComponentProps, ReactNode } from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

interface ButtonProps extends ComponentProps<typeof Button> {
  icon?: ReactNode;
  label: string;
  iconAlign?: "start" | "end";
  loading?: boolean;
}

const CustomButton = ({
  icon,
  label,
  iconAlign = "start",
  loading,
  className,
  ...props
}: ButtonProps) => {
  return (
    <Button
      disabled={loading || props.disabled}
      className={cn("cursor-pointer", className)}
      {...props}
    >
      {iconAlign === "end" ? (
        <>
          {loading && <Spinner />} {label} {icon}
        </>
      ) : (
        <>
          {icon} {label} {loading && <Spinner />}
        </>
      )}
    </Button>
  );
};

export default CustomButton;
