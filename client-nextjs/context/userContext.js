import { createContext, useState } from "react";

export const UserContext = createContext();

const Auth = ({ children }) => {
  const [userInfo, setUserInfo] = useState(localStorage.getItem("userInfo"));
  const [token, setToken] = useState(localStorage.getItem("token"));
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
  return (
    <UserContext.Provider
      value={{ userInfo, token, authenticated, logout, login }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default Auth;
