<template>
  <div class="user">
    <router-view v-if="this.userName"></router-view>
    <SkeletonList v-else />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import routes from "../router/routes";
import SkeletonList from "../components/SkeletonList";

export default {
  components: {
    SkeletonList,
  },
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

<style scoped></style>
