<template>
  <div class="content">
    <h1>Welcome</h1>
    <v-card class="section">
      <v-card-title>Login</v-card-title>
      <v-card-subtitle
        >If you already have an account, enter your user ID below to login.</v-card-subtitle
      >
      <v-card-text>
        <v-text-field dense maxlength="50" label="User Id" v-model="queryUserId"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="queryUser" text color="primary">Login</v-btn>
      </v-card-actions>
    </v-card>

    <v-card class="section">
      <v-card-title>New Account</v-card-title>
      <v-card-subtitle
        >If you don't have an account yet, enter your name to create one.</v-card-subtitle
      >
      <v-card-text>
        <v-form v-model="nameFormValid">
          <NameField v-model="newUserName" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="tryCreateUser" :disabled="!nameFormValid" text color="primary">
          Create Account
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import NameField from "../components/NameField";
import routes from "../router/routes";
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  components: {
    NameField,
  },
  data: function() {
    return {
      newUserName: "",
      queryUserId: "",
      nameFormValid: false,
      rules: {
        nameIsPlainText: (value) => {
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
      if (this.newUserName) {
        this.createUser(this.newUserName)
          .then(() => this.loginAsUser(routes.userSettings.name))
          .catch(this.logError);
      }
    },
    setUserIdAndLogIn(id) {
      if (id) {
        this.setUserId(id);
        this.loginAsUser(routes.userSettings.name);
      } else {
        this.logError("no ID provided");
      }
    },
    loginAsUser(routeName) {
      if (this.userId) {
        this.$router.push({ name: routeName });
      } else {
        this.logError("userId not set");
      }
    },
    logError(error) {
      console.error(error);
    },
    queryUser() {
      this.loadUser(this.queryUserId)
        .then((model) => this.setUserIdAndLogIn(model.id))
        .catch(this.logError);
    },
  },
};
</script>

<style scoped>
.section {
  margin-top: 2rem;
}
</style>
