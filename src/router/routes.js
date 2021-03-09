import Welcome from "../views/Welcome.vue";
import User from "../views/User.vue";
import UserSettings from "../views/UserSettings.vue";
import Routine from "../views/Routines";
import Logout from "../views/Logout";

export default {
  welcome: {
    path: "/",
    name: "Welcome",
    component: Welcome,
  },
  logout: {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
  user: {
    path: "/user",
    name: "User",
    component: User,
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
