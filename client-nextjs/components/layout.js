import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useSelector, useDispatch } from "react-redux";
import { logoutUser, clearStatus } from "../app/features/auth/authSlice";

const Layout = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const onLogoutHandler = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    dispatch(clearStatus());
    router.push("/");
  };

  return (
    <>
      <div className="navbar">
        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            {userInfo.name !== "" ? (
              <>
                <li>Welcome! {userInfo.name}</li>
                <li>
                  <button type="submit" onClick={onLogoutHandler}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login">Login</Link>
                </li>
                <li>
                  <Link href="/register">Register</Link>
                </li>
              </>
            )}
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
      <main>{children}</main>
      <footer>Copyright &copy; ITS 2021</footer>
    </>
  );
};

export default Layout;
