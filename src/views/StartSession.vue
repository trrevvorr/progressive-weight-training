<template>
  <div>
    <PageHeader>{{ session.name }}</PageHeader>
    <div class="exercise-list">
      <v-timeline dense v-if="exercises && exercises.length">
        <v-timeline-item
          v-for="(exercise, index) in exercises"
          :key="exercise.id"
          fill-dot
          color="primary"
          class="exercise-row"
        >
          <template v-slot:icon>
            <b>{{ index + 1 }}</b>
          </template>
          <h4>{{ exercise.name }}</h4>
          <span class="text--secondary">
            {{ exercise.sets ? exercise.sets.length : 0 }} sets
          </span>
        </v-timeline-item>
        <v-timeline-item fill-dot color="green" class="final-item">
          <template v-slot:icon>
            <v-icon>mdi-check</v-icon>
          </template>
        </v-timeline-item>
      </v-timeline>
      <div v-else class="no-exercises-message">
        <p class="text--secondary">
          There are no exercises in this sesssion. You can add exercises
          <router-link :to="{ name: routes.exercises.name }"> here</router-link
          >.
        </p>
      </div>
    </div>
    <v-btn
      color="primary"
      fab
      large
      bottom
      right
      fixed
      :disabled="!nextExerciseId"
      :to="{
        name: routes.activeExercise.name,
        params: {
          exerciseId: nextExerciseId,
        },
      }"
    >
      <v-icon>mdi-play</v-icon>
    </v-btn>
  </div>
</template>

<script>
import routes from "../router/routes";
import PageHeader from "../components/PageHeader";

export default {
  components: {
    PageHeader,
  },
  props: {
    session: Object,
    exercises: Array,
    nextExerciseId: String,
  },
  data: function() {
    return {
      routes,
    };
  },
};
</script>

<style scoped>
.exercise-list {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.exercise-row {
  align-items: center;
}

.final-item {
  padding-bottom: 0;
}

.no-exercises-message {
  text-align: center;
  position: absolute;
  top: 50%;
  width: 80%;
}
</style>
