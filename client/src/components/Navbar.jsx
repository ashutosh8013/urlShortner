import React from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/register">register</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
}
