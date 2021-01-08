import React from "react";
import StyledDisplay from "./styles/StyledDisplay";
import styled from "styled-components";

const StyledH1 = styled.h1`
  font-size: 60px;
`;

const WeatherDisplay = ({ weather }) => {
  const { currentTemp, tempMax, tempMin, weatherMain } = weather;
  return (
    <StyledDisplay>
      <StyledH1>
        {Math.round(currentTemp)} <span>&#186; C</span>
      </StyledH1>
      <h2>{weatherMain}</h2>
      <h3>{`${Math.round(tempMax)} / ${Math.round(tempMin)} `}</h3>
    </StyledDisplay>
  );
};

export default WeatherDisplay;
