import React from "react";

const CheckInvite = ({ showSearch, invitedUsers, setInvitedUsers, errInvitedUsers, setErrInvitedUsers}) => {

  const handleDeleteClick = (index) => {
    setInvitedUsers((prevUsers) => {
      const updatedUsers = prevUsers.filter((user, i) => i !== index);
      return updatedUsers;
    });
  };

  return (
    <>
      <div
        className="datatable"
        style={{
          backgroundColor: "#e1e1e1",
          paddingBottom: "3px",
          width: "93%",
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
                    <div> <span className="star small">{errInvitedUsers}</span></div>
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
                    <tr key ={index}>
                      <td
                        style={{ textAlign: "left" }}
                        className="bottom dark left"
                      >
                        <a
                          href={`https://codeforces.com/profile/${user.name}`}
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
