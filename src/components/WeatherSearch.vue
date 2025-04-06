<template>
  <div class="weather-search">
    <form @submit.prevent="handleSubmit">
      <input
        type="text"
        v-model="city"
        placeholder="Enter city name (e.g., London, Karachi)"
        @input="clearError"
      />
      <button type="submit" :disabled="!city.trim() || loading">
        Get Weather
      </button>
    </form>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "WeatherSearch",
  setup() {
    const store = useStore();
    const city = ref("");
    const loading = ref(false);
    const error = ref("");

    const clearError = () => {
      error.value = "";
    };

    const handleSubmit = async () => {
      if (!city.value.trim()) return;

      try {
        loading.value = true;
        await store.dispatch("weather/fetchWeather", city.value.trim());
        error.value = store.getters["weather/error"];
      } finally {
        loading.value = false;
      }
    };

    return {
      city,
      loading,
      error,
      handleSubmit,
      clearError,
    };
  },
});
</script>

<style scoped lang="scss">
.weather-search {
  margin-bottom: 20px;

  form {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;

    input {
      flex: 1;
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    button {
      padding: 10px 20px;
      background-color: #42b983;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s;

      &:hover {
        background-color: #369f6e;
      }

      &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
      }
    }
  }

  .error-message {
    color: #e74c3c;
    margin: 0;
    padding: 5px 0;
  }
}
</style>
