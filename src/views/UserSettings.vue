<template>
  <div class="content">
    <h1>User Details</h1>

    <v-card class="section">
      <v-card-title>User Details</v-card-title>
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
          errorMessage="Invalid name"
          fatalMessage="Failed to change name. Try again later."
        >
          Save Changes
        </SubmitButton>
        <SubmitButton
          :onClick="tryDeleteUser"
          :onSuccess="logOut"
          :buttonColor="'error'"
          errorMessage="Failed to delete user. Try again later."
          fatalMessage="Failed to delete user. Try again later."
        >
          Delete User
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
    ...mapActions(["loadUser", "updateUserName", "deleteUser", "logout"]),
    async logOut() {
      await this.logout().then(() =>
        this.$router.push({ name: routes.welcome.name }),
      );
    },
    async tryUpdateName() {
      await this.updateUserName(this.name);
    },
    async tryDeleteUser() {
      await this.deleteUser();
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
