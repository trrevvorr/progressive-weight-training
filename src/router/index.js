import Vue from "vue";
import VueRouter from "vue-router";
import Welcome from "../views/Welcome.vue";
import User from "../views/User.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome
  },
  {
    path: "/user/:id",
    name: "User",
    component: User,
    props: true
  }
];

const router = new VueRouter({
  routes
});

export default router;
