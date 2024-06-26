import React from "react";
import "../style.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
export default function Navbar() {
  const { user, setUser } = useContext(UserContext);
  // detete the tokens when logout
  const logout = function () {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("googleToken");
    setUser(null);
  };
  return (
    <>
      <div className="flex justify-center bg-blue-900 text-white ">
        <nav className="self-center w-full max-w-7xl  ">
          <div className="flex md:flex-row flex-col  justify-between items-center md:items-start">
            {user ? (
              <h1 className=" py-4 text-2xl font-sans font-bold px-10">
                {user.name}
              </h1>
            ) : (
              <h1 className=" py-4 text-2xl font-sans font-bold px-10">
                URL Shortner
              </h1>
            )}
            <ul className="flex justify-center my-4  items-center text-sm md:text-[18px] font-bold  md:px-10">
              <li className="hover:underline  underline-offset-4 decoration-2 decoration-white py-2 rounded-lg px-2 md:px-5">
                {!user ? (
                  <Link to="/">Home</Link>
                ) : (
                  <Link to="/dashboard">Dashboard</Link>
                )}
              </li>
              <li className="hover:underline  underline-offset-4 decoration-2 decoration-white py-2 rounded-lg px-2 md:px-5">
                <Link to="/register">Register</Link>
              </li>
              <li className="hover:underline  underline-offset-4 decoration-2 decoration-white py-2 rounded-lg px-2 md:px-5">
                {!user ? (
                  <Link to="/login">Login</Link>
                ) : (
                  <Link onClick={logout} to="/">
                    Logout
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
