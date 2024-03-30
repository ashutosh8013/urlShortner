import rolling from "./rolling.svg"
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import "../style.css";
import { toast } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
// when login with google

export default function Login() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        // set the data to empty because may be the user have logged in from another account

        setData({});
        sessionStorage.removeItem("googleToken");
        sessionStorage.setItem("token", data.token);
        await axios
          .post("/profile", { token: sessionStorage.getItem("token") })
          .then(({ data }) => {
            setUser(data);
          });

        navigate("/dashboard");
      }
    } catch (error) {}
  };

  return (
    <>
      {!user ? (
        <section class="bg-gray-50 dark:bg-gray-900 relative">
          <img className="z-2 opacity-1 absolute flex justify-center items-center " src={rolling}></img>
          <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
                </h1>
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    const e = credentialResponse;

                    // const data = jwtDecode(e.credential);
                    // console.log(data);
                    try {
                      const { data } = await axios.post("/googleLogin", { e });
                      // console.log(data);
                      if (data.error) {
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

                      navigate("/dashboard");
                    } catch (e) {
                      toast.error(e);
                    }
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
                <hr></hr>
                <h1 class="text-xl flex justify-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  OR
                </h1>

                <form class="space-y-4 md:space-y-6" onSubmit={loginUser}>
                  <div>
                    <label
                      for="email"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={data.email}
                      onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                      }
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      for="password"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      placeholder="••••••••"
                      value={data.password}
                      onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                      }
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                  </div>
                  <button
                    type="submit"
                    class="w-full text-white bg-primary-600 bg-blue-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Sign in
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <h1>already login</h1>
      )}
    </>
  );
}
