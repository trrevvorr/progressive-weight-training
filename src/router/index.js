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
        routes.routines,
        {
          ...routes.routines,
          path: "",
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.name === routes.welcome.name) {
    if (store.getters.userId) {
      next(from);
    } else {
      next();
    }
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
