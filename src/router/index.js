import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "LoginPage",
    component: () =>
      import(
        /* webpackChunkName: "loginPage" */ "../views/login-page/login-page"
      ),
  },
  {
    path: "/register",
    name: "registerPage",
    component: () =>
      import(
        /* webpackChunkName: "registerPage" */ "../views/register-page/register-page"
      ),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
