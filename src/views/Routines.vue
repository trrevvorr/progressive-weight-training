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
        <SubmitButton
          :onClick="tryCreateRoutine"
          :onSuccess="() => (newRoutineName = null)"
          :disabled="!newRoutineName"
          errorMessage="Failed to create routine. Try again later."
        >
          Create Routine
        </SubmitButton>
      </v-card-actions>
    </v-card>

    <v-card
      v-for="routine in sortedRoutines"
      :key="routine.id"
      class="section-mini"
    >
      <v-card-title>{{ routine.name }}</v-card-title>
      <v-card-actions>
        <SubmitButton
          :onClick="() => tryDeleteRoutine(routine)"
          buttonColor="error"
          errorMessage="Failed to delete routine. Try again later."
        >
          Delete
        </SubmitButton>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SubmitButton from "../components/SubmitButton";

export default {
  components: {
    SubmitButton,
  },
  data: function() {
    return {
      newRoutineName: null,
    };
  },
  created() {},
  computed: {
    ...mapGetters(["userId", "routines"]),
    sortedRoutines() {
      return [...this.routines].sort((a, b) => {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    },
  },
  methods: {
    ...mapActions(["createRoutine", "deleteRoutine"]),
    tryCreateRoutine() {
      return this.createRoutine({
        name: this.newRoutineName,
        userId: this.userId,
      });
    },
    tryDeleteRoutine(routine) {
      return this.deleteRoutine(routine);
    },
  },
};
</script>

<style scoped>
.section {
  margin-top: 2rem;
}
.section-mini {
  margin-top: 1rem;
}
</style>
