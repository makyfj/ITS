import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../constants/apiURL";

export const UserContext = createContext();

const Auth = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [token, setToken] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  const login = (userInfo, token) => {
    localStorage.setItem("userInfo", userInfo);
    localStorage.setItem("token", token);
    setUserInfo(userInfo);
    setToken(token);
    setAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    setUserInfo(null);
    setToken(null);
    setAuthenticated(false);
  };

  useEffect(() => {
    if (!token && !userInfo) {
      return;
    }

    const { _id } = userInfo;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    const { status, data } = axios.get(`${API_URL}/${_id}`, config);
    setUserInfo(data);
    if (status === 200) {
      setAuthenticated(true);
    }
  }, [token, userInfo]);

  return (
    <UserContext.Provider
      value={{ userInfo, token, authenticated, logout, login }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default Auth;
