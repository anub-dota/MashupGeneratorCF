import React, { useState } from "react";
import InputGenerator from "./ratings";
import Invite from "./invite";
import SuccessModal from "./contestModal";
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

  const [errNameMess, setErrNameMess] = useState('');
  const [errDuration, setErrDuration] = useState('');
  const [errProblems, setErrProblems] = useState('');
  const [errStartTime, setErrStartTime] = useState('');
  const [errInvitedUsers, setErrInvitedUsers] = useState('');
  const [errRating, setErrRating] = useState(''); 
  const [createSuccess, setCreateSuccess] = useState(false);

  const handleProblemChange = (e) => {
    const newProblem = parseInt(e.target.value);
    if(newProblem === null || newProblem === '' || newProblem === 0 || isNaN(newProblem)){
      setnumberOfProblems(0);
      return;
    }
    if(newProblem > 10){
      setnumberOfProblems(10);
      setErrProblems('');
      return;
    }
    setnumberOfProblems(newProblem);

    if(e.target.value !== ''){
      setErrProblems('');
    }
  };

  const handleDurationChange = (e) => {
    let newDuration = parseInt(e.target.value);
  if (isNaN(newDuration)) {
    // setcontestDuration(0);
    setErrDuration('Please enter a valid number');
    return;
  }
  
  // newDuration = Math.max(10, Math.min(newDuration, 240));
  
  setcontestDuration(newDuration);
  setErrDuration(newDuration >= 10 && newDuration <= 240 ? '' : 'Duration must be between 10 and 240 minutes');
  };

  const handleContestNameChange = (e) => {
    setContestName(e.target.value);
    if(e.target.value !== ''){
      setErrNameMess('');
    }
    // console.log(contestName);
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
    if(e.target.value !== ''){
      setErrStartTime('');
    }
  };


  const handleSubmit = async (e) => {
    if(contestName === ''){
      setErrNameMess('Please enter the contest name');
      return;
    }
    if(contestDuration === 0){
      setErrDuration('Please enter the contest duration');
      return;
    }
    if(contestDuration < 10 || contestDuration > 240){
      setErrDuration('Duration must be between 10 and 240 minutes');
      return;
    }
    if(numberOfProblems === 0 || numberOfProblems === '' || numberOfProblems === null || isNaN(numberOfProblems)){
      setErrProblems('Please enter atleast one problem');
      return;
    }
    if(startTime === '' || errStartTime !== ''){
      setErrStartTime('Please enter the start time');
      return;
    }
    if(invitedUsers.length === 0){
      setErrInvitedUsers('Please invite atleast one user');
      return;
    }
    e.preventDefault();
    
    let f = 0;
    for (let i = 0; i < done.length; i++) {
      if (!done[i]) {
        f = 1;
        break;
      }
    }
    
    if (f === 1) {
      setErrRating('Please fill all the fields correctly');
      return;
    }
    
    setErrDuration('');
    setErrNameMess('');
    setErrProblems('');
    setErrStartTime('');
    setErrInvitedUsers('');
    setErrRating('');


    setLoading(true);
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
      // alert("Submitted");

      if(response.ok){
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        setResponse(jsonResponse);
        setCreateSuccess(true);
        setLoading(false);
        // alert("Here is your contest link");
      }
      else{
        throw new Error("Request to submit failed!");
      }
    }
    catch(error){
      console.error('Error submitting form:', error);
      alert('Error making contest!');
    }
    finally{
      setLoading(false);
      // alert({response});
    }
  };
  return (
    <>
    {
      createSuccess && response && (
        <SuccessModal link={response} />
      )}
    {loading && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <p className="load">Loading...<br/>Don't Refresh</p>
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
                  {/* <span className="notice for__contestName smaller contest-profile-row"> */}
                  <span className="star small">{errNameMess}</span>&nbsp;
                  {/* </span> */}
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
                    {errDuration === '' ? "Contest duration in minutes" : <span className="star small">{errDuration}</span>} &nbsp;
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
                    {errProblems === '' ? "Number of problems in the contest" : <span className="star small">{errProblems}</span>} &nbsp;
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
                    // style={{ display: "none" }}
                  >
                    <span className="star small">{errStartTime}</span>
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <Invite invitedUsers={invitedUsers} setInvitedUsers={setInvitedUsers} errInvitedUsers={errInvitedUsers} setErrInvitedUsers={setErrInvitedUsers} />
        <InputGenerator count={numberOfProblems} inputs={inputs} setInputs={setInputs} done={done} setDone={setDone} errRating={errRating} setErrRating={setErrRating} />
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
