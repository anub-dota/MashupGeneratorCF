import React from "react";

const DiffOptions = ({ result }) => {
  return (
    <div
      className="search-result"
      onClick={(e) => alert(`You selected ${result}!`)}
    >
      {result}
    </div>
  );
};

export default DiffOptions;
