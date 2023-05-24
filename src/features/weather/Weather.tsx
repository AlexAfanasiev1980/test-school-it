import React, { useState, useEffect } from "react";
import style from "./Weather.module.css";
import { IWeatherData, getWeather } from "./weatherSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { IWeather } from "./weatherSlice";
import { AppDispatch } from "../../app/store";
import { fetchCity } from './weatherAPI';

function Weather() {
  const dispatch = useDispatch<AppDispatch>();
  const weatherData = useAppSelector(
    (state: { weather: IWeather }) => state.weather.data
  );
  const status = useAppSelector(
    (state: { weather: IWeather }) => state.weather.status
  );
  const error = useAppSelector(
    (state: { weather: IWeather }) => state.weather.error
  );
  const [weather, setWeather] = useState<IWeatherData | undefined>();
  const [city, setCity] = useState<string>('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCity(city)
    .then((res) => {
      dispatch(getWeather({lat: res[0].lat, lon: res[0].lon}))
    })
    .catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    setWeather(weatherData);
  }, [weatherData]);

  return (
    <div className={style.background}>
      <form action="" onSubmit={(e) => onSubmit(e)}>
        <input type="text" onChange={(e) => setCity(e.target.value)}/>
        <button type='submit' >Узнать погоду</button>
      </form>
      {status === "loading" && `${status}...`}
      {weather && <WeatherData weather={weather} />}
      {error && `${error}`}
    </div>
  );
}

function WeatherData({ weather }: { weather: IWeatherData }) {

  return (
    <>    
      <h1 className={style.city}>{weather.name}</h1>
      <p className={style.degrees}>{`${weather.main.temp}°`}</p>
      <p className={style.description}>{`${weather.weather[0].description}`}</p>
      <div>
        <span className={style.temp}>{`H: ${weather.main.temp_max}°`}</span>
        <span className={style.temp}>{`L: ${weather.main.temp_min}°`}</span>
      </div>
      <div className={style.iconContainer}>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt='icon'
          className={style.icon}
        />
      </div>
    </>
  );
}

export default Weather;
