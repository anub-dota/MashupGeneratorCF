import React, { useState } from "react";
import InputGenerator from "./ratings";
import Invite from "./invite";
import "./App.css";

const WrappedForm = () => {
  const [Problem, setProblem] = useState(0);
  const [Duration, setDuration] = useState(0);

  const handleProblemChange = (e) => {
    const newProblem = parseInt(e.target.value);
    setProblem(newProblem);
  };
  const handleDurationChange = (e) => {
    let newDuration = parseInt(e.target.value);
    if (newDuration > 240) {
      newDuration = 240;
    }
    setDuration(newDuration);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Submitted");
    // Prevent the default form submission behavior
  };
  return (
    <>
      <form
        method="post"
        // onSubmit={handleSubmit}
        // style={{ marginLeft: "100px" }}
        style={{display: "flex", flexDirection: "column", alignItems: "left"}}
      >
        <table className="table-form">
          <tbody>
            <tr className="contest-profile-row">
              <td>
                <label for="contestName" style={{ fontFamily: "Lexend" }}>
                  Name:
                </label>
              </td>
              <td>
                <input
                  id="contestName"
                  tabindex="1"
                  name="contestName"
                  // value=""
                  type="text"
                />
              </td>
            </tr>
            <tr className="subscription-row">
              <td>&nbsp;</td>
              <td>
                <div className="shiftUp error__contestName">
                  <span
                    className="error for__contestName smaller contest-profile-row"
                    style={{ display: "none" }}
                  >
                    &nbsp;
                  </span>
                  <span className="notice for__contestName smaller contest-profile-row">
                    &nbsp;
                  </span>
                </div>
              </td>
            </tr>

            <tr className="contest-profile-row">
              <td>
                <label for="contestDuration" style={{ fontFamily: "Lexend" }}>
                  Duration:
                </label>
              </td>
              <td>
                <input
                  id="contestDuration"
                  tabIndex="2"
                  name="contestDuration"
                  type="number"
                  value={Duration}
                  min={10}
                  max={240}
                  onChange={handleDurationChange}
                />
              </td>
            </tr>
            <tr className="subscription-row">
              <td>&nbsp;</td>
              <td>
                <div className="shiftUp error__contestDuration">
                  <span
                    className="error for__contestDuration smaller contest-profile-row"
                    style={{ display: "none" }}
                  >
                    &nbsp;
                  </span>
                  <span
                    className="notice for__contestDuration smaller contest-profile-row"
                    style={{ fontFamily: "Lexend" }}
                  >
                    Contest duration in minutes&nbsp;
                  </span>
                </div>
              </td>
            </tr>
            <tr className="contest-profile-row">
              <td>
                <label for="contestProblems" style={{ fontFamily: "Lexend" }}>
                  Number of Problems:
                </label>
              </td>
              <td>
                <input
                  id="contestProblems"
                  tabindex="3"
                  name="contestProblems"
                  // value=""
                  type="number"
                  value={Problem}
                  min={0}
                  max={10}
                  onChange={handleProblemChange}
                />
              </td>
            </tr>
            <tr className="subscription-row">
              <td>&nbsp;</td>
              <td>
                <div className="shiftUp error__contestDuration">
                  <span
                    className="error for__contestDuration smaller contest-profile-row"
                    style={{ display: "none" }}
                  >
                    &nbsp;
                  </span>
                  <span
                    className="notice for__contestDuration smaller contest-profile-row"
                    style={{ fontFamily: "Lexend" }}
                  >
                    Less than 10&nbsp;
                  </span>
                </div>
              </td>
            </tr>
            <tr className="contest-profile-row">
              <td>
                <label for="contestTime" style={{ fontFamily: "Lexend" }}>
                  Start Time :
                </label>
              </td>
              <td>
                <input
                  id="contestTime"
                  tabindex="4"
                  name="contestTime"
                  // value=""
                  type="time"
                />
              </td>
            </tr>
            <tr className="subscription-row">
              <td>&nbsp;</td>
              <td>
                <div className="shiftUp error__contestDuration">
                  <span
                    className="error for__contestDuration smaller contest-profile-row"
                    style={{ display: "none" }}
                  >
                    &nbsp;
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <Invite />
        <InputGenerator count={Problem} />
        <input
          tabindex="10"
          type="button"
          class="submit-btn"
          value="Create Mashup Contest"
          onClick={handleSubmit}
        ></input>
      </form>
    </>
  );
};

export default WrappedForm;
