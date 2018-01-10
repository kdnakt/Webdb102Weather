// @flow

import CurrentWeather from './CurrentWeather';
import WeatherForecast from './WeatherForecast';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = 'YOUR_API_KEY';// TODO: change

function getCurrentWeatherEndpoint(query: string) {
  return `${BASE_URL}weather?q=${query}`
    + `&appid=${API_KEY}&lang=ja`;
}

function getCurrentWeather(city: string)
  : Promise<CurrentWeather> {
  const endpoint = getCurrentWeatherEndpoint(city);
  return fetch(endpoint)
    .then(response => response.json())
    .then(json => new CurrentWeather(json));
}

function getWeatherForecastEndpoint(query: string) {
  return `${BASE_URL}forecast?q=${query}`
    + `&appid=${API_KEY}&lang=ja`;
}

function getWeatherForecast(city: string)
  : Promise<WeatherForecast[]> {
  const endpoint = getWeatherForecastEndpoint(city),
    forecasts = [];
  return fetch(endpoint)
    .then(response => response.json())
    .then(json => {
      json.list.forEach(forecast => {
        forecasts.push(new WeatherForecast(forecast));
      });
      return forecasts;
    });
}

export { getCurrentWeather, getWeatherForecast };
