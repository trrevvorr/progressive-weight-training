import Welcome from "../views/Welcome.vue";
import User from "../views/User.vue";
import UserSettings from "../views/UserSettings.vue";
import Routine from "../views/Routines";

export default {
  welcome: {
    path: "/",
    name: "Welcome",
    component: Welcome,
  },
  logout: {
    path: "/logout",
    name: "Logout",
  },
  user: {
    path: "/user",
    name: "User",
    component: User,
    props: true,
  },
  userSettings: {
    path: "settings",
    name: "UserSettings",
    component: UserSettings,
  },
  routines: {
    path: "routines",
    name: "Routines",
    component: Routine,
  },
};
