<template>
  <div class="home">
    <div class="app-header">
      <h1>Weather Forecast</h1>
      <p class="subtitle">Get real-time weather information for any location</p>
    </div>
    <WeatherSearch />
    <LoadingSpinner v-if="isLoading" />
    <WeatherDisplay v-else-if="weatherData" />
    <div v-else class="no-data">
      <i class="fas fa-search-location no-data-icon"></i>
      <p>Search for a city to see weather information</p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import WeatherSearch from "@/components/WeatherSearch.vue";
import WeatherDisplay from "@/components/WeatherDisplay.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    WeatherSearch,
    WeatherDisplay,
    LoadingSpinner,
  },
  setup() {
    const store = useStore();

    const weatherData = computed(() => store.getters["weather/weatherData"]);
    const isLoading = computed(() => store.getters["weather/isLoading"]);

    return {
      weatherData,
      isLoading,
    };
  },
});
</script>

<style scoped lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css");

.home {
  max-width: 600px;
  margin: 0 auto;
  box-sizing: border-box;

  .app-header {
    text-align: center;
    margin-bottom: 40px;

    h1 {
      color: #2c3e50;
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 8px;
      background: linear-gradient(to right, #6e8efb, #a777e3);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .subtitle {
      color: #7f8c8d;
      font-size: 1.1rem;
      margin: 0;
    }
  }

  .no-data {
    margin-top: 40px;
    padding: 40px 20px;
    background-color: #f8f9fa;
    border-radius: 16px;
    color: #7f8c8d;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

    .no-data-icon {
      font-size: 48px;
      margin-bottom: 20px;
      color: #a777e3;
      opacity: 0.6;
    }

    p {
      font-size: 18px;
      margin: 0;
    }
  }
}

@media (max-width: 600px) {
  .home {
    padding: 20px 15px;

    .app-header {
      h1 {
        font-size: 2rem;
      }

      .subtitle {
        font-size: 1rem;
      }
    }
  }
}
</style>
