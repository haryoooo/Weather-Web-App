import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import "./Homepage.css";
import HomepageComponent from "../components/HomepageComponent";
import DateComponent from "../components/DateComponent";

const API_KEY = process.env.REACT_APP_ENV_API_KEY;
const NOMINATIM_URL = process.env.REACT_APP_ENV_NOMINATIM_URL;
const WEATHER_URL = process.env.REACT_APP_ENV_WEATHER_URL;

// Utility function to format date
const formatDateTime = (timestamp) => {
  const a = new Date(timestamp * 1000);
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

  return `${days[a.getDay()]}, ${a.getDate()} ${
    months[a.getMonth()]
  } ${a.getFullYear()} ${a.getHours()}:${String(a.getMinutes()).padStart(
    2,
    "0"
  )}`;
};

// Fetch city details based on latitude and longitude
const fetchCityDetails = async (lat, lon) => {
  try {
    const response = await fetch(
      `${NOMINATIM_URL}?format=json&lat=${lat}&lon=${lon}`
    );
    const data = await response.json();
    return { ...data.address, lat, lon };
  } catch (error) {
    console.error("Error fetching city details:", error);
    return null;
  }
};

// Fetch weather data from OpenWeatherMap
const fetchWeatherData = async (lat, lon) => {
  try {
    const response = await axios.get(
      `${WEATHER_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    const data = response.data;

    return {
      daytime: formatDateTime(data.dt),
      main: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      temp: data.main.temp,
      feels_like: data.main.feels_like,
      minTemp: data.main.temp_min,
      maxTemp: data.main.temp_max,
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      visibility: data.visibility,
      timezone: data.timezone,
      country: data.sys.country,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

export default function Homepage() {
  const [weather, setWeather] = useState(null);
  const [addressDetails, setAddressDetails] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          console.log("Accuracy:", position.coords.accuracy, "meters");
          const { latitude, longitude } = position.coords;

          const cityData = await fetchCityDetails(latitude, longitude);
          const weatherData = await fetchWeatherData(latitude, longitude);

          if (cityData) setAddressDetails(cityData);
          if (weatherData) setWeather(weatherData);
        },
        (error) => {
          console.error("Error getting location:", error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 60000,
          maximumAge: 0,
        }
      );
    };

    getLocation();
  }, []);

  if (weather === null && addressDetails === null) {
    return (
      <div className="isLoading">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <div className="daytime">
        <DateComponent daytime={weather?.daytime} />
      </div>
      <div className="Homepage">
        <HomepageComponent
          state={addressDetails?.suburb || "Unknown"}
          country={weather?.country}
          temp={weather?.temp}
          icon={weather?.icon}
          description={weather?.description}
          visibility={weather?.visibility}
          pressure={weather?.pressure}
          feels_like={weather?.feels_like}
          humidity={weather?.humidity}
          maxTemp={weather?.maxTemp}
          minTemp={weather?.minTemp}
        />
      </div>
    </>
  );
}
