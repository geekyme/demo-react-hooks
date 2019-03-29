import React, { useContext, useState, useEffect, useRef } from "react";
import { useEffectOnMount } from "components/utils";

export const FormContext = React.createContext();

export function useStore(data) {
  const [state, setState] = useState(data || {});
  const [errors, setErrors] = useState({});
  const [dirties, setDirties] = useState({});
  const store = {
    data: state,
    dirties,
    errors,
    setField: setField,
    setError: setError,
    removeError: removeError,
    setDirty: setDirty,
    resetData: resetData,
    setAllDirty: setAllDirty
  };

  function setAllDirty() {
    const names = Object.keys(state);
    const dirties = names.reduce((acc, name) => {
      acc[name] = true;
      return acc;
    }, {});

    setDirties(dirties);
  }

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

  function resetData(data) {
    setState(data || {});
  }

  async function setField({ name, value }) {
    const changes = { [name]: value };
    const newState = { ...state, [name]: value };

    if (typeof interceptChange === "function") {
      const alteredNewState = await interceptChange(state, newState, changes);

      if (typeof alteredNewState !== "undefined") {
        setState(alteredNewState);
        return;
      }
    }

    setState(prevState => ({
      ...prevState,
      ...changes
    }));
  }

  return store;
}

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

function useStoreStrategy(opts) {
  const { name, store, initialState, transformValue } = opts;
  if (typeof name === "undefined") {
    throw new Error("You must supply a 'name' prop if you are using <Form>");
  }

  const pristine = !store.dirties[name];

  const state =
    typeof store.data[name] === "undefined" ? initialState : store.data[name];

  useEffectOnMount(() => {
    if (pristine) {
      store.setDirty(opts.name);
    }

    store.setField({
      name: opts.name,
      value: state
    });
  }, [state]);

  return {
    setValue(state) {
      store.setField({
        name,
        value: state
      });
    },
    value: transformValue ? transformValue(state) : state,
    pristine
  };
}

function useLocalStateStrategy(opts) {
  const { transformValue, initialState } = opts;
  const [pristine, setPristine] = useState(true);
  const [state, setState] = useState(initialState);

  useEffectOnMount(() => {
    if (pristine) {
      setPristine(false);
    }
  }, [state]);

  return {
    setValue(state) {
      setState(state);
    },
    value: transformValue ? transformValue(state) : state,
    pristine
  };
}

export function useHandler(opts) {
  if (typeof opts.store !== "undefined") {
    return useStoreStrategy(opts);
  } else {
    const context = useContext(FormContext);

    if (typeof context !== "undefined") {
      return useStoreStrategy({ ...opts, store: context });
    } else {
      return useLocalStateStrategy(opts);
    }
  }
}
