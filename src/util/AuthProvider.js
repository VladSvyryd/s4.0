import React, { useState, createContext } from "react";
export const AuthContext = createContext();

const initialState = sessionStorage.getItem("serial_number") || null;

export const AuthProvider = props => {
  const [authState, setAuthState] = useState(initialState);

  return (
    <AuthContext.Provider value={[authState, setAuthState]}>
      {props.children}
    </AuthContext.Provider>
  );
};
