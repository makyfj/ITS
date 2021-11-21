import React from "react";
import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/register">Register</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </header>
      <main>{children}</main>
      <footer>Footer</footer>
    </>
  );
};

export default Layout;
