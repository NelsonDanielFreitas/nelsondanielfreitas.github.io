import axios from "axios";
import jwt from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const ROLES = {
  ADMIN: "ADMIN",
};
//Admin
export const getTokenInfo = (tokenAux = null) => {
  //Info do token
  const token = tokenAux || localStorage.getItem("token");
  if (!token) return null;

  const payload = jwt(token);
  console.log(payload.data);

  if (payload.data.admin) {
    payload.data.role = ROLES.ADMIN;
  }

  return payload.data;
};
//Fim admin
export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const aux = localStorage.getItem("token") || null;
  const [currentUser, setCurrentUser] = useState(aux);
  const [user, setUser] = useState(null);

  const login = async (inputs) => {
    const res = await axios.post("/auth/login", inputs);
    setCurrentUser(res.data);
  };

  const logout = async (inputs) => {
    await axios.post("/auth/logout");
    setCurrentUser(null);
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("token", currentUser);
      setUser(jwt(currentUser).data);
    } else {
      localStorage.removeItem("token");
      setCurrentUser(null);
      setUser(null);
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        user,
        setCurrentUser,
        isAdmin: user?.admin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
