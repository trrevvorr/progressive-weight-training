import Vue from "vue";
import VueRouter from "vue-router";
import Welcome from "../views/Welcome.vue";
import User from "../views/User.vue";
import store from "../store";

const WELCOME_ROUTE_NAME = "Welcome";
const LOG_OUT_ROUTE_NAME = "Logout";
const USER_ROUTE_NAME = "User";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: WELCOME_ROUTE_NAME,
    component: Welcome,
  },
  {
    path: "/logout",
    name: LOG_OUT_ROUTE_NAME,
  },
  {
    path: "/user",
    name: USER_ROUTE_NAME,
    component: User,
    props: true,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.name === WELCOME_ROUTE_NAME) {
    // if user logged in already, redirect to user page
    if (store.getters.userId) {
      next({ name: USER_ROUTE_NAME });
    } else {
      next();
    }
  } else if (to.name === LOG_OUT_ROUTE_NAME) {
    // log out and redirect to welcome page
    await store.dispatch("logout");
    next({ name: WELCOME_ROUTE_NAME });
  } else {
    // if user not logged in already, redirect to welcome page
    if (!store.getters.userId) {
      next({ name: WELCOME_ROUTE_NAME });
    } else {
      next();
    }
  }
});

export default router;
