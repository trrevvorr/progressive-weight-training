import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import routes from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    routes.welcome,
    routes.logout,
    {
      ...routes.user,
      children: [
        routes.userSettings,
        {
          ...routes.userSettings,
          path: "",
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.name === routes.welcome.name) {
    // if user logged in already, redirect to user page
    if (store.getters.userId) {
      next({ name: routes.userSettings.name });
    } else {
      next();
    }
  } else if (to.name === routes.logout.name) {
    // log out and redirect to welcome page
    await store.dispatch("logout");
    next({ name: routes.welcome.name });
  } else {
    // if user not logged in already, redirect to welcome page
    if (!store.getters.userId) {
      next({ name: routes.welcome.name });
    } else {
      next();
    }
  }
});

export default router;
