import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../utils/constance";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post(BASE_URL + "auth/login", inputs, {
      withCredentials: true,
    });

    if (res.code === 200) {

    }

    setCurrentUser(res.data.data)
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
