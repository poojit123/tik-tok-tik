import React from "react";

const Cube = ({ value, index, updateCubeList, winner }) => {
  const clickMe = () => {
    if (winner === "") {
      updateCubeList(index);
    }
  };
  return (
    <>
      <div className="board-cube" id={index} onClick={() => clickMe()}>
        {value}
      </div>
    </>
  );
};

export default Cube;
