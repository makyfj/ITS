import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useSelector, useDispatch } from "react-redux";
import {
  logoutUser,
  clearStatus,
  clearUsers,
} from "../app/features/auth/authSlice";
import {
  clearTickets,
  clearTicketInfo,
  clearTicketStatus,
} from "../app/features/ticket/ticketSlice";

const Layout = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const onLogoutHandler = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    dispatch(clearStatus());
    dispatch(clearTickets());
    dispatch(clearTicketInfo());
    dispatch(clearUsers());
    dispatch(clearTicketStatus());
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
                <div className="dropdown">
                  <button className="dropdownBtn">{userInfo.name}</button>
                  <div className="dropdownProfile">
                    <li>
                      <Link href={`/users/${userInfo._id}`}>Profile</Link>
                    </li>
                    <li>
                      <Link href="/tickets">Create ticket</Link>
                    </li>
                    <li>
                      <button
                        className="logoutBtn"
                        type="submit"
                        onClick={onLogoutHandler}
                      >
                        Logout
                      </button>
                    </li>
                  </div>
                </div>
                {userInfo.isAdmin && (
                  <div className="dropdown">
                    <button className="dropdownBtn">Admin</button>
                    <div className="dropdownProfile">
                      <li>
                        <Link href="/admin/tickets">View Tickets</Link>
                      </li>
                      <li>
                        <Link href="/admin/users">View Users</Link>
                      </li>
                    </div>
                  </div>
                )}
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
