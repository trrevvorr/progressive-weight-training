<template>
  <div class="content">
    <PageHeader>Routines</PageHeader>

    <v-card v-for="routine in sortedRoutines" :key="routine.id" class="section">
      <v-card-title>{{ routine.name }}</v-card-title>
      <v-card-actions>
        <SubmitButton
          :onClick="() => tryDeleteRoutine(routine.id)"
          buttonColor="error"
          errorMessage="Failed to delete routine. Try again later."
        >
          Delete
        </SubmitButton>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="dialogOpen">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          key="mdi-plus"
          color="green"
          fab
          large
          dark
          bottom
          right
          fixed
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>

      <v-card>
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
            :onSuccess="
              () => {
                newRoutineName = null;
                dialogOpen = false;
              }
            "
            :disabled="!newRoutineName"
            errorMessage="Failed to create routine. Try again later."
          >
            Create Routine
          </SubmitButton>
          <v-btn text @click="dialogOpen = false">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SubmitButton from "../components/SubmitButton";
import PageHeader from "../components/PageHeader";

export default {
  components: {
    SubmitButton,
    PageHeader,
  },
  data: function() {
    return {
      newRoutineName: null,
      dialogOpen: false,
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
        reloadUser: true,
      });
    },
    tryDeleteRoutine(id) {
      return this.deleteRoutine({ id, reloadUser: true });
    },
  },
};
</script>

<style scoped>
.section {
  margin-top: 1rem;
}
</style>
