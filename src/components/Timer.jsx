import React, { useState, useEffect } from "react";
import useTimer from "../hooks/useTimer";
import ButtonPage from "./ButtonPage";
import "./styles/Timer.css";

const bgColors = {
  pomodoro: "#51943d",
  shortBreak: "#4c9195",
  longBreak: "#8c4c95",
};

const Timer = () => {
  const [bgColor, setBgColor] = useState();
  const { minutes, seconds, start, page, handleStart, handlePage } = useTimer();

  useEffect(() => {
    if (page === "Pomodoro") {
      setBgColor(bgColors.pomodoro);
    }
    if (page === "Short Break") {
      setBgColor(bgColors.shortBreak);
    }
    if (page === "Long Break") {
      setBgColor(bgColors.longBreak);
    }
  }, [page]);

  return (
    <div className="background" style={{ backgroundColor: bgColor }}>
      <div className="box-timer">
        <div>
          <ButtonPage page={page} handleClick={() => handlePage("Pomodoro")}>
            Pomodoro
          </ButtonPage>
          <ButtonPage page={page} handleClick={() => handlePage("Short Break")}>
            Short Break
          </ButtonPage>
          <ButtonPage page={page} handleClick={() => handlePage("Long Break")}>
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
  );
};

export default Timer;
