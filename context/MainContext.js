import React from "react";
import { createContext } from "react";
import { useState } from "react";
export const MainContext = createContext();
export const MainContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [loading, setLoading] = useState(true);

  const value = {
    todos,
    setTodos,
    setFilteredTodos,
    filteredTodos,
    loading,
    setLoading,
  };
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};
