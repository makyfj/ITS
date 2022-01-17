import React from "react";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="navbar">
        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <div className="dropdown"></div>
            <div className="dropdown">
              <button className="dropdownBtn">Admin</button>
              <div className="dropdownProfile">
                <li>
                  <Link href="/admin/tickets">View Tickets</Link>
                </li>
                <li>
                  <Link href="/admin/users">View Users</Link>
                </li>
                <li>
                  <Link href="/admin/tickets/add-category">Add Category</Link>
                </li>
              </div>
            </div>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/register">Register</Link>
            </li>
            <li>
              <Link href="/credits">Credits</Link>
            </li>
          </ul>
        </nav>
      </div>
      <main>{children}</main>
      <footer>
        Copyright &copy; ITS 2021
        <br />
        Email: its_admin@its.com
        <br />
        <a href="https://github.com/makyfj/ITS">Source Code {"<3"}</a>
      </footer>
    </>
  );
};

export default Layout;
