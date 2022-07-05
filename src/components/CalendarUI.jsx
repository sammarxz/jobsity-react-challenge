import React, { useState, useEffect } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
  isSameDay,
  parseISO,
} from "date-fns";
import PropTypes from "prop-types";

import classNames from "../utils/classNames";

function CalendarUI({ onSelectDate, reminders }) {
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  useEffect(() => {
    onSelectDate(selectedDay);
  }, [selectedDay, onSelectDate]);

  return (
    <div className="rounded-t">
      <div className="flex items-center">
        <h2 className="flex-auto font-semibold text-gray-900">
          {format(firstDayCurrentMonth, "MMMM yyyy")}
        </h2>
        <button
          type="button"
          aria-labelledby="Previous month"
          onClick={previousMonth}
          className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
        </button>
        <button
          onClick={nextMonth}
          aria-labelledby="Next month"
          type="button"
          className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Next month</span>
          <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
      <div className="grid grid-cols-7 mt-10 text-sm leading-6 text-center text-gray-500">
        {weekDays.map((weekDay) => (
          <div key={weekDay}>{weekDay}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 mt-2 text-sm">
        {days.map((day, dayIdx) => (
          <div
            key={day.toString()}
            className={classNames(
              dayIdx === 0 && colStartClasses[getDay(day)],
              "py-1"
            )}
          >
            <button
              data-testid={format(day, "yyyy-MM-dd")}
              type="button"
              onClick={() => setSelectedDay(day)}
              className={classNames(
                isEqual(day, selectedDay) && "text-white",
                !isEqual(day, selectedDay) && isToday(day) && "text-blue-500",
                !isEqual(day, selectedDay) &&
                  !isToday(day) &&
                  isSameMonth(day, firstDayCurrentMonth) &&
                  "text-gray-900",
                !isEqual(day, selectedDay) &&
                  !isToday(day) &&
                  !isSameMonth(day, firstDayCurrentMonth) &&
                  "text-gray-400",
                isEqual(day, selectedDay) && isToday(day) && "bg-blue-500",
                isEqual(day, selectedDay) && !isToday(day) && "bg-blue-900",
                !isEqual(day, selectedDay) && "hover:bg-blue-100",
                (isEqual(day, selectedDay) || isToday(day)) && "font-semibold",
                "mx-auto flex h-10 w-10 items-center justify-center rounded-full"
              )}
            >
              <time dateTime={format(day, "yyyy-MM-dd")}>
                {format(day, "d")}
              </time>
            </button>
            {reminders && (
              <div className="w-1.5 h-1.5 mx-auto mt-1">
                {reminders.some((reminder) =>
                  isSameDay(parseISO(reminder.startDatetime), day)
                ) && (
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

CalendarUI.propTypes = {
  onSelectDate: PropTypes.func,
  reminders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      startDate: PropTypes.string,
      endSate: PropTypes.string,
    })
  ),
};

CalendarUI.defaultProps = {
  onSelectDate: (selectedDay) => selectedDay,
};

const colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default CalendarUI;
