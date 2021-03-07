<template>
  <div class="user">
    <router-view v-if="this.userName"></router-view>
    <div v-else>
      <v-skeleton-loader class="section" type="heading"></v-skeleton-loader>
      <v-skeleton-loader class="section" type="article, actions"></v-skeleton-loader>
      <v-skeleton-loader class="section" type="article, actions"></v-skeleton-loader>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  created() {
    if (this.userId && !this.userName) {
      this.loadUser(this.userId);
    }
  },
  computed: {
    ...mapGetters(["userId", "userName"]),
  },
  methods: {
    ...mapActions(["loadUser", "updateUserName"]),
  },
};
</script>

<style scoped>
.section {
  margin-top: 2rem;
}
</style>
