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
                <v-list-item-title>
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
  </v-app>
</template>

<script>
import routes from "./router/routes";
import { mapGetters } from "vuex";

export default {
  name: "App",
  data: function() {
    return {
      drawer: false,
    };
  },
  watch: {},
  computed: {
    ...mapGetters(["userId", "routine"]),
    navItems() {
      const items = [
        {
          text: "Routines",
          routeName: routes.routines.name,
          icon: "mdi-calendar",
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
          icon: "mdi-format-list-bulleted-type",
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

      const wasDrawerOpen = this.drawer;
      this.drawer = false;
      if (wasDrawerOpen && this.$route.name !== toRouteName) {
        this.$router.push({ name: toRouteName });
      }
    },
  },
};
</script>
