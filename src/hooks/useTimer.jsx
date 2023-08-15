import React, { useState, useEffect } from "react";

const INITIAL_TIMES = {
  Pomodoro: {
    seconds: 0,
    minutes: 25,
  },
  "Short Break": {
    seconds: 0,
    minutes: 5,
  },
  "Long Break": {
    seconds: 0,
    minutes: 15,
  },
};

const initialLongBreakInterval = 4;

const useTimer = (page, changePage) => {
  const [minutes, setMinutes] = useState(INITIAL_TIMES["Pomodoro"].minutes);
  const [seconds, setSeconds] = useState(INITIAL_TIMES["Pomodoro"].seconds);
  const [longBreakInterval, setLongBreakInterval] = useState(0);
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
    changePage(page);
    setMinutes(INITIAL_TIMES[page].minutes);
    setSeconds(INITIAL_TIMES[page].seconds);
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
    setStart(!start);
    click.play();
  };

  const parseMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const parseSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return {
    minutes: parseMinutes,
    seconds: parseSeconds,
    start,
    handleStart,
    handlePage,
  };
};

export default useTimer;
