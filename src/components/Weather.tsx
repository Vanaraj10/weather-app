import { useRef } from "react";
import { useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  interface WeatherData {
    humidity: number;
    windSpeed: number;
    temperature: number;
    location: string;
    icon: string;
    description:string;
  }
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const search = async (city: string) => {
    if (city === ""){
        return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=698cd263ad6d5020268f2e6471047379&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon =data.weather[0].icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
        description:data.weather[0].description
      });
    } catch (error) {
       setWeatherData(null);
       alert("City not found, please try again.");
       console.error("Error in fetching weather data");
    }
  };

  return (
    <div className="weather">
        <h1>"StarLight Weather ⭐</h1>
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
          <p className="description">{weatherData.description}</p>
          <p className="temperature">{weatherData.temperature} °C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="Humidity Icon" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="Wind Icon" />
              <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind speed</span>
              </div>
            </div>
          </div>
          <p className="me">Made by VJ_2303</p>
        </>
      )}
    </div>
  );
};

export default Weather;
