import React, { useState, useEffect, useRef } from "react";
import { FormContext } from "./FormUtils";

export default function Form(props) {
  const [state, setState] = useState(props.data || {});
  const [errors, setErrors] = useState({});
  const [dirties, setDirties] = useState({});
  const context = {
    data: state,
    dirties,
    errors,
    setField: setField,
    setError: setError,
    removeError: removeError,
    setDirty: setDirty
  };

  function setDirty(name) {
    setDirties(prevState => ({
      ...prevState,
      [name]: true
    }));
  }

  function removeError({ name }) {
    setErrors(prevState => {
      delete prevState[name];

      return {
        ...prevState
      };
    });
  }

  function setError({ name, error }) {
    setErrors(prevState => ({
      ...prevState,
      [name]: error
    }));
  }

  async function setField({ name, value }) {
    const changes = { [name]: value };
    const newState = { ...state, [name]: value };
    const alteredNewState = await props.onChange(state, newState, changes);

    if (typeof alteredNewState === "undefined") {
      setState(prevState => ({
        ...prevState,
        ...changes
      }));
    } else {
      setState(alteredNewState);
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    setDirties(markAllDirty(state));
    props.onSubmit(state, errors);
  }

  function markAllDirty(state) {
    const names = Object.keys(state);
    return names.reduce((acc, name) => {
      acc[name] = true;
      return acc;
    }, {});
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
