import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWeather } from "./weatherAPI";

export interface IWeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  rain: {
    "1h": number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface IWeather {
  data?: IWeatherData;
  status: "succeeded" | "loading" | "failed";
  error?: string;
}

export interface CounterState1 {
  value: number;
  status: "idle" | "loading" | "failed";
}

const initialState: IWeather = {
  status: "succeeded"
};

export const  getWeather = createAsyncThunk('weather/fetchWeather', async (data: {lat: number, lon: number}) => {
   return fetchWeather(data.lat, data.lon)
   .then((res) => {
        res.main.temp = Math.round(res.main.temp - 273.15);
        res.main.temp_min = Math.round(res.main.temp_min - 273.15);
        res.main.temp_max = Math.round(res.main.temp_max - 273.15);
       return res
  })
   .catch((error) => {
    console.log(error)
    return error;
   })
});

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeather.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
