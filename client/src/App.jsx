import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "../src/components/Navbar";
import Home from "../src/pages/Home";
import Register from "../src/pages/Register";
import Login from "./pages/Login";
import axios from "axios";
import Analysis from "./pages/Analysis";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "../context/userContext";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/error";
axios.defaults.baseURL = "http://localhost:8002"
axios.defaults.withCredentials = true;
function App() {
  return (
    <>
    
    <UserContextProvider>
      <Navbar></Navbar>
      <Toaster
        position="bottom-right"
        toastOptions={{ duration: 2000 }}
      ></Toaster>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
         <Route path="/Analysis" element={<Analysis></Analysis>}></Route>
         <Route path="*" element={<Error></Error>}></Route>
         
      </Routes>
    </UserContextProvider>
    </>
  );
}
import { Form } from "react-router-dom";

export default App;
