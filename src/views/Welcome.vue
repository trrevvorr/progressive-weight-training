<template>
  <div class="content">
    <h1>Welcome</h1>
    <v-card class="section">
      <v-card-title>Login</v-card-title>
      <v-card-subtitle
        >If you already have an account, enter your user ID below to
        login.</v-card-subtitle
      >
      <v-card-text>
        <v-text-field
          dense
          maxlength="50"
          label="User Id"
          v-model="userIdToSearch"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <SubmitButton
          :onClick="tryGetUser"
          :onSuccess="setUserIdAndLogIn"
          :disabled="!userIdToSearch"
          fatalMessage="Failed to log in. Try again later."
          errorMessage="User not found."
        >
          Login
        </SubmitButton>
      </v-card-actions>
    </v-card>

    <v-card class="section">
      <v-card-title>New Account</v-card-title>
      <v-card-subtitle
        >If you don't have an account yet, enter your name to create
        one.</v-card-subtitle
      >
      <v-card-text>
        <v-form v-model="nameFormValid">
          <NameField v-model="newUserName" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <SubmitButton
          :onClick="tryCreateUser"
          :onSuccess="loginAsUser"
          :disabled="!nameFormValid"
          errorMessage="Invalid name."
          fatalMessage="Failed to create account. Try again later."
        >
          Create Account
        </SubmitButton>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import NameField from "../components/NameField";
import SubmitButton from "../components/SubmitButton";
import routes from "../router/routes";
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  components: {
    NameField,
    SubmitButton,
  },
  data: function() {
    return {
      newUserName: "",
      newUserLoading: false,
      newUserError: false,
      userIdToSearch: "",
      nameFormValid: false,
      rules: {
        nameIsPlainText: value => {
          const pattern = /^[\w ]+$/;
          return pattern.test(value) || "name contains invalid characters";
        },
      },
    };
  },
  computed: {
    ...mapGetters(["userId"]),
  },
  methods: {
    ...mapMutations(["setUserId"]),
    ...mapActions(["createUser", "loadUser"]),
    tryCreateUser() {
      return this.createUser(this.newUserName);
    },
    setUserIdAndLogIn(user) {
      if (user.id) {
        this.setUserId(user.id);
        this.loginAsUser();
      } else {
        console.error("no ID provided");
      }
    },
    loginAsUser() {
      if (this.userId) {
        this.$router.push({ name: routes.routines.name });
      } else {
        console.error("userId not set");
      }
    },
    tryGetUser() {
      return this.loadUser(this.userIdToSearch);
    },
  },
};
</script>

<style scoped>
.section {
  margin-top: 2rem;
}
</style>
