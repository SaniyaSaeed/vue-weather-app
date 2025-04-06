import { Module } from "vuex";
import { fetchWeather } from "@/utils/api";
import { WeatherResponse } from "@/types/weather";

interface WeatherState {
  data: WeatherResponse | null;
  loading: boolean;
  error: string | null;
}

const weatherModule: Module<WeatherState, any> = {
  namespaced: true,
  state: () => ({
    data: null,
    loading: false,
    error: null,
  }),
  mutations: {
    setWeatherData(state, payload: WeatherResponse) {
      state.data = payload;
    },
    setLoading(state, payload: boolean) {
      state.loading = payload;
    },
    setError(state, payload: string) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
    async fetchWeather({ commit }, city: string) {
      commit("clearError");
      commit("setLoading", true);
      try {
        const data = await fetchWeather(city);
        commit("setWeatherData", data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          commit("setError", error.message);
        } else {
          commit("setError", "An unknown error occurred");
        }
      } finally {
        commit("setLoading", false);
      }
    },
  },
  getters: {
    weatherData: (state) => state.data,
    isLoading: (state) => state.loading,
    error: (state) => state.error,
  },
};

export default weatherModule;
