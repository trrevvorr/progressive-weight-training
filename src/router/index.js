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
          ...routes.routine,
          children: [
            routes.sessions,
            {
              ...routes.sessions,
              name: null,
              path: "",
            },
            {
              ...routes.sessions,
              name: null,
              path: "*",
            },
          ],
        },
        {
          ...routes.routines,
          name: null,
          path: "*",
        },
        {
          ...routes.routines,
          name: null,
          path: "",
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.name === routes.welcome.name) {
    if (store.getters.userId) {
      next(from); // reject routing to welcome page while logged in
    } else {
      next();
    }
  } else {
    // if user not logged in already, redirect to welcome page
    if (!store.getters.userId) {
      next({ name: routes.welcome.name }); // reject routing anywhere but welcome page when not logged in
    } else {
      next();
    }
  }
});

export default router;
