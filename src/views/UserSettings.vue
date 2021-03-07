<template>
  <div class="content">
    <v-row>
      <v-col>
        <h1>User Details</h1>
      </v-col>
      <v-col align-self="center" cols="auto">
        <v-btn @click="logOut">Log Out</v-btn>
      </v-col>
    </v-row>

    <v-card class="section">
      <v-card-title>ID</v-card-title>
      <v-card-text>
        <code>{{ userId }}</code>
        <v-alert class="id-warning" dense outlined text type="warning">
          Remember this ID! Without it, you cannot log in!
        </v-alert>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="copyId" text color="primary">{{ copyButtonText }}</v-btn>
      </v-card-actions>
    </v-card>

    <v-card class="section">
      <v-card-title>Name</v-card-title>
      <v-card-text>
        <v-form v-if="userName" v-model="nameFormValid">
          <NameField v-model="name" />
        </v-form>
        <v-skeleton-loader v-else max-width="300" type="text" />
      </v-card-text>
      <v-card-actions>
        <SubmitButton
          :onClick="tryUpdateName"
          :disabled="!userName || !nameFormValid"
          errorMessage="Failed to change name. Try again later."
        >
          Update Name
        </SubmitButton>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import NameField from "../components/NameField";
import SubmitButton from "../components/SubmitButton";
import { mapActions, mapGetters } from "vuex";
import routes from "../router/routes";

const COPY_BUTTON_TEXT = "Copy ID";

export default {
  components: {
    NameField,
    SubmitButton,
  },
  props: {},
  data: function() {
    return {
      name: null,
      nameFormValid: true,
      copyButtonText: COPY_BUTTON_TEXT,
    };
  },
  created() {
    this.name = this.userName;
  },
  computed: {
    ...mapGetters(["userId", "userName"]),
  },
  watch: {
    userName: function(newUserName) {
      this.name = newUserName;
    },
  },
  methods: {
    ...mapActions(["loadUser", "updateUserName"]),
    logOut() {
      this.$router.push({ name: routes.logout.name });
    },
    tryUpdateName() {
      return this.updateUserName(this.name);
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
  margin-top: 2rem;
}

.id-warning {
  margin-top: 1rem;
}
</style>
