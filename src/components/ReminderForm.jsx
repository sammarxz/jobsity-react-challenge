import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addReminder, updateReminder } from "../store/actions";
import { formatDateToInputDatetime } from "../utils";
import { Input, Modal } from "./";

function ReminderForm({ selectedDay, data }) {
  const dispatch = useDispatch();
  const initialReminder = {
    title: "",
    startDatetime: formatDateToInputDatetime(selectedDay),
    endDatetime: formatDateToInputDatetime(selectedDay),
    locatin: "",
  };

  const [reminder, setReminder] = useState(data ? data : initialReminder);
  const history = useNavigate();

  const closeModal = (e) => {
    if (e) {
      e.stopPropagation();
    }
    history("/calendar");
  };

  const handleInputChange = (e) => {
    setReminder((prevState) => ({
      ...prevState,
      [e.name]: e.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (checkReminder()) {
      switch (checkFormType()) {
        case "EDIT":
          await patchReminder();
          break;
        default:
          await newReminder();
      }
      closeModal();
    }
  };

  const newReminder = async () => {
    await dispatch(addReminder(reminder));
    setReminder(initialReminder);
  };

  const patchReminder = async () => {
    await dispatch(updateReminder(reminder));
  };

  const checkFormType = () => {
    if (data) {
      return "EDIT";
    }

    return "NEW";
  };

  const checkReminder = () => {
    if (
      reminder.title &&
      reminder.startDatetime &&
      reminder.endDatetime &&
      reminder.location
    ) {
      return true;
    }

    return false;
  };

  const { title, startDatetime, endDatetime, location } = reminder;

  return (
    <Modal onCloseModal={closeModal}>
      <header className="text-lg font-medium text-gray-900">
        <h3>{data ? "Edit Reminder" : "New Reminder"}</h3>
      </header>
      <section className="text-gray-400 text-sm w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <Input
            type="text"
            placeholder="Meet with..."
            id="title"
            label="Title"
            helperText="*max 30 characters"
            name="title"
            value={title || ""}
            onChange={handleInputChange}
            autoFocus
            maxLength={30}
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="datetime-local"
              placeholder="09:30"
              id="startDatetime"
              name="startDatetime"
              label="From"
              value={startDatetime}
              onChange={handleInputChange}
              required
            />
            <Input
              type="datetime-local"
              placeholder="10:30"
              id="endDatetime"
              name="endDatetime"
              label="To"
              value={endDatetime}
              onChange={handleInputChange}
              required
            />
          </div>
          <Input
            type="text"
            placeholder="Lisbon, Portugal"
            id="location"
            name="location"
            label="Location"
            value={location || ""}
            onChange={handleInputChange}
            required
          />
          <button
            type="submit"
            className={`block text-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white 
            hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue 
            focus-visible:ring-opacity-75 w-full mt-2 ${
              !checkReminder() && "opacity-25 cursor-not-allowed"
            }`}
            disabled={!checkReminder()}
          >
            Save Reminder
          </button>
        </form>
      </section>
    </Modal>
  );
}

export { ReminderForm };
