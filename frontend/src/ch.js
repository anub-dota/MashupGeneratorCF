import React, { useState, useEffect, useRef } from "react";

const CheckInvite = ({ showSearch, invitedUsers, setInvitedUsers }) => {
  //   const [showSearch, setShowSearch] = useState(false);

  //   const [invitedUsers, setInvitedUsers] = useState([
  //     { name: "akkafakka", title: "Expert", color: "blue" },
  //     { name: "aka26nsh", title: "Specialist", color: "cyan" },
  //     { name: "Abhi6645", title: "Specialist", color: "cyan" },
  //     { name: "Anu30bhab", title: "Specialist", color: "cyan" },
  //   ]);

  const handleDeleteClick = (index) => {
    // Prevent the default behavior of the form submission
    console.log("hehe");
    // event.preventDefault();

    // event.stopPropagation();
    setInvitedUsers((prevUsers) => {
      // Filter out the user at the specified index
      const updatedUsers = prevUsers.filter((user, i) => i !== index);
      return updatedUsers;
    });
  };

  return (
    <>
      <div
        style={{ position: "relative", height: "2em" }}
        className="action-link"
      ></div>

      <div
        className="datatable"
        style={{
          backgroundColor: "#e1e1e1",
          paddingBottom: "3px",
          width: "93%",
          // marginLeft: "100px",
          borderRadius: "10px",
          fontFamily: "Lexend",
          marginTop: showSearch ? "80px" : "0",
        }}
      >
        <div
          style={{
            padding: " 4px 0 0 6px",
            fontSize: "1.4rem",
            position: "relative",
          }}
        >
          Invited users
        </div>
        <div
          style={{
            backgroundColor: "white",
            margin: "0.3em 3px 0 3px",
            position: "relative",
          }}
        >
          <table>
            <thead>
              <tr>
                <th style={{ textAlign: "left" }} className="top left">
                  Handle
                </th>
              </tr>
            </thead>
            <tbody>
              {invitedUsers.length === 0 ? (
                <tr className="no-items visible">
                  <td
                    style={{ textAlign: "left" }}
                    colSpan="32"
                    className="bottom dark left right"
                  >
                    No items
                  </td>
                </tr>
              ) : (
                <>
                  {invitedUsers.map((user, index) => (
                    <tr>
                      <td
                        style={{ textAlign: "left" }}
                        className="bottom dark left"
                      >
                        <a
                          href={`/profile/${user.name}`}
                          title={`${user.title} ${user.name}`}
                          className={`rated-user user-${user.color}`}
                        >
                          {user.name}
                        </a>
                      </td>
                      <td className="bottom dark right">
                        <button
                          className="deleteInvitation"
                          type = "button"
                          // onClick={() => handleDeleteClick(index)}
                          onClick={() => handleDeleteClick(index)}
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "#551A8B ",
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CheckInvite;
