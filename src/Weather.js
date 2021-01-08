import React, { useState, useEffect } from "react";
import Wrapper from "./Wrapper";
import { getWeather } from "./utils/fetchHelpers";
import StyledWrapper from "./styles/StyledWrapper";
import blue from "../assets/blue.jpg";
import orange from "../assets/orange.jpg";
import green from "../assets/green.jpg";

const Weather = () => {
  const [weather, setWeather] = useState({
    currentTemp: 0,
    weatherMain: 0,
    tempMin: 0,
    tempMax: 0,
  });
  const [location, setLocation] = useState({
    city: "",
    state: "",
    country: "",
  });
  const [currentDate, setDate] = useState("");
  const [inputLocation, setInputLocation] = useState("Embu");

  useEffect(() => {
    fetchData("New York").then(([currentWeather, place]) => {
      setWeather(currentWeather);
      setLocation(place);
    });
  }, []);

  async function fetchData(location) {
    const weather = await getWeather(location);
    updateDate();
    return weather;
  }

  const updateDate = () => {
    setDate(dateBuilder(new Date()));
  };

  const updateLocation = (event) => {
    event.preventDefault();
    fetchData(inputLocation).then(([currentWeather, place]) => {
      setWeather(currentWeather);
      setLocation(place);
    });
  };

  const updateSearchText = (event) => {
    setInputLocation(event.target.value);
  };

  const dateBuilder = (d) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const setBackground = () => {
    const now = new Date();
    const hour = now.getHours();
    if (hour <= 7 || hour > 18) {
      return blue;
    }
    if (hour > 7 && hour <= 15) {
      return green;
    }
    return orange;
  };

  return (
    <StyledWrapper bgImage={setBackground()}>
      <Wrapper
        states={{ weather, location, currentDate }}
        updateLocation={updateLocation}
        searchText={updateSearchText}
      />
    </StyledWrapper>
  );
};

export default Weather;
