import React, { useState, useEffect } from "react";
import useTimer from "./hooks/useTimer";
import ButtonPage from "./components/ButtonPage";
import "./App.css";
import usePage from "./hooks/usePage";

function App() {
  const { page, changePage, bgColor } = usePage();
  const { minutes, seconds, start, handleStart, handlePage } = useTimer(
    page,
    changePage
  );

  return (
    <div className="App">
      <div className="background" style={{ backgroundColor: bgColor }}>
        <div className="box-timer">
          <div>
            <ButtonPage page={page} handleClick={() => handlePage("Pomodoro")}>
              Pomodoro
            </ButtonPage>
            <ButtonPage
              page={page}
              handleClick={() => handlePage("Short Break")}
            >
              Short Break
            </ButtonPage>
            <ButtonPage
              page={page}
              handleClick={() => handlePage("Long Break")}
            >
              Long Break
            </ButtonPage>
          </div>
          <div>
            <p className="timer">
              {minutes}:{seconds}
            </p>
          </div>
          <button
            className={start ? "btn-start btn-start-clicked" : "btn-start"}
            onClick={handleStart}
            style={{ color: bgColor }}
          >
            {start ? "Stop" : "Start"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
