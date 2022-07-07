import { formatISO } from "date-fns";

const formatDateToInputDatetime = (day) => {
  return formatISO(new Date(day)).slice(0, 19);
};

export { formatDateToInputDatetime };
