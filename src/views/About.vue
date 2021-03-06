<template>
  <div class="about">
    <h1>Users</h1>
    <div class="new-user-form">
      <h2>Create New User</h2>
      <label for="new-user-name">Name</label>
      <input v-model="newUserName" id="new-user-name" type="text" />
      <button @click="createUser" type="button">Create New User</button>
    </div>
    <div class="query-user-form">
      <h2>Query User</h2>
      <label for="query-user-id">Id</label>
      <input v-model="queryUserId" id="query-user-id" type="text" />
      <button @click="queryUser" type="button">Query User</button>
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
    async createUser() {
      if (this.newUserName) {
        await DataStore.save(
          new User({
            name: this.newUserName,
            Routines: [],
            Sessions: [],
            Exercises: [],
          })
        );
      }
    },
    async queryUser() {
      const models = await DataStore.query(User, this.queryUserId);
      console.log(models);
    },
  },
};
</script>
