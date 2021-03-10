<template>
  <div class="content">
    <PageHeader>Logout</PageHeader>

    <v-card class="section">
      <v-card-title>Are You Sure?</v-card-title>
      <v-card-text>
        <v-alert class="id-warning" dense outlined text type="warning">
          Don't forget your user ID: <code>{{ userId }}</code
          >. Without it you cannot log back in!
        </v-alert>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="copyId" text color="primary">{{ copyButtonText }}</v-btn>
        <v-btn @click="logOut" text>Logout</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import routes from "../router/routes";
import PageHeader from "../components/PageHeader";

const COPY_BUTTON_TEXT = "Copy ID";

export default {
  components: {
    PageHeader,
  },
  data: function() {
    return {
      copyButtonText: COPY_BUTTON_TEXT,
    };
  },
  computed: {
    ...mapGetters(["userId"]),
  },
  methods: {
    ...mapActions(["logout"]),
    logOut() {
      this.logout().then(this.$router.push({ name: routes.welcome.name }));
    },
    copyId() {
      navigator.clipboard
        .writeText(this.userId)
        .then(this.copySuccess, this.copyError);
    },
    copySuccess() {
      this.copyButtonText = "Copied!";
      setTimeout(this.copyReset, 3000);
    },
    copyError(e) {
      console.error(e);
      this.copyButtonText = "Copy Failed!";
      setTimeout(this.copyReset, 3000);
    },
    copyReset() {
      this.copyButtonText = COPY_BUTTON_TEXT;
    },
  },
};
</script>

<style scoped>
.section {
  margin-top: 1rem;
}
</style>
