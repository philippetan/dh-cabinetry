import { cn } from "@/lib/utils";
import { ComponentProps, ReactNode } from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

interface ButtonProps extends ComponentProps<typeof Button> {
  icon?: ReactNode;
  label?: string;
  iconAlign?: "start" | "end";
  loading?: boolean;
  showSpinner?: boolean;
}

const CustomButton = ({
  icon,
  label,
  iconAlign = "start",
  loading,
  className,
  showSpinner = true,
  ...props
}: ButtonProps) => {
  const spinner = loading && showSpinner && <Spinner />;

  return (
    <Button
      disabled={loading || props.disabled}
      className={cn("cursor-pointer", className)}
      {...props}
    >
      {iconAlign === "end" ? (
        <>
          {spinner} {label} {icon}
        </>
      ) : (
        <>
          {icon} {label} {spinner}
        </>
      )}
    </Button>
  );
};

export default CustomButton;
