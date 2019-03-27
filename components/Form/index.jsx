import React, { useState, useEffect, useRef } from "react";
import { FormContext } from "./FormUtils";

export default function Form(props) {
  const [state, setState] = useState(props.data || {});
  const [errors, setErrors] = useState({});
  const context = {
    data: state,
    errors,
    onChange: onChange,
    setError: setError,
    removeError: removeError
  };

  function removeError({ name }) {
    delete errors[name];

    setErrors(errors);
  }

  function setError({ name, error }) {
    setErrors({
      ...errors,
      [name]: error
    });
  }

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
    props.onSubmit(state, errors);
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
