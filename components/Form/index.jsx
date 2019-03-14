import React, { useState, useEffect, useRef } from "react";
import { FormContext } from "./FormUtils";

export default function Form(props) {
  const isInitialMount = useRef(true);
  const stopRun = useRef(false);
  const [state, setState] = useState(props.data || {});
  const context = {
    data: state,
    onChange: onChange
  };

  function onChange({ name, value }) {
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
    } else if (stopRun.current) {
      stopRun.current = false;
    } else {
      props.onChange(state, newState => {
        // this ensures that we do not end up in an infinite onChange loop
        stopRun.current = true;
        setState(newState);
      });
    }
  }, [state]);

  return (
    <FormContext.Provider value={context}>
      <form onReset={onReset}>{props.children}</form>
    </FormContext.Provider>
  );
}
