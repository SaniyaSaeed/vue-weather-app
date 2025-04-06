<template>
  <div class="home">
    <h1>Weather App</h1>
    <WeatherSearch />
    <LoadingSpinner v-if="isLoading" />
    <WeatherDisplay v-else-if="weatherData" />
    <div v-else class="no-data">
      <p>Enter a city name to get weather information</p>
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
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;

  h1 {
    color: #2c3e50;
    margin-bottom: 30px;
  }

  .no-data {
    margin-top: 20px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    color: #7f8c8d;
  }
}
</style>
