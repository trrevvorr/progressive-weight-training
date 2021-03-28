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
        <v-timeline-item fill-dot color="success" class="final-item">
          <template v-slot:icon>
            <v-icon>mdi-check</v-icon>
          </template>
        </v-timeline-item>
      </v-timeline>
      <Centered v-else>
        <p class="text--secondary">
          There are no exercises in this sesssion. You can add exercises
          <router-link :to="{ name: routes.exercises.name }"> here</router-link
          >.
        </p>
      </Centered>
    </div>
    <v-btn
      color="success"
      fab
      large
      bottom
      right
      fixed
      :disabled="!nextExercise"
      :to="{
        name: routes.activeExercise.name,
        params: {
          exerciseId: nextExercise && nextExercise.id,
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
import Centered from "../components/Centered";

export default {
  components: {
    PageHeader,
    Centered,
  },
  props: {
    session: Object,
    exercises: Array,
    nextExercise: Object,
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
</style>
