import { NextPage } from "next";
import { Dispatch, SetStateAction } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

type InputFieldProps = {
  name: string;
  type: string;
  state: string;
  stateHook: Dispatch<SetStateAction<string>>;
  required: boolean;
};

const InputField: NextPage<InputFieldProps> = ({
  name,
  state,
  type,
  stateHook,
  required,
}: InputFieldProps) => {
  return (
      <TextField
        fullWidth
        label={name}
        id={name}
        type={type}
        value={state}
        onChange={({ target: { value } }) => stateHook(value)}
        required={required}
        className="m-2"
      />
  );
};

export default InputField;
