import React, { useContext, useState, useEffect } from "react";

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

export function useHandler(props, opts) {
  const [pristine, setPristine] = useState(true);
  const context = useContext(FormContext);

  if (typeof context === "undefined") {
    const [state, setState] = useState(opts.initialState);
    function onChange(e) {
      if (pristine) {
        setPristine(false);
      }
      const state = opts.getElementValue
        ? opts.getElementValue(e)
        : e.target.value;
      setState(state);
      if (typeof props.onChange === "function") {
        props.onChange(e);
      }
    }

    return {
      onChange,
      onSetValue(e) {
        onChange(e);
      },
      value: opts.transformValue ? opts.transformValue(state) : state,
      pristine
    };
  } else {
    if (typeof props.name === "undefined") {
      throw new Error("You must supply a 'name' prop if you are using <Form>");
    }

    function onChange(e) {
      if (pristine) {
        setPristine(false);
      }

      const state = opts.getElementValue
        ? opts.getElementValue(e)
        : e.target.value;
      context.onChange({
        name: props.name,
        value: state
      });
    }

    const state = context.data[props.name];

    return {
      onChange,
      onSetValue(e) {
        onChange(e, name);
      },
      value: opts.transformValue ? opts.transformValue(state) : state,
      pristine
    };
  }
}
