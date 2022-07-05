import { ClockIcon, LocationMarkerIcon, SunIcon } from "@heroicons/react/solid";
import { format, parseISO } from "date-fns";
import PropTypes from "prop-types";

function Reminder({ reminder }) {
  let startDateTime = parseISO(reminder.startDatetime);
  let endDateTime = parseISO(reminder.endDatetime);

  return (
    <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
      <div className="flex flex-col flex-auto gap-1">
        <p className="text-gray-900 text-base">{reminder.title}</p>
        <div className="flex flex-auto items-center gap-2">
          <span className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4" />
            <p className="mt-0.5">
              <time dateTime={reminder.startDatetime}>
                {format(startDateTime, "h:mm a")}
              </time>{" "}
              -{" "}
              <time dateTime={reminder.endDatetime}>
                {format(endDateTime, "h:mm a")}
              </time>
            </p>
          </span>
          <span className="flex items-center gap-1">
            <LocationMarkerIcon className="w-4 h-4" />
            {reminder.location}
          </span>
          <span className="flex items-center gap-1">
            <SunIcon className="w-4 h-4" />
            27° C
          </span>
        </div>
      </div>
    </li>
  );
}

Reminder.propTypes = {
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

export default Reminder;
