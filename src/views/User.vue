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
        <code>{{ id }}</code>
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
        <v-form v-if="name !== null" v-model="nameFormValid">
          <NameField v-model="name" />
        </v-form>
        <v-skeleton-loader v-else max-width="300" type="text" />
      </v-card-text>
      <v-card-actions>
        <v-btn @click="updateName" :disabled="!name || !nameFormValid" text color="primary"
          >Update Name</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { DataStore } from "@aws-amplify/datastore";
import { User } from "../models";
import NameField from "../components/NameField";

const COPY_BUTTON_TEXT = "Copy ID";

export default {
  components: {
    NameField,
  },
  props: {
    id: String,
  },
  data: function() {
    return {
      name: null,
      user: null,
      nameFormValid: true,
      copyButtonText: COPY_BUTTON_TEXT,
    };
  },
  created: function() {
    this.getUser();
  },
  methods: {
    logOut() {
      this.$router.push({ name: "Welcome" });
    },
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
    copyId() {
      navigator.clipboard.writeText(this.id).then(this.copySuccess, this.copyError);
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
