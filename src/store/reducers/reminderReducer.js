import { ReminderTypes } from "../constants";

const INITIAL_STATE = {
  loading: true,
  reminders: [],
  error: "",
};

const {
  FETCH_REMINDERS_REQUEST,
  FETCH_REMINDERS_SUCCESS,
  FETCH_REMINDERS_FAILURE,
  REMOVE_REMINDER,
  UPDATE_REMINDER,
  ADD_REMINDER,
} = ReminderTypes;

export const ReminderReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case FETCH_REMINDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_REMINDERS_SUCCESS:
      return {
        loading: false,
        reminders: payload.reminders,
        error: "",
      };
    case FETCH_REMINDERS_FAILURE:
      return {
        loading: false,
        reminders: [],
        error: payload,
      };
    case ADD_REMINDER:
      return {
        ...state,
        reminders: [...state.reminders, payload],
      };
    case UPDATE_REMINDER:
      return {
        ...state,
        reminders: state.reminders.map((reminder) =>
          reminder.id === payload.id ? { ...reminder, ...payload } : reminder
        ),
      };
    case REMOVE_REMINDER:
      return {
        ...state,
        reminders: state.reminders.filter(
          (reminder) => reminder.id !== payload
        ),
      };
    default:
      return state;
  }
};
