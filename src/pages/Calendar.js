import React from "react";

import CalendarUI from "../components/CalendarUI";
import Header from "../components/Header";

function Calendar() {
  const selectDate = (selectedDay) => {
    console.log(selectedDay);
  };

  return (
    <div className="content">
      <Header />
      <CalendarUI onSelectDate={selectDate} />
    </div>
  );
}

export default Calendar;
