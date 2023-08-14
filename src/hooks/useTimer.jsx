import React, { useState, useEffect } from "react";

const initialPomodoro = {
  seconds: 0,
  minutes: 25,
};

const initialShortBreak = {
  seconds: 0,
  minutes: 5,
};

const initialLongBreak = {
  seconds: 0,
  minutes: 15,
};

const initialLongBreakInterval = 4;

const useTimer = () => {
  const [minutes, setMinutes] = useState(initialPomodoro.minutes);
  const [seconds, setSeconds] = useState(initialPomodoro.seconds);
  const [longBreakInterval, setLongBreakInterval] = useState(0);
  const [page, setPage] = useState("Pomodoro");
  const [start, setStart] = useState(false);

  const click = new Audio("/sounds/cajas-registradoras_3.mp3");
  const newPage = new Audio("/sounds/002663916_prev.mp3");

  const handleTimeZero = () => {
    if (longBreakInterval < initialLongBreakInterval) {
      if (page === "Pomodoro") {
        setLongBreakInterval(longBreakInterval + 1);
        changeTimer("Short Break");
      } else {
        changeTimer("Pomodoro");
      }
    } else {
      setLongBreakInterval(0);
      changeTimer("Long Break");
    }
  };

  useEffect(() => {
    if (start) {
      setTimeout(() => {
        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } else {
            setStart(false);
            handleTimeZero();
            newPage.play();
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
  }, [seconds, start]);

  const changeTimer = (page) => {
    if (page === "Pomodoro") {
      setMinutes(initialPomodoro.minutes);
      setSeconds(initialPomodoro.seconds);
      setPage("Pomodoro");
    }
    if (page === "Short Break") {
      setMinutes(initialShortBreak.minutes);
      setSeconds(initialShortBreak.seconds);
      setPage("Short Break");
    }
    if (page === "Long Break") {
      setMinutes(initialLongBreak.minutes);
      setSeconds(initialLongBreak.seconds);
      setPage("Long Break");
    }
  };

  const handlePage = (page) => {
    if (start) {
      setStart(false);
      setTimeout(() => {
        if (window.confirm("Time is running, do you want to change phase?")) {
          changeTimer(page);
        } else {
          setStart(true);
        }
      }, 1000);
    } else {
      changeTimer(page);
    }
  };

  const handleStart = () => {
    if (!start) {
      setStart(true);
    } else {
      setStart(false);
    }

    click.play();
  };

  const parseMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const parseSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return {
    minutes: parseMinutes,
    seconds: parseSeconds,
    start,
    page,
    handleStart,
    handlePage,
  };
};

export default useTimer;
