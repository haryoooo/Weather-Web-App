import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import "./Homepage.css";
import axios from "axios";
import HomepageComponent from "../components/HomepageComponent";
import DateComponent from "../components/DateComponent";

export default function Homepage() {
  const apiKey = "560c88d5e444dcf191449b1950464a9e";
  const [weather, setWeather] = useState(null);

  function getLocation() {
    navigator.geolocation.getCurrentPosition((position) =>
      getWeatherData(position.coords.latitude, position.coords.longitude)
    );
  }

  function getWeatherData(lat, long) {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`
      )
      .then((res) => {
        let a = new Date(res.data.dt * 1000);
        let months = [
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
        let days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ];
        let year = a.getFullYear();
        let day = days[a.getDay()];
        let month = months[a.getMonth()];
        let date = a.getDate();
        let hour = a.getHours();
        let min = a.getMinutes();
        let time =
          day + ", " + date + " " + month + " " + year + " " + hour + ":" + min;

        let data = {
          daytime: time,
          main: res.data.weather[0].main,
          description: res.data.weather[0].description,
          icon: res.data.weather[0].icon,
          temp: res.data.main.temp,
          feels_like: res.data.main.feels_like,
          minTemp: res.data.main.temp_min,
          maxTemp: res.data.main.temp_max,
          pressure: res.data.main.pressure,
          humidity: res.data.main.humidity,
          visibility: res.data.visibility,
          timezone: res.data.timezone,
          country: res.data.sys.country,
          state: res.data.name,
        };
        setWeather(data);
      })

      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getLocation();
  }, []);

  if (weather === null) {
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
        <DateComponent
          daytime={weather.daytime}
        />
      </div>
      <div className="Homepage">
        <HomepageComponent
          state={weather.state}
          country={weather.country}
          temp={weather.temp}
          icon={weather.icon}
          description={weather.description}
          visibility={weather.visibility}
          pressure={weather.pressure}
          feels_like={weather.feels_like}
          humidity={weather.humidity}
          maxTemp={weather.maxTemp}
          minTemp={weather.minTemp}
        />
      </div>
    </>
  );
}
