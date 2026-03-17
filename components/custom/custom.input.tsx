import React, { ReactNode } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { CustomInputProps } from "./types/types";

const CustomInput = ({
  placeholder,
  icon,
  align = "inline-start",
}: CustomInputProps) => {
  return (
    <InputGroup>
      <InputGroupInput placeholder={placeholder} />
      <InputGroupAddon align={align}>{icon}</InputGroupAddon>
    </InputGroup>
  );
};

export default CustomInput;
