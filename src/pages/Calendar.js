import React, { useState } from "react";

import CalendarUI from "../components/CalendarUI";
import Header from "../components/Header";
import Reminders from "../components/Reminders";

const reminders = [
  {
    id: 1,
    title: "Meet with Leslie Alexander",
    startDatetime: "2022-07-05T13:00",
    endDatetime: "2022-07-05T14:30",
    location: "Caruaru, PE",
  },
  {
    id: 2,
    title: "Remender to buy milk",
    startDatetime: "2022-07-20T09:00",
    endDatetime: "2022-07-20T11:30",
    location: "Caruaru, PE",
  },
  {
    id: 3,
    title: "Go to a dinner with Sara",
    startDatetime: "2022-07-20T17:00",
    endDatetime: "2022-07-20T18:30",
    location: "Caruaru, PE",
  },
  {
    id: 4,
    title: "Meet with CEO",
    startDatetime: "2022-08-09T13:00",
    endDatetime: "2022-08-09T14:30",
    location: "Lisbon, Portugal",
  },
  {
    id: 5,
    title: "Meet with the team",
    startDatetime: "2022-08-13T14:00",
    endDatetime: "2022-08-13T14:30",
    location: "Lisbon, Portugal",
  },
];

function Calendar() {
  const [selectedDay, setSelectedDay] = useState("");

  return (
    <div className="content">
      <Header />
      <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
        <section className="md:pr-14">
          <CalendarUI
            onSelectDate={(newDay) => setSelectedDay(newDay)}
            reminders={reminders}
          />
        </section>
        <section className="mt-12 md:mt-0 md:pl-14">
          {selectedDay ? (
            <Reminders reminders={reminders} selectedDay={selectedDay} />
          ) : (
            <p>loading</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default Calendar;
