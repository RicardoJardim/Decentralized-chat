import { createApp } from "vue";
import store from "./store";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import GUN from "gun";
import "gun/sea";
import "gun/axe";

// Database
export const db = GUN([
  "https://gun-manhattan.herokuapp.com/gun",
  "http://localhost:8765/gun",
]);

// Gun User
export const user = db.user().recall({ sessionStorage: true });

createApp(App).use(store).use(router).mount("#app");
