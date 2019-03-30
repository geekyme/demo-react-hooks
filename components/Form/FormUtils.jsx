import React, { useContext, useState, useEffect, useRef } from "react";
import { useEffectOnMount } from "components/utils";

export const FormContext = React.createContext();

export function useStore(data, interceptChange) {
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

function useStoreStrategy(opts) {
  const { name, store, validate, initialState } = opts;
  const isInitialMount = useRef(true);
  if (typeof name === "undefined") {
    throw new Error("You must supply a 'name' prop if you are using <Form>");
  }

  const pristine = !store.dirties[name];

  // TODO: might be an anti-pattern as we are mutating the state instead of calling setField
  // the reason is because we do not want to trigger new render cycles
  // useRef perhaps?
  if (isInitialMount.current) {
    store.data[name] = initialState;
  }

  const state = store.data[name];
  const error = getError(validate, state);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (pristine) {
        store.setDirty(name);
      }

      if (error !== null) {
        store.setError({ name, error });
      } else {
        store.removeError({ name });
      }
    }
  }, [state]);

  return {
    setValue(state) {
      store.setField({
        name,
        value: state
      });
    },
    value: state,
    pristine,
    error
  };
}

function useLocalStateStrategy(opts) {
  const { initialState, validate } = opts;

  if (typeof initialState === "undefined") {
    throw new Error("initialState must be defined to something!");
  }

  const [pristine, setPristine] = useState(true);
  const [error, setError] = useState(null);
  const [state, setState] = useState(initialState);

  useEffectOnMount(() => {
    if (pristine) {
      setPristine(false);
    }

    const error = getError(validate, state);
    setError(error);
  }, [state]);

  return {
    setValue(state) {
      setState(state);
    },
    value: state,
    pristine,
    error
  };
}

export function useFormState(opts) {
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
