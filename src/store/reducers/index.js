import { combineReducers } from "redux";

import { ReminderReducer } from "./reminderReducer";

const reducers = {
  reminders: ReminderReducer,
};

export default combineReducers(reducers);
