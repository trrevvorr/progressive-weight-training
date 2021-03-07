<template>
  <div class="content">
    <h1>User</h1>
    <div class="section">
      <div>
        <b class="label">ID:</b><code>{{ id }}</code>
      </div>
      <div><i>Remember this ID! If you forget it, you will be unable to log back in!</i></div>
    </div>
    <div class="section">
      <div v-if="name">
        <div class="sinlge-input-form">
          <label for="user-name">Name: </label>
          <input id="user-name" v-model="name" type="text" />
          <button @click="updateName">Save Name</button>
        </div>
      </div>
      <div v-else>Loading Name...</div>
    </div>
    <router-link :to="{ name: 'Welcome' }">Log Out</router-link>
  </div>
</template>

<script>
import { DataStore } from "@aws-amplify/datastore";
import { User } from "../models";

export default {
  props: {
    id: String,
  },
  data: function() {
    return {
      name: null,
      user: null,
    };
  },
  created: function() {
    this.getUser();
  },
  methods: {
    getUser() {
      if (this.id) {
        DataStore.query(User, this.id)
          .then((model) => {
            console.log(model);
            this.name = model.name;
            this.user = model;
          })
          .catch((error) => console.error(error));
      }
    },
    updateName() {
      if (this.name) {
        DataStore.save(
          User.copyOf(this.user, (newUser) => {
            newUser.name = this.name;
          })
        )
          .then((model) => {
            console.log(model);
          })
          .catch((error) => console.error(error));
      }
    },
  },
};
</script>

<style scoped>
.label {
  margin-right: 0.5rem;
}

.section {
  text-align: left;
  margin: 1rem;
  margin-bottom: 3rem;
}

.sinlge-input-form {
  display: inline-grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1rem;
}

.sinlge-input-form label {
  text-align: right;
}
</style>
