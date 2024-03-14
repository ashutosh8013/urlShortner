import React from "react";
import '../style.css';
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div className="mainNav">
      <nav className="nav">
      <Link to="/" className="">
        Home
      </Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </nav>
    </div>
  );
}
