import { NextPage } from "next";
import { Dispatch, SetStateAction } from "react";
import TextField from "@mui/material/TextField";

type InputFieldProps = {
  name: string;
  type: string;
  state: string;
  stateHook: Dispatch<SetStateAction<string>>;
  required: boolean;
  multiline: boolean;
};

const InputField: NextPage<InputFieldProps> = ({
  name,
  state,
  type,
  stateHook,
  required,
  multiline,
}: InputFieldProps) => {
  return (
    <TextField
      fullWidth
      multiline={multiline}
      label={name}
      id={name}
      type={type}
      value={state}
      onChange={({ target: { value } }) => stateHook(value)}
      required={required}
      error={(state === "" && type !== "url")}
      helperText={(state === "" && type !== "url") ? "Empty!" : " "}
      className="m-2 border-black"
    />
  );
};

export default InputField;
