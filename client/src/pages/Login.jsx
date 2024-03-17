import React from "react";
import { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import "../style.css";
import { toast } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

export default function Login() {
  const { user,setUser } = useContext(UserContext);
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
        // set the data to empty

        setData({});
        axios.get('/profile').then(({data})=>{
          setUser(data);
      })

        navigate("/dashboard");
      }
    } catch (error) {}
  };

  return (
    <div className="login">
      <form onSubmit={loginUser}>
        <label>Email: </label>
        <input
          type="email"
          placeholder="enter email..."
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        ></input>{" "}
        <label> Password: </label>
        <input
          type="password"
          placeholder="enter password..."
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
