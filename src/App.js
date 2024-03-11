import React, {useState } from "react";
import './App.css';
import CityWeather from "./modules/cityWeather";
import WeatherComponent from "./modules/weatherComponent";
import Axios from "axios";
import styled from "styled-components";

export const WeatherIcons = {
  "01d": "/images/day.svg",
  "01n": "/images/day.svg",
  "02d": "/images/day.svg",
  "02n": "/images/day.svg",
  "03d": "/images/day.svg",
  "03n": "/images/day.svg",
  "04d": "/images/day.svg",
  "04n": "/images/day.svg",
  "09d": "/images/day.svg",
  "09n": "/images/day.svg",
  "10d": "/images/day.svg",
  "10n": "/images/day.svg",
  "11d": "/images/day.svg",
  "11n": "/images/day.svg",
};


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 380px;
  padding: 20px 10px;
  margin: auto;
  border-radius: 4px;
  box-shadow: 0 3px 6px 0 #555;
  background: white;
  font-family: Montserrat;
`;

const AppLabel = styled.span`
  color: black;
  margin: 70px auto;
  font-size: 18px;
  font-weight: bold;
`;


function App() {
     const [city, updateCity] = useState();
    const [weather, updateWeather] = useState();
    const [notFoundError,setNotFoundError]= useState(false)
    const fetchWeather = async (e) => {
      e.preventDefault();
      const response = await Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=425b9e22793a49b562bff289a3a3298f`,
      );
      if(response.status === 404)
      {
        setNotFoundError(true)
      }
      updateWeather(response.data);
    };
    return (
      <Container>
        <AppLabel>Weather Dashboard</AppLabel>
        {city && weather ? (
          <WeatherComponent weather={weather} city={city} />
        ) : (
          <CityWeather updateCity={updateCity} fetchWeather={fetchWeather} />
        )}
      </Container>
    );
  
}

export default App;
