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
          <i class="fas fa-temperature-high detail-icon"></i>
          <div>
            <span class="detail-label">Feels Like</span>
            <span class="detail-value"
              >{{ Math.round(weatherData.main.feels_like) }}°C</span
            >
          </div>
        </div>
        <div class="detail-item">
          <i class="fas fa-tint detail-icon"></i>
          <div>
            <span class="detail-label">Humidity</span>
            <span class="detail-value">{{ weatherData.main.humidity }}%</span>
          </div>
        </div>
        <div class="detail-item">
          <i class="fas fa-wind detail-icon"></i>
          <div>
            <span class="detail-label">Wind</span>
            <span class="detail-value">{{ weatherData.wind.speed }} m/s</span>
          </div>
        </div>
        <div class="detail-item">
          <i class="fas fa-tachometer-alt detail-icon"></i>
          <div>
            <span class="detail-label">Pressure</span>
            <span class="detail-value"
              >{{ weatherData.main.pressure }} hPa</span
            >
          </div>
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
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css");

.weather-display {
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 20px auto;
  color: white;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  .weather-header {
    text-align: center;
    margin-bottom: 25px;

    h2 {
      margin: 0;
      font-size: 28px;
      font-weight: 600;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .weather-description {
      margin: 8px 0 0;
      font-size: 18px;
      opacity: 0.9;
    }
  }

  .weather-main {
    display: flex;
    flex-direction: column;
    align-items: center;

    .temperature {
      display: flex;
      align-items: center;
      margin-bottom: 30px;

      .weather-icon {
        width: 100px;
        height: 100px;
        filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
      }

      .temp-value {
        font-size: 72px;
        font-weight: 300;
        margin: 0 5px;
      }

      .temp-unit {
        font-size: 32px;
        font-weight: 300;
        align-self: flex-start;
        margin-top: 10px;
      }
    }

    .weather-details {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;

      .detail-item {
        display: flex;
        align-items: center;
        padding: 15px;
        background-color: rgba(255, 255, 255, 0.15);
        border-radius: 12px;
        backdrop-filter: blur(5px);
        transition: transform 0.2s ease;

        &:hover {
          transform: translateY(-3px);
        }

        .detail-icon {
          font-size: 20px;
          margin-right: 12px;
          opacity: 0.8;
        }

        div {
          display: flex;
          flex-direction: column;
        }

        .detail-label {
          font-size: 14px;
          opacity: 0.8;
          margin-bottom: 4px;
        }

        .detail-value {
          font-weight: 600;
          font-size: 16px;
        }
      }
    }
  }
}

@media (max-width: 600px) {
  .weather-details {
    grid-template-columns: 1fr !important;
  }

  .weather-display {
    padding: 20px;

    .temperature {
      .temp-value {
        font-size: 60px !important;
      }

      .weather-icon {
        width: 80px !important;
        height: 80px !important;
      }
    }
  }
}
</style>
