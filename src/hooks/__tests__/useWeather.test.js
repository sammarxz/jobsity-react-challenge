import { renderHook } from "@testing-library/react-hooks";

import { useWeather } from "../";

describe("useWeather", () => {
  it("Get the weather based on location", async () => {
    const { result } = renderHook(() => useWeather("Caruaru", test));
    expect(result.current.weather.temperature);
    expect(result.current.weather.icon);
  });
});
