import React, { useState, useEffect, useRef } from "react";
// import DiffOptions from "./Diffoptions";
import CheckInvite from "./checkInvite";

const Invite = ({invitedUsers, setInvitedUsers, errInvitedUsers, setErrInvitedUsers}) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchOptions, setSearchOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermObject, setSearchTermObject] = useState("");
  const fetchData = async (value) => {
    const url = new URL("http://localhost:5000/usersearch");
    url.searchParams.append('q', value);

    try {
      const response = await fetch(url);
      const data = await response.json();
      setSearchOptions(data);
    } catch (error) {
      console.error('Error fetching search options:', error);
    }
  };

  useEffect(() => {
  }, [searchOptions]);
  
  const fetchUserInfo = async (value) =>{
    // console.log(value)
    const url = new URL("http://localhost:5000/userinfo");
    url.searchParams.append('id', value);

    try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);
      setInvitedUsers((prevUsers) => {
        let f = 0;
        prevUsers.forEach((user) => {
          if (user.name === data.name) {
            f = 1;
          }
        });
        if (f === 0) {
          return [...prevUsers, data];
        } else {
          return [...prevUsers];
        }
      });
      
  

      setSearchTermObject(data);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  }

  useEffect(() => {
    if(invitedUsers.length > 0){
      setErrInvitedUsers("");
    }
  }, [invitedUsers, setErrInvitedUsers]);

  const handleAddClick = () => {
    if (searchTermObject) {
      fetchUserInfo(searchTermObject.name).then(addedUserInfo => {
        setSearchTerm("");
        setSearchOptions([]);
      });
    }
   
    // console.log(invitedUsers);
  };
  const handleAddOptionClick = (option) => {
    setSearchTerm(option.name);
    setSearchOptions([]);
    setSearchTermObject(option);
  };
  const handleInviteClick = () => {
    setShowSearch(!showSearch);
  };

  const handleInputChange = (value) => {
    setSearchTerm(value);
    fetchData(value);
  };
  const listRef = useRef(null);

  useEffect(() => {
    if (showSearch && listRef.current) {
      listRef.current.focus();
    }
  }, [showSearch]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown" && listRef.current) {
      e.preventDefault();
      const currentFocusIndex = Array.from(listRef.current.children).findIndex(
        (item) => document.activeElement === item
      );
      const nextIndex =
        currentFocusIndex === -1
          ? 0
          : currentFocusIndex === searchOptions.length - 1
          ? 0
          : Math.min(currentFocusIndex + 1, searchOptions.length - 1);
      listRef.current.children[nextIndex].focus();
    } else if (e.key === "Enter" && listRef.current) {
      e.preventDefault();
      const focusedItem = Array.from(listRef.current.children).find(
        (item) => document.activeElement === item
      );
      if (focusedItem) {
        const optionIndex = parseInt(focusedItem.getAttribute("data-index"));
        const selectedOption = searchOptions[optionIndex];
        handleAddOptionClick(selectedOption);
      }
    }
  };

  return (
    <>
      <div
        style={{ position: "relative", height: "2em" }}
        className="action-link"
      >
        <div
          style={{
            position: "absolute",
            right: "0",
            margin: "0 0 1em 0",
            fontFamily: "Lexend",
          }}
        >
          {showSearch && (
            <>
              <form className="handleForm" method="post">
                <div style={{ padding: "1em", textAlign: "right" }}>
                  <label style={{ paddingRight: "1em" }}>
                    Handle:
                    <input
                      style={{ width: "12em", marginLeft: "8px" }}
                      type="text"
                      className="handleBox ac_input"
                      autocomplete="off"
                      value={searchTerm}
                      onChange={(e) => {
                        handleInputChange(e.target.value);
                      }}
                      onKeyDown={handleKeyDown}
                    />
                    {searchOptions.length > 0 && searchTerm.length >= 1 && (
                      <div
                        className="ac_results"
                        style={{
                          position: "absolute",
                          width: "200px",
                          top: "35px",
                          left: "73px",
                          display: "block",
                        }}
                      >
                        <ul
                          style={{ maxHeight: "180px", overflow: "auto" }}
                          ref={listRef}
                          tabIndex="-1"
                          onKeyDown={handleKeyDown}
                        >
                          {searchOptions.map((options, id) => {
                            return (
                              <li
                                className={id % 2 === 0 ? "ac_even" : "ac_odd"}
                                onClick={(e) => {
                                  handleAddOptionClick(options);
                                }}
                                tabIndex="0"
                                data-index={id}
                                style={{textAlign: "left"}}
                              >
                                {options.name}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </label>
                </div>
                <div style={{ padding: "0 1em 1em 1em", textAlign: "right" }}>
                  <input
                    style={{ height: "1.65em", padding: "0 0.75em" }}
                    type="button"
                    value="Add"
                    onClick={handleAddClick}
                  />
                </div>
              </form>
            </>
          )}
          <button className="addInvitation" onClick={handleInviteClick} type="button">
            <img src="//codeforces.org/s/34596/images/icons/new-problem-16x16.png" alt="add" />
            {showSearch ? "Hide Panel" : "Invite users"}
          </button>
        </div>
      </div>

      <CheckInvite showSearch={showSearch} invitedUsers={invitedUsers} setInvitedUsers={setInvitedUsers} errInvitedUsers={errInvitedUsers} setErrInvitedUsers={setErrInvitedUsers} />
    </>
  );
};

export default Invite;
