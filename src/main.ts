import { createApp } from "vue";
import store from "./store";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import GUN from "gun";
import "gun/sea";
import "gun/axe";

// Database
export const db = GUN();

// Gun User
export const user = db.user().recall({ sessionStorage: true });

/* user.get("alias").on((v) => {
    UserName = v;
}); */

createApp(App).use(store).use(router).mount("#app");
