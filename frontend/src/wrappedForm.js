import React, { useState } from "react";
import InputGenerator from "./ratings";
import Invite from "./invite";
import "./App.css";

const WrappedForm = () => {
  const [numberOfProblems, setnumberOfProblems] = useState(0);
  const [contestDuration, setcontestDuration] = useState(0);
  const [startTime, setStartTime] = useState('');
  const [contestName, setContestName] = useState('');
  const [invitedUsers, setInvitedUsers] = useState([]);

  const [inputs, setInputs] = useState([]);
  const [done, setDone] = useState([]);

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleProblemChange = (e) => {
    const newProblem = parseInt(e.target.value);
    setnumberOfProblems(newProblem);
  };

  const handleDurationChange = (e) => {
    let newDuration = parseInt(e.target.value);
    if (newDuration > 240) {
      newDuration = 240;
    }
    setcontestDuration(newDuration);
  };

  const handleContestNameChange = (e) => {
    setContestName(e.target.value);
    // console.log(contestName);
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };


  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    alert("Submitted");

    let f = 0;
    for (let i = 0; i < done.length; i++) {
      if (!done[i]) {
        f = 1;
        break;
      }
    }

    if (f === 1) {
      alert("Please fill all the fields correctly");
      return;
    }
    const formData = {
      contestName,
      contestDuration,
      numberOfProblems,
      startTime,
      invitedUsers,
      inputs
    };
    // console.log(formData);  

    try{
      const response = await fetch("http://localhost:5000/process",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      if(response.ok){
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        setResponse(jsonResponse);
        alert("Contest Created");
      }
      else{
        throw new Error("Request to submit failed!");
      }
    }
    catch(error){
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    }
    finally{
      setLoading(false);
      alert(response);
    }
  };
  return (
    <>
    {loading && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <p>Loading...</p>
        </div>
      )}
      <form
        method="post"
        onSubmit={handleSubmit}
        style={{display: "flex", flexDirection: "column", alignItems: "left"}}
      >
        <table className="table-form">
          <tbody>
            <tr className="contest-profile-row">
              <td>
                <label htmlFor="contestName" style={{ fontFamily: "Lexend" }}>
                  Name:
                </label>
              </td>
              <td>
                <input
                  id="contestName"
                  tabIndex="1"
                  name="contestName"
                  value={contestName}
                  onChange={handleContestNameChange}
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
                <label htmlFor="contestDuration" style={{ fontFamily: "Lexend" }}>
                  Duration:
                </label>
              </td>
              <td>
                <input
                  id="contestDuration"
                  tabIndex="2"
                  name="contestDuration"
                  type="number"
                  value={contestDuration}
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
                <label htmlFor="contestProblems" style={{ fontFamily: "Lexend" }}>
                  Number of Problems:
                </label>
              </td>
              <td>
                <input
                  id="contestProblems"
                  tabIndex="3"
                  name="contestProblems"
                  type="number"
                  value={numberOfProblems}
                  min={1}
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
                <label htmlFor="contestTime" style={{ fontFamily: "Lexend" }}>
                  Start Time :
                </label>
              </td>
              <td>
                <input
                  id="contestTime"
                  tabIndex="4"
                  name="contestTime"
                  value={startTime}
                  onChange={handleStartTimeChange}
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
        <Invite invitedUsers={invitedUsers} setInvitedUsers={setInvitedUsers} />
        <InputGenerator count={numberOfProblems} inputs={inputs} setInputs={setInputs} done={done} setDone={setDone} />
        <input
          type="button"
          className="submit-btn"
          value="Create Mashup Contest"
          onClick={handleSubmit}
        ></input>
      </form>
    </>
  );
};

export default WrappedForm;
