import { useRef } from "react";
import { useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import cloud_icon from "../assets/cloud.png";
import humidity_icon from "../assets/humidity.png";
import drizzle_icon from "../assets/drizzle.png";

const Weather = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  interface WeatherData {
    humidity: number;
    windSpeed: number;
    temperature: number;
    location: string;
    icon: string;
  }
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const allIcons: { [key: string]: string } = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };
  const search = async (city: string) => {
    if (city === ""){
        return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=698cd263ad6d5020268f2e6471047379&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon =
        allIcons[data.weather[0].icon as keyof typeof allIcons] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
       setWeatherData(null);
       console.error("Error in fetching weather data");
    }
  };

  return (
    <div className="weather">
        <h1>StarLight Weather ⭐</h1>
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Enter city name " />
        <img
          src={search_icon}
          alt="Search"
          onClick={() => search(inputRef.current?.value || "")}
        />
      </div>
      {weatherData && (
        <>
          <img
            src={weatherData.icon}
            className="weather-icon"
            alt="Weather Icon"
          />
          <p className="temperature">{weatherData.temperature} °C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="Humidity Icon" />
              <div>
                <p>{weatherData.humidity}</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="Wind Icon" />
              <div>
                <p>{weatherData.windSpeed}</p>
                <span>Wind speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
