import { useState, useEffect } from "react";

const BG_COLORS = {
  Pomodoro: "#51943d",
  "Short Break": "#4c9195",
  "Long Break": "#8c4c95",
};

const PAGES = ["Pomodoro", "Short Break", "Long Break"];

export default function usePage() {
  const [bgColor, setBgColor] = useState(BG_COLORS["Pomodoro"]);
  const [page, setPage] = useState("Pomodoro");

  function changePage(newPage) {
    if (!PAGES.includes(newPage))
      throw new Error(`The ${newPage} page does not exist`);
    setBgColor(BG_COLORS[newPage]);
    setPage(newPage);
  }

  return { page, changePage, bgColor };
}
