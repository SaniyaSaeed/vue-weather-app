<template>
  <div class="weather-display" v-if="weatherData">
    <div class="weather-header">
      <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
      <p class="weather-description">
        {{ weatherDescription }}
      </p>
    </div>

    <div class="weather-main">
      <div class="temperature">
        <img
          :src="weatherIconUrl"
          :alt="weatherDescription"
          class="weather-icon"
        />
        <span class="temp-value">{{ Math.round(weatherData.main.temp) }}</span>
        <span class="temp-unit">°C</span>
      </div>

      <div class="weather-details">
        <div class="detail-item">
          <span class="detail-label">Feels Like:</span>
          <span class="detail-value"
            >{{ Math.round(weatherData.main.feels_like) }}°C</span
          >
        </div>
        <div class="detail-item">
          <span class="detail-label">Humidity:</span>
          <span class="detail-value">{{ weatherData.main.humidity }}%</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Wind:</span>
          <span class="detail-value">{{ weatherData.wind.speed }} m/s</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Pressure:</span>
          <span class="detail-value">{{ weatherData.main.pressure }} hPa</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { WeatherResponse } from "@/types/weather";

export default defineComponent({
  name: "WeatherDisplay",
  setup() {
    const store = useStore();

    const weatherData = computed<WeatherResponse | null>(
      () => store.getters["weather/weatherData"]
    );

    const weatherDescription = computed(() => {
      if (!weatherData.value) return "";
      return (
        weatherData.value.weather[0].description.charAt(0).toUpperCase() +
        weatherData.value.weather[0].description.slice(1)
      );
    });

    const weatherIconUrl = computed(() => {
      if (!weatherData.value) return "";
      return `https://openweathermap.org/img/wn/${weatherData.value.weather[0].icon}@2x.png`;
    });

    return {
      weatherData,
      weatherDescription,
      weatherIconUrl,
    };
  },
});
</script>

<style scoped lang="scss">
.weather-display {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;

  .weather-header {
    text-align: center;
    margin-bottom: 20px;

    h2 {
      margin: 0;
      color: #2c3e50;
    }

    .weather-description {
      margin: 5px 0 0;
      color: #7f8c8d;
      font-size: 18px;
    }
  }

  .weather-main {
    display: flex;
    flex-direction: column;
    align-items: center;

    .temperature {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      .weather-icon {
        width: 80px;
        height: 80px;
      }

      .temp-value {
        font-size: 48px;
        font-weight: bold;
        margin: 0 5px;
        color: #2c3e50;
      }

      .temp-unit {
        font-size: 24px;
        color: #7f8c8d;
      }
    }

    .weather-details {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;

      .detail-item {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        background-color: #f8f9fa;
        border-radius: 4px;

        .detail-label {
          color: #7f8c8d;
        }

        .detail-value {
          font-weight: bold;
          color: #2c3e50;
        }
      }
    }
  }
}

@media (max-width: 600px) {
  .weather-details {
    grid-template-columns: 1fr !important;
  }
}
</style>
