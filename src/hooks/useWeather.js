import { useEffect, useState } from "react";

import axios from "redaxios";

function useWeather(location, test) {
  const [weather, setWeather] = useState();

  useEffect(() => {
    // mock for testing purposes
    if (test) {
      setWeather({
        temperature: 29,
        icon: "Clouds",
      });
      return;
    }

    const fetchData = async () => {
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API}`
        )
        .then((response) => {
          setWeather({
            temperature: parseInt(response.data.main.temp),
            icon: response.data.weather[0].main,
          });
        });
    };

    fetchData();
  }, [location]);

  return { weather };
}

export { useWeather };
