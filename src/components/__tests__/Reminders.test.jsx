import { render, screen } from "@testing-library/react";
import { format, parseISO } from "date-fns";

import Reminders from "../Reminders";

const mockReminders = [
  {
    id: 1,
    title: "Meet with Leslie Alexander",
    startDatetime: "2022-07-06T13:00",
    endDatetime: "2022-07-06T14:30",
    location: "Caruaru, PE",
  },
  {
    id: 2,
    title: "Remender to buy milk",
    startDatetime: "2022-07-20T09:00",
    endDatetime: "2022-07-20T11:30",
    location: "Caruaru Shopping",
  },
];

describe("<Reminders />", () => {
  it("should render empty reminders state", () => {
    render(<Reminders reminders={[]} selectedDay={new Date()} />);
    expect(screen.getByText(/no reminder for today/i)).toBeInTheDocument();
    expect(screen.getByText(/no reminder for today/i)).toBeInTheDocument();
  });
  it("should render correct formated date", () => {
    const selectedDay = new Date();
    const formatedDate = format(selectedDay, "MMM dd, yyy");
    render(<Reminders reminders={[]} selectedDay={selectedDay} />);
    expect(screen.getByText(formatedDate)).toBeInTheDocument();
  });
  it("should render one reminder for passed date and reminders list", () => {
    const selectedDay = "2022-07-06T03:00:00.000Z";
    render(
      <Reminders
        reminders={mockReminders}
        selectedDay={parseISO(selectedDay)}
      />
    );
    expect(screen.getByText(mockReminders[0].title));
  });
});
