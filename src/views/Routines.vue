<template>
  <div class="content">
    <PageHeader>Routines</PageHeader>

    <div v-if="sortedRoutines.length">
      <v-card
        v-for="routine in sortedRoutines"
        :key="routine.id"
        class="section"
      >
        <v-card-title>{{ routine.name }}</v-card-title>
        <v-card-actions>
          <v-btn
            text
            color="primary"
            @click="editRoutine = JSON.parse(JSON.stringify(routine))"
          >
            Edit
          </v-btn>
          <SubmitButton
            :onClick="() => tryDeleteRoutine(routine.id)"
            buttonColor="error"
            errorMessage="Failed to delete routine. Try again later."
          >
            Delete
          </SubmitButton>
        </v-card-actions>
      </v-card>
    </div>
    <v-row v-else class="no-routiens-message" justify="center">
      <p class="text--secondary">
        Click the "+" to create your first routine
      </p>
    </v-row>

    <v-btn
      key="mdi-plus"
      color="green"
      fab
      large
      dark
      bottom
      right
      fixed
      @click="() => (newRoutine = { name: null })"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <RoutineEditDialog
      dialogTitle="Edit Routine"
      v-model="editRoutine"
      @submit="tryEditRoutine"
      submitButtonLabel="Save"
    >
    </RoutineEditDialog>
    <RoutineEditDialog
      dialogTitle="New Routine"
      v-model="newRoutine"
      @submit="tryCreateRoutine"
      submitButtonLabel="Create"
    >
    </RoutineEditDialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SubmitButton from "../components/SubmitButton";
import PageHeader from "../components/PageHeader";
import RoutineEditDialog from "../components/RoutineEditDialog";

export default {
  components: {
    SubmitButton,
    PageHeader,
    RoutineEditDialog,
  },
  data: function() {
    return {
      newRoutine: null,
      editRoutine: null,
      editRoutineName: null,
      editRoutineDialogOpen: false,
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
  watch: {
    editRoutine: function(newEditRoutine) {
      this.editRoutineName = newEditRoutine && newEditRoutine.name;
      this.editRoutineDialogOpen = Boolean(newEditRoutine);
    },
    editRoutineDialogOpen: function(newEditRoutineDialogOpen) {
      if (!newEditRoutineDialogOpen) {
        this.editRoutine = null;
      }
    },
  },
  methods: {
    ...mapActions(["createRoutine", "deleteRoutine", "updateRoutineName"]),
    tryCreateRoutine() {
      return this.createRoutine({
        name: this.newRoutine.name,
      }).then((this.newRoutine = null));
    },
    tryEditRoutine() {
      return this.updateRoutineName(this.editRoutine).then(
        () => (this.editRoutine = null),
      );
    },
    tryDeleteRoutine(id) {
      return this.deleteRoutine({ id });
    },
  },
};
</script>

<style scoped>
.section {
  margin-top: 1rem;
}

.no-routiens-message {
  position: absolute;
  top: 50%;
  width: 100%;
}
</style>
