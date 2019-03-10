import React, { createContext, useContext, useState, useEffect } from "react";
import { getActions } from "./actions";

const StateProvider = ({ initialState, children }) => {
  const [state, setState] = useState(initialState);

  const context = {
    state,
    actions: getActions(state, setState)
  };

  useEffect(function mount() {
    context.actions.init();
  }, []);

  return (
    <StateContext.Provider value={context}>{children}</StateContext.Provider>
  );
};

export const StateContext = createContext();

export const useAppContext = () => useContext(StateContext);

export default StateProvider;
