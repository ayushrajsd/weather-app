import React from "react";
import StyledDisplay from "./styles/StyledDisplay";

const GeoDetails = ({ location, currentDate }) => {
  const { city, state, country } = location;
  return (
    <StyledDisplay>
      <h1>{city}</h1>
      <h1>
        {state}, {country}
      </h1>
      <h3>{currentDate}</h3>
    </StyledDisplay>
  );
};

export default GeoDetails;
