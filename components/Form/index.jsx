import React, { useState, useEffect, useRef } from "react";
import { FormContext } from "./FormUtils";

export default function Form(props) {
  const isInitialMount = useRef(true);
  const [state, setState] = useState(props.data || {});
  const context = {
    data: state,
    onChange: onChange
  };

  async function onChange({ name, value }) {
    const newState = { ...state, [name]: value };
    const alteredState = await props.onChange(state, newState);

    if (typeof alteredState === "undefined") {
      setState(newState);
    } else {
      setState(alteredState);
    }
  }

  function onReset() {
    setState({});
  }

  return (
    <FormContext.Provider value={context}>
      <form onReset={onReset}>{props.children}</form>
    </FormContext.Provider>
  );
}
