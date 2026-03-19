import { forwardRef } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { CustomInputProps } from "./types/types";
import { cn } from "@/lib/utils";

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ icon, align = "inline-start", error, className, ...props }, ref) => {
    return (
      <InputGroup
        className={cn(className, error && "border border-destructive")}
      >
        <InputGroupInput
          ref={ref}
          {...props}
        />
        <InputGroupAddon
          className={cn(error && "text-red-500")}
          align={align}
        >
          {icon}
        </InputGroupAddon>
      </InputGroup>
    );
  },
);

export default CustomInput;
