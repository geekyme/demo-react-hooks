import React, { useContext, useState } from "react";

export const FormContext = React.createContext();

export function useValidator(validate, value) {
  if (typeof validate === "function") {
    return validate(value);
  } else if (validate === "number") {
    if (isNaN(value)) {
      return "Not a number";
    } else {
      return null;
    }
  } else {
    return null;
  }
}
export function useChangeHandler(props) {
  const context = useContext(FormContext);

  if (typeof context === "undefined") {
    const [state, setState] = useState("");
    return {
      onChange(e) {
        setState(e.target.value);
        if (typeof props.onChange === "function") {
          props.onChange(e);
        }
      },
      value: state
    };
  } else {
    if (typeof props.name === "undefined") {
      throw new Error("You must supply a 'name' prop if you are using <Form>");
    }
    return {
      onChange(e) {
        context.onChange(e);
      },
      value: context.data[props.name] || ""
    };
  }
}
