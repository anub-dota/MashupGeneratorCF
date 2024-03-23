import "./App.css";
import React from "react";
import WrappedForm from "./wrappedForm";

function App() {
  return (
    <>
      <nav style={{ height: "60px" }}>
        <img
          src="/codeforces.png"
          alt="Here"
          style={{ height: "60px", padding: "10px", marginLeft: "20px" }}
        />
      </nav>
      <h1 className="heading">Create Mashup Contest</h1>
      <p className="sttext">
        Mashup is a special type of training contest, which consists of public
        problems from past Codeforces rounds. Also it is possible to add Polygon
        problems to mashup contest. Such contests can not be made public, they
        are only for personal training purpose. Also it is allowed to add
        mashups to groups. To specify additional information about mashup
        contest, use Gym contest edit form.
      </p>
      <div className="wrapper">
        <WrappedForm />
      </div>
    </>
  );
}

export default App;
