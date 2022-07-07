import axios from "redaxios";

import { ReminderTypes } from "../constants";

const {
  FETCH_REMINDERS_REQUEST,
  FETCH_REMINDERS_SUCCESS,
  FETCH_REMINDERS_FAILURE,
  REMOVE_REMINDER,
  UPDATE_REMINDER,
  ADD_REMINDER,
} = ReminderTypes;

const addReminder = (reminder) => {
  return async function (dispatch) {
    await axios.post("/api/reminders", { ...reminder }).then((response) => {
      dispatch({
        type: ADD_REMINDER,
        payload: response.data.reminder,
      });
    });
  };
};

const updateReminder = (reminder) => {
  return async function (dispatch) {
    await axios
      .patch(`/api/reminders/${reminder.id}`, { ...reminder })
      .then((response) => {
        dispatch({
          type: UPDATE_REMINDER,
          payload: response.data.reminder,
        });
      });
  };
};

const removeReminder = (reminderId) => {
  return async function (dispatch) {
    await axios.delete(`/api/reminders/${reminderId}`).then((response) => {
      dispatch({
        type: REMOVE_REMINDER,
        payload: reminderId,
      });
    });
  };
};

const fetchRemindersRequest = () => {
  return {
    type: FETCH_REMINDERS_REQUEST,
  };
};

const fetchRemindersSuccess = (reminders) => {
  return {
    type: FETCH_REMINDERS_SUCCESS,
    payload: reminders,
  };
};

const fetchRemindersFailure = (error) => {
  return {
    type: FETCH_REMINDERS_FAILURE,
    payload: error,
  };
};

const fetchReminders = () => {
  return async function (dispatch) {
    dispatch(fetchRemindersRequest());
    await axios
      .get("api/reminders")
      .then((response) => {
        dispatch(fetchRemindersSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchRemindersFailure(error));
      });
  };
};

export {
  addReminder,
  updateReminder,
  removeReminder,
  fetchRemindersSuccess,
  fetchReminders,
  fetchRemindersFailure,
};
