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
        <v-form v-if="name !== null" v-model="nameFormValid">
          <NameField v-model="newUserName" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="createUser" :disabled="!nameFormValid" text color="primary">
          Create Account
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { DataStore } from "@aws-amplify/datastore";
import { User } from "../models";
import NameField from "../components/NameField";

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
  methods: {
    createUser() {
      if (this.newUserName) {
        DataStore.save(
          new User({
            name: this.newUserName,
            Routines: [],
            Sessions: [],
            Exercises: [],
          })
        )
          .then(this.loginAsUser)
          .catch(this.logError);
      }
    },
    loginAsUser(model) {
      console.info(model);
      const id = model.id;

      if (id) {
        this.$router.push({ path: `user/${id}` });
      } else {
        this.logError("could not find ID from model");
      }
    },
    logError(error) {
      console.error(error);
    },
    queryUser() {
      DataStore.query(User, this.queryUserId)
        .then(this.loginAsUser)
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
