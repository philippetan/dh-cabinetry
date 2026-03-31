import { forwardRef } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
} from "../ui/input-group";
import { CustomInputProps } from "./types/types";
import { cn } from "@/lib/utils";

const CustomInput = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  CustomInputProps
>(
  (
    {
      icon,
      align = "inline-start",
      error,
      className,
      multiline,
      textareaProps,
      inputClassName,
      ...props
    },
    ref,
  ) => {
    return (
      <InputGroup
        className={cn(className, error && "border border-destructive")}
      >
        {multiline ? (
          <InputGroupTextarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={cn("text-sm", inputClassName)}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            {...textareaProps}
          />
        ) : (
          <InputGroupInput
            ref={ref as React.Ref<HTMLInputElement>}
            className={cn("text-sm", inputClassName)}
            {...props}
          />
        )}
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
