import React from "react";
import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <>
      <div className="navbar">
        <nav>
          <Link href="/">Home</Link> |<Link href="/login">Login</Link> |
          <Link href="/register">Register</Link> |
          <Link href="/contact">Contact</Link> |
        </nav>
      </div>
      <main>{children}</main>
      <footer>Copyright &copy; ITS 2021</footer>
    </>
  );
};

export default Layout;
