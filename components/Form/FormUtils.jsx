import React, { useContext, useState } from "react";

function getValue(e, type) {
  if (type === "checkbox") {
    return e.target.checked;
  } else {
    return e.target.value;
  }
}

function getInputValueProp(state, type) {
  let prop, inputState;

  if (type === "checkbox" || type === "radio") {
    prop = "checked";
    inputState = state || false;
  } else {
    prop = "value";
    inputState = state || "";
  }

  return {
    [prop]: inputState
  };
}

function setValue(value, type, other) {
  if (type === "checkbox" || type === "radio") {
    return {
      target: {
        checked: value,
        ...other
      }
    };
  } else {
    return {
      target: {
        value,
        ...other
      }
    };
  }
}

export const FormContext = React.createContext();

export function useValidator(validate, { value }) {
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
  const context = useContext(FormContext);

  if (typeof context === "undefined") {
    const [state, setState] = useState(opts.initialState);
    function onChange(e) {
      setState(getValue(e, opts.type));
      if (typeof props.onChange === "function") {
        props.onChange(e);
      }
    }
    return {
      onChange,
      onSetValue(value) {
        onChange(setValue(value, opts.type));
      },
      value: getInputValueProp(state, opts.type)
    };
  } else {
    if (typeof props.name === "undefined") {
      throw new Error("You must supply a 'name' prop if you are using <Form>");
    }

    function onChange(e) {
      context.onChange({
        name: props.name,
        value: getValue(e, opts.type)
      });
    }
    return {
      onChange,
      onSetValue(value) {
        onChange(setValue(value, opts.type, { name: props.name }));
      },
      value: getInputValueProp(context.data[props.name], opts.type)
    };
  }
}
