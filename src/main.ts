import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

createApp(App).use(store).use(router).mount("#app");
console.log("API Key:", process.env.VUE_APP_WEATHER_API_KEY);
