import { createStore } from "vuex";
import weatherModule from "./modules/weather";

export default createStore({
  modules: {
    weather: weatherModule,
  },
});
