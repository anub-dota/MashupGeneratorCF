import React, { useState, useEffect } from "react";
import "./App.css";

const InputGenerator = ({ count }) => {
  count = Math.min(count, 10);
  const [inputs, setInputs] = useState([]);
  const [errors, setErrors] = useState([]);

  //   useEffect(() => {
  //     setInputs(Array.from({ length: count }, () => ""));
  //   }, [count]);
  //   useEffect(() => {
  //     setErrors(Array.from({ length: count }, () => false));
  //   }, [count]);
  useEffect(() => {
    // Initialize inputs and errors arrays with initial values
    const initialInputs = Array.from({ length: count }, () => ({
      value: "",
      error: false,
    }));
    setInputs(initialInputs);
    setErrors(Array.from({ length: count }, () => false));
  }, [count]);

  const handleInputChange = (index, value) => {
    if (/^\d+$/.test(value)) {
      const numericValue = parseInt(value, 10);
      if (
        numericValue >= 800 &&
        numericValue <= 3500 &&
        numericValue % 100 === 0
      ) {
        const newInputs = [...inputs];
        newInputs[index] = numericValue;
        setInputs(newInputs);
        // cins;
        // Clear error state if input is correct
        setErrors((prevErrors) => {
          const newErrors = [...prevErrors];
          newErrors[index] = false;
          return newErrors;
        });
      } else {
        setErrors((prevErrors) => {
          const newErrors = [...prevErrors];
          newErrors[index] = true;
          return newErrors;
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

  // console.log(inputs);

  return (
    <div style={{ marginTop: "50px" }}>
      <div
        className="datatable"
        style={{
          backgroundColor: "#e1e1e1",
          paddingBottom: "3px",
          width: "93%",
          // marginLeft: "100px",
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
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="no-items visible">
                {count === 0 || inputs.length === 0 ? (
                  <tr className="no-items visible">
                    <td
                      style={{ textAlign: "left" }}
                      colspan="32"
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
                              //   value={inputs[index]}
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
