import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Menu, Transition } from "@headlessui/react";
import { format, parseISO, startOfToday, isBefore } from "date-fns";
import { Pin, Clock, Sun, MoreVertical } from "lucide-react";
import PropTypes from "prop-types";

import { removeReminder } from "../store/actions";
import { classNames } from "../utils";

function Reminder({ reminder }) {
  const dispatch = useDispatch();
  const startDateTime = parseISO(reminder.startDatetime);
  const endDateTime = parseISO(reminder.endDatetime);

  const confirmDelete = async (id) => {
    // TODO: confirm delete with some dialog
    await dispatch(removeReminder(id));
  };

  return (
    <li className="flex items-center p-4 space-x-4 group rounded-xl focus-within:bg-gray-50 hover:bg-gray-50 border border-gray-200 relative">
      <div className="flex flex-col flex-auto gap-1 flex-wrap">
        <p className="text-gray-900 text-base">{reminder.title}</p>
        <div className="flex flex-auto items-center gap-2">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-blue-500" />
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
            <Pin className="w-4 h-4 text-blue-500" />
            {reminder.location}
          </span>
          <span className="flex items-center gap-1">
            <Sun className="w-4 h-4 text-blue-500" />
            27° C
          </span>
        </div>
      </div>
      <Menu
        as="div"
        className="absolute opacity-0 focus-within:opacity-100 group-hover:opacity-100 right-4"
      >
        <div>
          <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
            <span className="sr-only">Open options</span>
            <MoreVertical className="w-6 h-6" aria-hidden="true" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {!isBefore(startDateTime, startOfToday()) && (
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to=""
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                      state={{ modal: true, reminder }}
                    >
                      Edit
                    </Link>
                  )}
                </Menu.Item>
              )}
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => confirmDelete(reminder.id)}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full text-left px-4 py-2 text-sm"
                    )}
                  >
                    Delete
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
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

export { Reminder };
