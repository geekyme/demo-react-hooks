import React, { useState, useEffect, useRef } from "react";
import { FormContext } from "./FormUtils";

export default function Form(props) {
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

  function onSubmit(e) {
    e.preventDefault();
    props.onSubmit(state);
  }

  function onReset() {
    setState(props.data || {});
  }

  return (
    <FormContext.Provider value={context}>
      <form onReset={onReset} onSubmit={onSubmit}>
        {props.children}
      </form>
    </FormContext.Provider>
  );
}
