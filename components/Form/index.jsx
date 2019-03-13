import React, { useState, useEffect, useRef } from "react";
import { FormContext } from "./FormUtils";

export default function Form(props) {
  const isInitialMount = useRef(true);
  const [state, setState] = useState(props.data || {});
  const context = {
    data: state,
    onChange: onChange
  };

  function onChange(e) {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value
    });
  }

  function onReset() {
    setState({});
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      props.onChange(state);
    }
  });

  return (
    <FormContext.Provider value={context}>
      <form onChange={onChange} onReset={onReset}>
        {props.children}
      </form>
    </FormContext.Provider>
  );
}
