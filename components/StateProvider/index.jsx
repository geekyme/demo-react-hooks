import React, { createContext, useContext, useState } from "react";

const StateProvider = ({ initialState, children }) => (
  <StateContext.Provider value={useState(initialState)}>
    {children}
  </StateContext.Provider>
);

export const StateContext = createContext();

export const useStateValue = () => useContext(StateContext);

export default StateProvider;
