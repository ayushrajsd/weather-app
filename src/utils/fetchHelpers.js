const MAPBOX_BASE = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const WEATHER_BASE = "https://api.openweathermap.org/data/2.5/onecall";

const getGeocode = async (location) => {
  const URL = `${MAPBOX_BASE}${location}.json?types=place&access_token=pk.eyJ1IjoiYXl1c2hyYWpzZCIsImEiOiJja2ptMnZwb20wZTlwMnJ0Zm51b2FxOGt6In0.UiVmLuibqEsaDfrRWyFuTA`;

  const geocodeList = await fetch(URL)
    .then((data) => data.json())
    .then((result) => result.features);

  // The coordinates of the feature’s center in the form [longitude,latitude]
  const coordinates = geocodeList[0].center;
  // The ternary operator prevents return of placeName in non-Latin letters (places with Japanese letters for example)
  const placeName = geocodeList[0].matching_text
    ? geocodeList[0].matching_text
    : geocodeList[0].text;

  const state = geocodeList[0].context[0].text;
  const country = geocodeList[0].context[1].text;
  return { coordinates, placeName, state, country };
};

export const getWeather = async (location) => {
  const geocodeResult = await getGeocode(location);
  const [lon, lat] = geocodeResult.coordinates;
  // .split(/\b\s[Ss]hi\b/) cut off japanese city sufix ('Iwata Shi' == after split() ==> 'Iwata')
  const placeName = {
    city: geocodeResult.placeName.split(/\b\s[Ss]hi\b/)[0],
    state: geocodeResult.state,
    country: geocodeResult.country,
  };

  const URL = `${WEATHER_BASE}?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=92b577fe3e0345982be28d15f7181b63`;

  const weatherResult = await fetch(URL)
    .then((data) => data.json())
    .then((result) => result);

  const currentTemp = weatherResult.current.temp;
  const todayWeather = weatherResult.daily[0];
  const weatherMain = todayWeather.weather[0].main;
  const tempMax = todayWeather.temp.max;
  const tempMin = todayWeather.temp.min;

  return [{ currentTemp, weatherMain, tempMax, tempMin }, placeName];
};
