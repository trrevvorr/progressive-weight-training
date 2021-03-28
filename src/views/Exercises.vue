<template>
  <div class="content">
    <PageHeader>{{ this.session.name }}</PageHeader>

    <div v-if="sortedExercises.length">
      <v-card
        v-for="(exercise, index) in sortedExercises"
        :key="exercise.id"
        class="section"
        @click="selectExercise(exercise.id)"
      >
        <v-card-title class="card-title">{{ exercise.name }}</v-card-title>
        <v-card-actions>
          <v-row>
            <v-col>
              <span @click.stop>
                <SubmitButton
                  :onClick="() => tryDeleteExercise(exercise.id)"
                  buttonColor="error"
                  errorMessage="Failed to delete exercise. Try again later."
                >
                  Delete
                </SubmitButton>
              </span>
              <v-btn
                text
                color="primary"
                @click.stop="
                  editExercise = JSON.parse(JSON.stringify(exercise))
                "
              >
                Edit
              </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn
                text
                icon
                color="primary"
                :disabled="index === 0"
                @click.stop="tryReorder(index, 1)"
              >
                <v-icon>
                  mdi-arrow-up
                </v-icon>
              </v-btn>
              <v-btn
                text
                icon
                color="primary"
                :disabled="index === sortedExercises.length - 1"
                @click.stop="tryReorder(index, -1)"
              >
                <v-icon>
                  mdi-arrow-down
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </div>
    <Centered v-else>
      <p class="text--secondary">
        Click the "+" to create your first exercise
      </p>
    </Centered>

    <v-btn
      color="success"
      fab
      large
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
      :onSubmit="tryEditExercise"
      submitButtonLabel="Save"
    >
    </EditDialog>
    <EditDialog
      dialogTitle="New Exercise"
      v-model="newExercise"
      :onSubmit="tryCreateExercise"
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
import Centered from "../components/Centered";
import routes from "../router/routes";

export default {
  components: {
    SubmitButton,
    PageHeader,
    EditDialog,
    Centered,
  },
  props: {
    session: Object,
  },
  data: function() {
    return {
      newExercise: null,
      editExercise: null,
    };
  },
  created() {},
  computed: {
    ...mapGetters(["userId", "exercises"]),
    sortedExercises() {
      return [...this.exercises].sort((a, b) => a.index - b.index);
    },
  },
  methods: {
    ...mapActions(["createExercise", "deleteExercise", "updateExercise"]),
    tryCreateExercise() {
      return this.createExercise({
        name: this.newExercise.name,
      }).then(() => (this.newExercise = null));
    },
    tryEditExercise() {
      return this.updateExercise(this.editExercise).then(
        () => (this.editExercise = null),
      );
    },
    tryReorder(currentIndex, numSpacesUp) {
      const oldOrder = [...this.sortedExercises];

      if (
        currentIndex - numSpacesUp < 0 ||
        currentIndex - numSpacesUp >= oldOrder.lenght
      ) {
        throw Error(
          `invalid reorder: currentIndex=${currentIndex}, numSpacesUp=${numSpacesUp}, totalSpaces=${oldOrder.length}`,
        );
      }

      const newOrder = this.moveItemInArray(
        oldOrder,
        currentIndex,
        currentIndex - numSpacesUp,
      );

      const changedOrder = newOrder
        .map((exercise, index) => ({ ...exercise, index }))
        .filter((exercise, index) => exercise.id !== oldOrder[index].id);

      return Promise.all(
        changedOrder.map(exercise => this.updateExercise(exercise)),
      );
    },
    moveItemInArray(array, from, to) {
      const copy = [...array];
      const elementToMove = copy.splice(from, 1)[0];
      copy.splice(to, 0, elementToMove);
      return copy;
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
  text-transform: capitalize;
}
</style>
