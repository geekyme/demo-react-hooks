import React, { useState, useEffect, useRef } from "react";
import { FormContext } from "./FormUtils";

export default function Form(props) {
  const [state, setState] = useState(props.data || {});
  const context = {
    data: state,
    onChange: onChange
  };

  async function onChange({ name, value }) {
    const changes = { [name]: value };
    const newState = { ...state, [name]: value };
    const alteredNewState = await props.onChange(state, newState, changes);

    if (typeof alteredNewState === "undefined") {
      setState(newState);
    } else {
      setState(alteredNewState);
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
