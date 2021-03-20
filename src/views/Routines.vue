<template>
  <div class="content">
    <PageHeader>Routines</PageHeader>

    <div v-if="sortedRoutines.length">
      <v-card
        v-for="routine in sortedRoutines"
        :key="routine.id"
        class="section"
        @click="selectRoutine(routine.id)"
      >
        <v-card-title class="card-title">{{ routine.name }}</v-card-title>
        <v-card-actions>
          <div @click.stop>
            <SubmitButton
              :onClick="() => tryDeleteRoutine(routine.id)"
              buttonColor="error"
              errorMessage="Failed to delete routine. Try again later."
            >
              Delete
            </SubmitButton>
          </div>
          <v-btn
            text
            color="primary"
            @click.stop="editRoutine = JSON.parse(JSON.stringify(routine))"
          >
            Edit
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <v-row v-else class="no-routines-message" justify="center">
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

    <EditDialog
      dialogTitle="Edit Routine"
      v-model="editRoutine"
      @submit="tryEditRoutine"
      submitButtonLabel="Save"
    >
    </EditDialog>
    <EditDialog
      dialogTitle="New Routine"
      v-model="newRoutine"
      @submit="tryCreateRoutine"
      submitButtonLabel="Create"
    >
    </EditDialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import SubmitButton from "../components/SubmitButton";
import PageHeader from "../components/PageHeader";
import EditDialog from "../components/EditDialog";
import routes from "../router/routes";

export default {
  components: {
    SubmitButton,
    PageHeader,
    EditDialog,
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
    ...mapMutations(["setRoutineId"]),
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
      return this.deleteRoutine(id);
    },
    selectRoutine(id) {
      this.$router.push({
        name: routes.sessions.name,
        params: { routineId: id },
      });
    },
  },
};
</script>

<style scoped>
.section {
  margin-top: 1rem;
}

.card-title {
  word-break: break-word;
  text-transform: capitalize;
}

.no-routines-message {
  position: absolute;
  top: 50%;
  width: 100%;
}
</style>
