<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-app-bar-nav-icon
        v-if="userId"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>Progressive Weight Training</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer v-if="userId" v-model="drawer" app temporary>
      <v-container>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <h2>Where To?</h2>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list nav dense>
          <v-list-item-group
            :value="currentSelectedNavItemIndex"
            @change="selectNavItem"
            mandatory
            color="primary"
          >
            <v-list-item link v-for="(item, index) in navItems" :key="index">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="nav-item-title">
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-container>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <router-view class="body" />
      </v-container>
    </v-main>
    <v-snackbar bottom :value="updateExists" :timeout="-1">
      An update is available
      <template v-slot:action>
        <v-btn text color="primary" @click="refreshApp">
          Update
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import routes from "./router/routes";
import { mapGetters } from "vuex";
import update from "./mixins/update";

export default {
  name: "App",
  data: function() {
    return {
      drawer: false,
    };
  },
  mixins: [update],
  watch: {},
  computed: {
    ...mapGetters(["userId", "routine", "session", "exercise"]),
    navItems() {
      const items = [
        {
          text: "Routines",
          routeName: routes.routines.name,
          icon: "mdi-format-list-bulleted-type",
        },
        {
          text: "Settings",
          routeName: routes.userSettings.name,
          icon: "mdi-cog",
        },
        { text: "Logout", routeName: routes.logout.name, icon: "mdi-logout" },
      ];

      if (this.routine) {
        items.unshift({
          text: this.routine.name,
          routeName: routes.sessions.name,
          routeParams: { routineId: this.routine.id },
          icon: "mdi-calendar",
        });
      }

      if (this.session) {
        items.unshift({
          text: this.session.name,
          routeName: routes.exercises.name,
          routeParams: {
            routineId: this.routine.id,
            sessionId: this.session.id,
          },
          icon: "mdi-dumbbell",
        });
      }

      if (this.exercise) {
        items.unshift({
          text: this.exercise.name,
          routeName: routes.exercise.name,
          routeParams: {
            routineId: this.routine.id,
            sessionId: this.session.id,
            exerciseId: this.exercise.id,
          },
          icon: "mdi-numeric",
        });
      }

      return items;
    },
    currentSelectedNavItemIndex() {
      const index = this.navItems
        .map(item => item.routeName)
        .indexOf(this.$route.name);
      return index === -1 ? undefined : index;
    },
  },
  methods: {
    selectNavItem: function(selectedIndex) {
      const toRouteName = this.navItems[selectedIndex].routeName;
      const toRouteParams = this.navItems[selectedIndex].routeParams;

      const wasDrawerOpen = this.drawer;
      this.drawer = false;
      if (wasDrawerOpen && this.$route.name !== toRouteName) {
        this.$router.push({ name: toRouteName, params: toRouteParams });
      }
    },
  },
};
</script>

<style scoped>
.nav-item-title {
  text-transform: capitalize;
}
</style>
