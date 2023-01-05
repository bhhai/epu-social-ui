import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { BASE_URL } from "../utils/constance";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [cookies, setCookie] = useCookies()

  const login = async (inputs) => {
    const res = await axios.post(BASE_URL + "auth/login", inputs, {
      withCredentials: true,
    });

    // setCookie('accessToken', res.data.data.token, { domain: 'epusocial.online' })

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
