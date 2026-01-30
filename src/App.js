import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import weatherData from "./data/weatherData";

const AppShell = styled.div`
  min-height: 100vh;
  background: radial-gradient(circle at top, #1b2747 0%, #0c1222 55%, #090d18 100%);
  color: #eef2ff;
  font-family: "Inter", system-ui, sans-serif;
  padding: 32px;
`;

const Content = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Header = styled.header`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Eyebrow = styled.span`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: #8fa3ff;
`;

const Title = styled.h1`
  font-size: 32px;
  margin: 0;
`;

const SubTitle = styled.p`
  margin: 0;
  color: #c7d2fe;
`;

const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  background: rgba(18, 30, 60, 0.6);
  border: 1px solid rgba(114, 139, 255, 0.2);
  padding: 12px 16px;
  border-radius: 16px;
`;

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
`;

const SearchInput = styled.input`
  background: #0f1b3a;
  color: #e0e7ff;
  border: 1px solid rgba(114, 139, 255, 0.35);
  padding: 10px 14px;
  border-radius: 10px;
  min-width: 220px;
`;

const Suggestions = styled.div`
  position: absolute;
  top: 48px;
  left: 0;
  right: 0;
  background: #0f1b3a;
  border: 1px solid rgba(114, 139, 255, 0.35);
  border-radius: 10px;
  overflow: hidden;
  z-index: 10;
`;

const SuggestionButton = styled.button`
  background: transparent;
  color: #e0e7ff;
  border: none;
  width: 100%;
  padding: 10px 14px;
  text-align: left;
  cursor: pointer;
  &:hover {
    background: rgba(114, 139, 255, 0.2);
  }
`;

const ToggleButton = styled.button`
  background: ${({ active }) => (active ? "#6d8bff" : "transparent")};
  color: ${({ active }) => (active ? "#0b1020" : "#e0e7ff")};
  border: 1px solid rgba(114, 139, 255, 0.4);
  border-radius: 999px;
  padding: 8px 14px;
  font-weight: 600;
  cursor: pointer;
`;

const DashboardGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
`;

const CityCard = styled.button`
  background: rgba(16, 24, 48, 0.75);
  border: 1px solid rgba(114, 139, 255, 0.2);
  border-radius: 20px;
  padding: 18px;
  text-align: left;
  color: inherit;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 200px;
  transition: transform 0.2s ease, border 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(114, 139, 255, 0.6);
  }
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CityName = styled.h2`
  margin: 0;
  font-size: 20px;
`;

const CardMeta = styled.p`
  margin: 0;
  color: #a5b4fc;
  font-size: 13px;
`;

const TempDisplay = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
`;

const TempValue = styled.span`
  font-size: 36px;
  font-weight: 700;
`;

const Condition = styled.span`
  font-size: 14px;
  color: #dbeafe;
`;

const StatsRow = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 13px;
  color: #c7d2fe;
`;

const FavoriteButton = styled.button`
  background: ${({ active }) => (active ? "#fbbf24" : "transparent")};
  color: ${({ active }) => (active ? "#0b1020" : "#fbbf24")};
  border: 1px solid rgba(251, 191, 36, 0.6);
  border-radius: 999px;
  padding: 4px 10px;
  font-weight: 700;
  cursor: pointer;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionTitle = styled.h3`
  margin: 0;
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(6, 10, 24, 0.75);
  display: ${({ open }) => (open ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 100;
`;

const Modal = styled.div`
  background: #0f172a;
  border-radius: 24px;
  max-width: 1100px;
  width: 100%;
  padding: 24px;
  border: 1px solid rgba(114, 139, 255, 0.3);
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
`;

const CloseButton = styled.button`
  background: transparent;
  border: 1px solid rgba(114, 139, 255, 0.4);
  color: #e0e7ff;
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
  margin-top: 20px;
`;

const DetailCard = styled.div`
  background: rgba(30, 41, 59, 0.7);
  border-radius: 16px;
  padding: 16px;
  border: 1px solid rgba(114, 139, 255, 0.2);
`;

const ForecastList = styled.div`
  display: grid;
  gap: 8px;
`;

const ForecastRow = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr 90px;
  gap: 12px;
  align-items: center;
  font-size: 14px;
  color: #cbd5f5;
`;

const RangeToggle = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

const ChartWrapper = styled.div`
  width: 100%;
  background: rgba(15, 23, 42, 0.8);
  border-radius: 12px;
  padding: 12px;
  margin-top: 12px;
`;

const ChartLegend = styled.div`
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: #c7d2fe;
  margin-top: 8px;
`;

const FooterNote = styled.p`
  margin: 0;
  font-size: 12px;
  color: #9aa5d1;
`;

const ChartSvg = styled.svg`
  width: 100%;
  height: 180px;
`;

const formatTemp = (tempC, unit) => {
  if (unit === "F") {
    return `${Math.round(tempC * 1.8 + 32)}°F`;
  }
  return `${Math.round(tempC)}°C`;
};

const buildPoints = (data, dataKey, width, height, padding) => {
  const values = data.map((item) => item[dataKey]);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  return data.map((item, index) => {
    const x = padding + (index / (data.length - 1 || 1)) * (width - padding * 2);
    const y = height - padding - ((item[dataKey] - min) / range) * (height - padding * 2);
    return {
      x,
      y,
      label: item.label,
      value: item[dataKey],
    };
  });
};

const TrendChart = ({ data, dataKey, stroke, formatValue }) => {
  const width = 320;
  const height = 180;
  const padding = 20;
  const points = buildPoints(data, dataKey, width, height, padding);
  const line = points.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <ChartSvg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <polyline fill="none" stroke={stroke} strokeWidth="3" points={line} />
      {points.map((point) => (
        <g key={point.label}>
          <circle cx={point.x} cy={point.y} r="4" fill={stroke} />
          <title>
            {point.label}: {formatValue(point.value)}
          </title>
        </g>
      ))}
    </ChartSvg>
  );
};

const App = () => {
  const [unit, setUnit] = useState("C");
  const [favorites, setFavorites] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [range, setRange] = useState("hourly");
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const storedUnit = window.localStorage.getItem("unit");
    const storedFavorites = window.localStorage.getItem("favorites");
    if (storedUnit) {
      setUnit(storedUnit);
    }
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("unit", unit);
  }, [unit]);

  useEffect(() => {
    window.localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdated(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const sortedCities = useMemo(() => {
    return [...weatherData].sort((a, b) => {
      const aFav = favorites.includes(a.id) ? 0 : 1;
      const bFav = favorites.includes(b.id) ? 0 : 1;
      return aFav - bFav;
    });
  }, [favorites]);

  const suggestions = useMemo(() => {
    if (!search) return [];
    return weatherData.filter((city) =>
      city.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const handleFavorite = (cityId) => {
    setFavorites((prev) =>
      prev.includes(cityId) ? prev.filter((id) => id !== cityId) : [...prev, cityId]
    );
  };

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    setShowSuggestions(false);
  };

  const temperatureSeries = (city) => {
    if (range === "hourly") {
      return city.hourly.map((hour) => ({
        label: hour.time,
        value: unit === "C" ? hour.tempC : hour.tempC * 1.8 + 32,
      }));
    }
    return city.historical.map((day) => ({
      label: day.label,
      value: unit === "C" ? day.tempC : day.tempC * 1.8 + 32,
    }));
  };

  return (
    <AppShell>
      <Content>
        <Header>
          <TitleGroup>
            <Eyebrow>Weather Analytics Dashboard</Eyebrow>
            <Title>Multi-city insights & realtime snapshots</Title>
            <SubTitle>
              Updated {lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </SubTitle>
          </TitleGroup>
          <Controls>
            <SearchWrapper>
              <SearchInput
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setShowSuggestions(true);
                }}
                placeholder="Search for a city"
              />
              {showSuggestions && suggestions.length > 0 && (
                <Suggestions>
                  {suggestions.map((city) => (
                    <SuggestionButton
                      key={city.id}
                      type="button"
                      onClick={() => handleSelectCity(city)}
                    >
                      {city.name}, {city.country}
                    </SuggestionButton>
                  ))}
                </Suggestions>
              )}
            </SearchWrapper>
            <div>
              <ToggleButton
                type="button"
                active={unit === "C"}
                onClick={() => setUnit("C")}
              >
                °C
              </ToggleButton>
              <ToggleButton
                type="button"
                active={unit === "F"}
                onClick={() => setUnit("F")}
              >
                °F
              </ToggleButton>
            </div>
          </Controls>
        </Header>

        <SectionHeader>
          <SectionTitle>Dashboard</SectionTitle>
          <FooterNote>Favorites stay pinned and sync to local storage.</FooterNote>
        </SectionHeader>

        <DashboardGrid>
          {sortedCities.map((city) => (
            <CityCard key={city.id} type="button" onClick={() => setSelectedCity(city)}>
              <CardTop>
                <div>
                  <CityName>{city.name}</CityName>
                  <CardMeta>
                    {city.region}, {city.country}
                  </CardMeta>
                </div>
                <FavoriteButton
                  type="button"
                  active={favorites.includes(city.id)}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleFavorite(city.id);
                  }}
                >
                  ★
                </FavoriteButton>
              </CardTop>
              <TempDisplay>
                <TempValue>{formatTemp(city.current.tempC, unit)}</TempValue>
                <span>{city.current.icon}</span>
              </TempDisplay>
              <Condition>{city.current.condition}</Condition>
              <StatsRow>
                <span>Humidity {city.current.humidity}%</span>
                <span>Wind {city.current.windKph} kph</span>
                <span>UV {city.current.uvIndex}</span>
              </StatsRow>
            </CityCard>
          ))}
        </DashboardGrid>

        <ModalOverlay open={Boolean(selectedCity)}>
          {selectedCity && (
            <Modal>
              <ModalHeader>
                <div>
                  <CityName>
                    {selectedCity.name} {selectedCity.current.icon}
                  </CityName>
                  <CardMeta>
                    {selectedCity.region}, {selectedCity.country} • {selectedCity.current.condition}
                  </CardMeta>
                </div>
                <div>
                  <FavoriteButton
                    type="button"
                    active={favorites.includes(selectedCity.id)}
                    onClick={() => handleFavorite(selectedCity.id)}
                  >
                    ★ Favorite
                  </FavoriteButton>
                  <CloseButton type="button" onClick={() => setSelectedCity(null)}>
                    Close
                  </CloseButton>
                </div>
              </ModalHeader>

              <DetailGrid>
                <DetailCard>
                  <h4>Current Details</h4>
                  <p>
                    Temperature: <strong>{formatTemp(selectedCity.current.tempC, unit)}</strong>
                  </p>
                  <p>Humidity: {selectedCity.current.humidity}%</p>
                  <p>Wind: {selectedCity.current.windKph} kph</p>
                  <p>Pressure: {selectedCity.current.pressureMb} mb</p>
                  <p>Dew point: {formatTemp(selectedCity.current.dewPointC, unit)}</p>
                  <p>UV index: {selectedCity.current.uvIndex}</p>
                </DetailCard>

                <DetailCard>
                  <h4>5-7 Day Forecast</h4>
                  <ForecastList>
                    {selectedCity.daily.map((day) => (
                      <ForecastRow key={day.day}>
                        <strong>{day.day}</strong>
                        <span>{day.condition}</span>
                        <span>
                          {formatTemp(day.maxC, unit)} / {formatTemp(day.minC, unit)}
                        </span>
                      </ForecastRow>
                    ))}
                  </ForecastList>
                </DetailCard>

                <DetailCard>
                  <h4>Hour-by-hour Forecast</h4>
                  <ForecastList>
                    {selectedCity.hourly.map((hour) => (
                      <ForecastRow key={hour.time}>
                        <strong>{hour.time}</strong>
                        <span>Precip {hour.precipMm} mm</span>
                        <span>{formatTemp(hour.tempC, unit)}</span>
                      </ForecastRow>
                    ))}
                  </ForecastList>
                </DetailCard>
              </DetailGrid>

              <DetailGrid>
                <DetailCard>
                  <h4>Temperature trends</h4>
                  <RangeToggle>
                    <ToggleButton
                      type="button"
                      active={range === "hourly"}
                      onClick={() => setRange("hourly")}
                    >
                      24h
                    </ToggleButton>
                    <ToggleButton
                      type="button"
                      active={range === "daily"}
                      onClick={() => setRange("daily")}
                    >
                      7d
                    </ToggleButton>
                  </RangeToggle>
                  <ChartWrapper>
                    <TrendChart
                      data={temperatureSeries(selectedCity)}
                      dataKey="value"
                      stroke="#7dd3fc"
                      formatValue={(value) => `${Math.round(value)}°${unit}`}
                    />
                    <ChartLegend>
                      <span>Hover points for values</span>
                    </ChartLegend>
                  </ChartWrapper>
                </DetailCard>

                <DetailCard>
                  <h4>Precipitation patterns</h4>
                  <ChartWrapper>
                    <TrendChart
                      data={selectedCity.historical.map((day) => ({
                        label: day.label,
                        value: day.precipMm,
                      }))}
                      dataKey="value"
                      stroke="#818cf8"
                      formatValue={(value) => `${value.toFixed(1)} mm`}
                    />
                    <ChartLegend>
                      <span>7-day accumulation</span>
                    </ChartLegend>
                  </ChartWrapper>
                </DetailCard>

                <DetailCard>
                  <h4>Wind speed & direction</h4>
                  <ChartWrapper>
                    <TrendChart
                      data={selectedCity.historical.map((day) => ({
                        label: day.label,
                        value: day.windKph,
                      }))}
                      dataKey="value"
                      stroke="#f97316"
                      formatValue={(value) => `${Math.round(value)} kph`}
                    />
                    <ChartLegend>
                      <span>Typical range</span>
                    </ChartLegend>
                  </ChartWrapper>
                </DetailCard>
              </DetailGrid>
            </Modal>
          )}
        </ModalOverlay>
      </Content>
    </AppShell>
  );
};

export default App;
