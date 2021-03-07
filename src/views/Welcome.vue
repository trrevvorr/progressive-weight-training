<template>
  <div class="content">
    <h1>Welcome</h1>
    <div class="query-user-form">
      <h2>Login</h2>
      <p>If you already have an account, enter your user ID below to login.</p>
      <div class="sinlge-input-form">
        <label for="login-user-id">User Id</label>
        <input id="login-user-id" v-model="queryUserId" type="text" />
        <button @click="queryUser">Login</button>
      </div>
    </div>
    <div class="new-user-form">
      <h2>New Account</h2>
      <p>If you don't have an account yet, enter your name to create one.</p>
      <div class="sinlge-input-form">
        <label for="new-user-name">Name</label>
        <input id="new-user-name" v-model="newUserName" type="text" />
        <button @click="createUser">Create Account</button>
      </div>
    </div>
  </div>
</template>

<script>
import { DataStore } from "@aws-amplify/datastore";
import { User } from "../models";

export default {
  data: function() {
    return {
      newUserName: "",
      queryUserId: "",
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
.query-user-form,
.new-user-form {
  margin-top: 5rem;
}
.sinlge-input-form {
  display: inline-grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1rem;
}

.sinlge-input-form label {
  text-align: right;
}
</style>
