<template>
  <div class="content">
    <h1>Routines</h1>

    <v-card class="section">
      <v-card-title>New Routine</v-card-title>
      <v-card-text>
        <v-text-field
          dense
          maxlength="50"
          label="Routine Name"
          v-model="newRoutineName"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="tryCreateRoutine" :disabled="!newRoutineName" text color="primary">
          Create Routine
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
// import routes from "../router/routes";

export default {
  props: {},
  data: function() {
    return {
      newRoutineName: null,
    };
  },
  created() {},
  computed: {
    ...mapGetters(["userId"]),
  },
  methods: {
    ...mapActions(["createRoutine"]),
    tryCreateRoutine() {
      if (this.newRoutineName) {
        this.createRoutine({ name: this.newRoutineName, userId: this.userId })
          .then((model) => {
            this.newRoutineName = null;
            console.log(model);
          })
          .catch((error) => console.error(error));
      }
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
