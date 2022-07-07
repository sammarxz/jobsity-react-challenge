import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import {
  Header,
  Loader,
  CalendarUI,
  Reminders,
  ReminderForm,
} from "../../components";
import { fetchReminders } from "../../store/actions";

function Calendar() {
  const location = useLocation();
  const modal = location.state && location.state.modal;
  const reminder =
    location.state && location.state.reminder && location.state.reminder;
  const [selectedDay, setSelectedDay] = useState("");
  const remindersState = useSelector((state) => state.reminders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReminders());
  }, []);

  function renderApp() {
    if (remindersState.loading && remindersState.reminders.lenght === 0) {
      return <Loader />;
    }

    return (
      <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
        <section className="md:pr-14">
          <CalendarUI
            onSelectDate={(newDay) => setSelectedDay(newDay)}
            reminders={remindersState.reminders}
          />
        </section>
        <section className="mt-12 md:mt-0 md:pl-14">
          {selectedDay ? (
            <Reminders
              reminders={remindersState.reminders}
              selectedDay={selectedDay}
            />
          ) : (
            <Loader />
          )}
        </section>
      </div>
    );
  }

  return (
    <div className="content mb-16">
      <Header />
      {renderApp()}
      {modal && selectedDay && (
        <ReminderForm selectedDay={selectedDay} data={reminder} />
      )}
    </div>
  );
}

export { Calendar };
