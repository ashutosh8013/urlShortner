import React from "react";
import { useState } from "react";
import axios from "axios";
import "../style.css";
import rolling from "./rolling.svg";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { UserContext } from "../../context/userContext";
export default function Register() {
  const { user, setUser } = useContext(UserContext);
  const [isActive, setActive] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const { data } = await axios.post("/register", {
        name,
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        // to reset the imput feilds
        setData({});
        toast.success("registered successfully.");
        // navigate to login page after successful login
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div
        className={` z-20 flex absolute  justify-center items-center  ${
          isActive ? " opacity-1 w-full h-full" : " opacity-0 w-0 h-0"
        }`}
      >
        <img className=" w-40 h-40" src={rolling}></img>
      </div>
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          class="mx-auto h-10 w-auto"
          src="https://www.svgrepo.com/show/301692/login.svg"
          alt="Workflow"
        />
        <h2 class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Create a new account
        </h2>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              const e = credentialResponse;
              setActive(true);
              // const data = jwtDecode(e.credential);
              // console.log(data);

              try {
                const { data } = await axios.post("/googleLogin", { e });
                // console.log(data);
                if (data.error) {
                  setActive(false);
                  toast.error(data.error);
                  return;
                }
                // console.log("in google");
                setData({});
                sessionStorage.removeItem("token");
                sessionStorage.setItem("googleToken", e.credential);
                await axios
                  .post("/profile", {
                    googleToken: sessionStorage.getItem("googleToken"),
                  })
                  .then(({ data }) => {
                    setUser(data);
                  });
                setActive(false);
                navigate("/dashboard");
              } catch (e) {
                setActive(false);
                toast.error(e);
              }
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />

          <br></br>
          <hr></hr>
          <br></br>
          <h1 class="text-xl flex justify-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            OR
          </h1>
          <form onSubmit={registerUser}>
            <div>
              <label
                for="email"
                class="block text-sm font-medium leading-5  text-gray-700"
              >
                Name
              </label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  type="text"
                  required
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
                <div class="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    class="h-5 w-5 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <div class="mt-6">
              <label
                for="email"
                class="block text-sm font-medium leading-5  text-gray-700"
              >
                Email address
              </label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <input
                  id="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  placeholder="user@example.com"
                  type="email"
                  required=""
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
                <div class="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    class="h-5 w-5 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <div class="mt-6">
              <label
                for="password"
                class="block text-sm font-medium leading-5 text-gray-700"
              >
                Password
              </label>
              <div class="mt-1 rounded-md shadow-sm">
                <input
                  id="password"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  type="password"
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div class="mt-6">
              <span class="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                >
                  Create account
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
