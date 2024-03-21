import React, { useEffect, useState } from "react";
import "./App.css";
import Cube from "./Cube";

function App() {
  const cubeListArray = [
    { "r-1-1": "", "r-1-2": "", "r-1-3": "" },
    { "r-2-1": "", "r-2-2": "", "r-2-3": "" },
    { "r-3-1": "", "r-3-2": "", "r-3-3": "" },
  ];

  const [cubeList, setCubeList] = useState(cubeListArray);

  const [pointer, setPointer] = useState("X");
  const [winnerResult, setWinnerResult] = useState("");

  const updateCubeList = (index) => {
    const indexArray = index.split("-");
    const row = Number(indexArray[1]) - Number(1);
    if (cubeList[row][index] === "") {
      setCubeList((prevList) => {
        const newList = [...prevList];
        newList[row][index] = pointer;
        return newList;
      });
      setPointer(pointer === "X" ? "0" : "X");
    }
  };

  let xData = [];
  let yData = [];
  var backgroundAnimation = document.querySelector(".board");

  const checkWiner = () => {
    cubeList.forEach((element) => {
      Object.keys(element).forEach((key) => {
        if (element[key] === "X") {
          xData.push(key);
        } else if (element[key] === "0") {
          yData.push(key);
        }
      });

      if (
        ["r-1-1", "r-1-2", "r-1-3"].every((value) => xData.includes(value)) ||
        ["r-2-1", "r-2-2", "r-2-3"].every((value) => xData.includes(value)) ||
        ["r-3-1", "r-3-2", "r-3-3"].every((value) => xData.includes(value)) ||
        ["r-1-1", "r-2-1", "r-3-1"].every((value) => xData.includes(value)) ||
        ["r-1-2", "r-2-2", "r-3-2"].every((value) => xData.includes(value)) ||
        ["r-1-3", "r-2-3", "r-3-3"].every((value) => xData.includes(value)) ||
        ["r-1-1", "r-2-2", "r-3-3"].every((value) => xData.includes(value)) ||
        ["r-1-3", "r-2-2", "r-3-1"].every((value) => xData.includes(value))
      ) {
        setWinnerResult("X is winner");
        backgroundAnimation.classList.add("background-animation");
      }

      if (
        ["r-1-1", "r-1-2", "r-1-3"].every((value) => yData.includes(value)) ||
        ["r-2-1", "r-2-2", "r-2-3"].every((value) => yData.includes(value)) ||
        ["r-3-1", "r-3-2", "r-3-3"].every((value) => yData.includes(value)) ||
        ["r-1-1", "r-2-1", "r-3-1"].every((value) => yData.includes(value)) ||
        ["r-1-2", "r-2-2", "r-3-2"].every((value) => yData.includes(value)) ||
        ["r-1-3", "r-2-3", "r-3-3"].every((value) => yData.includes(value)) ||
        ["r-1-1", "r-2-2", "r-3-3"].every((value) => yData.includes(value)) ||
        ["r-1-3", "r-2-2", "r-3-1"].every((value) => yData.includes(value))
      ) {
        setWinnerResult("0 is winner");
        backgroundAnimation.classList.add("background-animation");
      }
    });
  };

  useEffect(() => {
    checkWiner();
  }, [cubeList]);

  const restart = () => {
    setCubeList(cubeListArray);
    setPointer("X");
    setWinnerResult("");
    var backgroundAnimation = document.querySelector(".board");
    backgroundAnimation.classList.remove("background-animation");
  };

  return (
    <div className="board">
      {cubeList.map((rowData, index) => {
        return (
          <div className="board-row" key={index}>
            {Object.keys(rowData).map((key) => {
              return (
                <Cube
                  value={rowData[key]}
                  index={key}
                  updateCubeList={updateCubeList}
                  key={key}
                  winner={winnerResult}
                />
              );
            })}
          </div>
        );
      })}
      <div className="restart">
        <button onClick={() => restart()}>Restart</button>
      </div>
      <div className="result">
        <h3>{winnerResult}</h3>
      </div>
    </div>
  );
}

export default App;
