<template>
  <div class="content">
    <PageHeader>{{ this.session.name }}</PageHeader>

    <div v-if="sortedExercises.length">
      <v-card
        v-for="exercise in sortedExercises"
        :key="exercise.id"
        class="section"
        @click="selectExercise(exercise.id)"
      >
        <v-card-title class="card-title">{{ exercise.name }}</v-card-title>
        <v-card-actions>
          <div @click.stop>
            <SubmitButton
              :onClick="() => tryDeleteExercise(exercise.id)"
              buttonColor="error"
              errorMessage="Failed to delete exercise. Try again later."
            >
              Delete
            </SubmitButton>
          </div>
          <v-btn
            text
            color="primary"
            @click.stop="editExercise = JSON.parse(JSON.stringify(exercise))"
          >
            Edit
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <v-row v-else class="no-exercises-message" justify="center">
      <p class="text--secondary">
        Click the "+" to create your first exercise
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
      @click="() => (newExercise = { name: null })"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <EditDialog
      dialogTitle="Edit Exercise"
      v-model="editExercise"
      @submit="tryEditExercise"
      submitButtonLabel="Save"
    >
    </EditDialog>
    <EditDialog
      dialogTitle="New Exercise"
      v-model="newExercise"
      @submit="tryCreateExercise"
      submitButtonLabel="Create"
    >
    </EditDialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
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
      newExercise: null,
      editExercise: null,
      editExerciseName: null,
      editExerciseDialogOpen: false,
    };
  },
  created() {},
  computed: {
    ...mapGetters(["userId", "exercises", "session"]),
    sortedExercises() {
      return [...this.exercises].sort((a, b) => {
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
    editExercise: function(newEditExercise) {
      this.editExerciseName = newEditExercise && newEditExercise.name;
      this.editExerciseDialogOpen = Boolean(newEditExercise);
    },
    editExerciseDialogOpen: function(newEditExerciseDialogOpen) {
      if (!newEditExerciseDialogOpen) {
        this.editExercise = null;
      }
    },
  },
  methods: {
    ...mapActions(["createExercise", "deleteExercise", "updateExerciseName"]),
    tryCreateExercise() {
      return this.createExercise({
        name: this.newExercise.name,
      }).then((this.newExercise = null));
    },
    tryEditExercise() {
      return this.updateExerciseName(this.editExercise).then(
        () => (this.editExercise = null),
      );
    },
    tryDeleteExercise(id) {
      return this.deleteExercise(id);
    },
    selectExercise(id) {
      this.$router.push({
        name: routes.exercise.name,
        params: { exerciseId: id },
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
}

.no-exercises-message {
  position: absolute;
  top: 50%;
  width: 100%;
}
</style>
