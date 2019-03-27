import React, { useContext, useState, useEffect } from "react";

export const FormContext = React.createContext();

export function useValidator({ name, validate, value }) {
  const context = useContext(FormContext);
  const error = getError(validate, value);

  useEffect(() => {
    if (typeof context !== "undefined") {
      if (error !== null) {
        context.setError({ name, error });
      } else {
        context.removeError({ name });
      }
    }
  }, [value]);

  return error;

  function getError(validate, value) {
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
}

export function useHandler(opts) {
  const context = useContext(FormContext);

  if (typeof context === "undefined") {
    const [pristine, setPristine] = useState(true);
    const [state, setState] = useState(opts.initialState);
    function onChange(e) {
      if (pristine) {
        setPristine(false);
      }
      const state = opts.getElementValue
        ? opts.getElementValue(e)
        : e.target.value;
      setState(state);
      if (typeof opts.onChange === "function") {
        opts.onChange(e);
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
    if (typeof opts.name === "undefined") {
      throw new Error("You must supply a 'name' prop if you are using <Form>");
    }

    const pristine = !context.dirties[opts.name];

    function onChange(e) {
      if (pristine) {
        context.setDirty(opts.name);
      }

      const state = opts.getElementValue
        ? opts.getElementValue(e)
        : e.target.value;
      context.onChange({
        name: opts.name,
        value: state
      });
    }

    const state =
      typeof context.data[opts.name] === "undefined"
        ? opts.initialState
        : context.data[opts.name];

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
