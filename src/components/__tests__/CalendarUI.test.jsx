import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { format, startOfToday, add } from "date-fns";

import CalendarUI from "../CalendarUI";

describe("<CalendarUI />", () => {
  it("should render the component", () => {
    const { container } = render(<CalendarUI />);
    expect(container).toBeInTheDocument();
  });
  it("should render the correct actual Month and Year", () => {
    const actualMonthAndYear = format(new Date(), "MMMM yyyy");
    render(<CalendarUI />);
    expect(screen.getByText(actualMonthAndYear)).toBeInTheDocument();
  });
  it("should render the correct previous month when user clicked to it", async () => {
    const today = startOfToday();
    const prevMonth = format(add(today, { months: -1 }), "MMMM yyyy");

    render(<CalendarUI />);
    const prevButton = screen.getByText("Previous month");
    expect(prevButton).toBeInTheDocument();
    userEvent.click(prevButton);
    expect(screen.getByText(prevMonth)).toBeInTheDocument();
  });
  it("should render the correct next month when user clicked to it", async () => {
    const today = startOfToday();
    const nextMonth = format(add(today, { months: +1 }), "MMMM yyyy");

    render(<CalendarUI />);
    const nextButton = screen.getByText("Next month");
    expect(nextButton).toBeInTheDocument();
    userEvent.click(nextButton);
    expect(screen.getByText(nextMonth)).toBeInTheDocument();
  });
  it("should call the correct function when user selected a day", () => {
    let mockFn = jest.fn();
    render(<CalendarUI onSelectDate={mockFn} />);
    const selectDay = "2022-07-07";
    const selectButton = screen.getByTestId(selectDay);
    userEvent.click(selectButton);
    expect(mockFn).toBeCalled();
    expect(mockFn).toBeCalledTimes(2);
  });
});
