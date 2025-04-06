import axios, { AxiosError, AxiosResponse } from "axios";
import { WeatherResponse, WeatherError } from "@/types/weather";

const API_KEY = process.env.VUE_APP_WEATHER_API_KEY;
const BASE_URL = process.env.VUE_APP_WEATHER_API_URL;

export const fetchWeather = async (city: string): Promise<WeatherResponse> => {
  try {
    const response: AxiosResponse<WeatherResponse> = await axios.get(
      `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<WeatherError>;
    if (axiosError.response) {
      throw new Error(
        axiosError.response.data.message || "Failed to fetch weather data"
      );
    } else {
      throw new Error("Network error occurred");
    }
  }
};
