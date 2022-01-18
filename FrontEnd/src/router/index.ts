import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import NotFound from "../views/NotFound.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/chat",
    name: "Chat",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Chat.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

//TODO: Protect ROUTES

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
