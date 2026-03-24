import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { ButtonProps } from "./types/types";

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
