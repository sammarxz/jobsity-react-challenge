import { useMemo } from "react";

import { format, parseISO, isSameDay } from "date-fns";
import PropTypes from "prop-types";

import Reminder from "./Reminder";

function Reminders({ reminders, selectedDay }) {
  let selectedDayReminders = useMemo(
    () =>
      reminders.filter((reminder) =>
        isSameDay(parseISO(reminder.startDatetime), selectedDay)
      ),
    [reminders, selectedDay]
  );

  return (
    <>
      <h2 className="font-semibold text-gray-900">
        Reminders for{" "}
        <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
          {format(selectedDay, "MMM dd, yyy")}
        </time>
      </h2>
      <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
        {selectedDayReminders.length > 0 ? (
          selectedDayReminders.map((meeting) => (
            <Reminder reminder={meeting} key={meeting.id} />
          ))
        ) : (
          <p className="mt-10">No reminder for today.</p>
        )}
      </ol>
    </>
  );
}

Reminders.propTypes = {
  selectedDay: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  reminders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      startDate: PropTypes.string,
      endSate: PropTypes.string,
      location: PropTypes.string,
    }).isRequired
  ),
};

export default Reminders;
