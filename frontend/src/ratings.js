import React, { useState, useEffect } from "react";
import "./App.css";

const InputGenerator = ({ count, inputs, setInputs, done, setDone, errRating, seterrRating }) => {
  count = Math.min(count, 10);
  const [errors, setErrors] = useState([]);
  useEffect(() => {
    const initialInputs = Array.from({ length: count }, () => ({
      value: "",
      error: false,
    }));
    setInputs(initialInputs);
    setErrors(Array.from({ length: count }, () => false));
    setDone(Array.from({ length: count }, () => false));
  }, [count, setInputs, setErrors, setDone]);

  useEffect(() => {
  },[inputs, errors, done]);

  const handleInputChange = (index, value) => {
    if (/^\d+$/.test(value)) {
      const numericValue = parseInt(value, 10);
      const newInputs = [...inputs];
      setInputs(newInputs);
      newInputs[index] = numericValue;
      if (
        numericValue >= 800 &&
        numericValue <= 3500 &&
        numericValue % 100 === 0
      ) {
        setErrors((prevErrors) => {
          const newErrors = [...prevErrors];
          newErrors[index] = false;
          return newErrors;
        });
        setDone((prevDone) => {
          const newDone = [...prevDone];
          newDone[index] = true;
          return newDone;
        });
      } else {
        setErrors((prevErrors) => {
          const newErrors = [...prevErrors];
          newErrors[index] = true;
          return newErrors;
        });

        setDone((prevDone) => {
          const newDone = [...prevDone];
          newDone[index] = false;
          return newDone;
        });
      }
    } else {
      setErrors((prevErrors) => {
        const newErrors = [...prevErrors];
        newErrors[index] = true;
        return newErrors;
      });
    }
  };


  return (
    <div style={{ marginTop: "50px" }}>
      <div
        className="datatable"
        style={{
          backgroundColor: "#e1e1e1",
          paddingBottom: "3px",
          width: "93%",
          borderRadius: "10px",
          fontFamily: "Lexend",
        }}
      >
        <div
          style={{
            padding: " 10px 0 0 6px",
            fontSize: "1.4rem",
            position: "relative",
          }}
        >
          Ratings
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
                  Problems
                  <div> <span className="star small">{errRating}</span></div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="no-items visible">
                {count === 0 || inputs.length === 0 ? (
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
                  <table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Problem</th>
                        <th>Input</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inputs.map((_, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>Problem {String.fromCharCode(65 + index)}</td>
                          <td>
                            <input
                              type="text"
                              onChange={(e) =>
                                handleInputChange(index, e.target.value)
                              }
                            />
                            {errors[index] && (
                              <>
                                <br />
                                <span style={{ color: "red" }}>
                                  Invalid input
                                </span>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InputGenerator;
