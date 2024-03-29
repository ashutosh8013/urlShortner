import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="423092457490-7e7n3i00p04jqb1to13pvo6m1n2fanah.apps.googleusercontent.com">
    <Router>
      <App />
    </Router>
  </GoogleOAuthProvider>
);
