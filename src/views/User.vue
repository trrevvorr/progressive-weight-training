<template>
  <div class="user">
    <router-view v-if="this.userName"></router-view>
    <div v-else>
      <v-skeleton-loader class="section" type="heading"></v-skeleton-loader>
      <v-skeleton-loader
        class="section"
        type="article, actions"
      ></v-skeleton-loader>
      <v-skeleton-loader
        class="section"
        type="article, actions"
      ></v-skeleton-loader>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import routes from "../router/routes";

export default {
  created() {
    if (this.userId && !this.userName) {
      this.loadUser(this.userId).catch(error => {
        console.error(
          `failed to load user for ID ${this.userId}, logging out`,
          error,
        );
        this.logout().then(this.$router.push({ name: routes.welcome.name }));
      });
    }
  },
  computed: {
    ...mapGetters(["userId", "userName"]),
  },
  methods: {
    ...mapActions(["loadUser", "logout"]),
  },
};
</script>

<style scoped>
.section {
  margin-top: 2rem;
}
</style>
