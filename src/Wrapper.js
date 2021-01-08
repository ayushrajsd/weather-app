import React from "react";
import SearchBox from "./SearchBox";
import GeoDetails from "./GeoDetails";
import WeatherDisplay from "./WeatherDisplay";

const Wrapper = ({ states, updateLocation, searchText }) => {
  return (
    <div>
      <SearchBox updateLocation={updateLocation} searchText={searchText} />
      <GeoDetails location={states.location} currentDate={states.currentDate} />
      <WeatherDisplay weather={states.weather} />
    </div>
  );
};

export default Wrapper;
