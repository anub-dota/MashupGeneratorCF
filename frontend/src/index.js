import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import InputGenerator from "./ratings";
import WrappedForm from "./wrappedForm";
import CheckInvite from "./ch";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <InputGenerator /> */}
    <App />
    {/* <CheckInvite/> */}
    {/* <WrappedForm /> */}
  </React.StrictMode>
);
