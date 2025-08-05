import React, { createContext, useReducer, useEffect, useState } from "react";

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  // Backend URL - can also use .env for this
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    BASE_URL, // Include in state
  });

  useEffect(() => {
    const user = localStorage.getItem("token");
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
    setLoading(false);
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <AuthContext.Provider value={{ ...state, dispatch, BASE_URL }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
