<template>
  <div>
    <div v-if="session">
      <router-view
        :session="session"
        :exercises="sortedExercises"
        :nextExerciseId="nextExerciseId"
        :prevExerciseId="prevExerciseId"
      ></router-view>
    </div>
    <SkeletonList v-else />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import SkeletonList from "../components/SkeletonList";
import routes from "../router/routes";

export default {
  props: {
    session: Object,
  },
  components: {
    SkeletonList,
  },
  data: function() {
    return {
      routes,
    };
  },
  created() {
    this.setExerciseId(null);
  },
  computed: {
    ...mapGetters(["exerciseId", "exercises"]),
    sortedExercises() {
      return [...this.exercises].sort((a, b) => a.index - b.index);
    },
    nextExerciseId() {
      if (this.exerciseId) {
        for (let i = 0; i < this.sortedExercises.length; i++) {
          if (this.sortedExercises[i].id === this.exerciseId) {
            if (i + 1 < this.sortedExercises.length) {
              return this.sortedExercises[i + 1].id;
            } else {
              return null;
            }
          }
        }
        return null;
      } else {
        return (
          (this.sortedExercises &&
            this.sortedExercises.length &&
            this.sortedExercises[0].id) ||
          null
        );
      }
    },
    prevExerciseId() {
      if (this.exerciseId) {
        for (let i = 0; i < this.sortedExercises.length; i++) {
          if (this.sortedExercises[i].id === this.exerciseId) {
            if (i > 0) {
              return this.sortedExercises[i - 1].id;
            } else {
              return null;
            }
          }
        }
        return null;
      } else {
        return null;
      }
    },
  },
  methods: {
    ...mapMutations(["setExerciseId"]),
  },
};
</script>

<style scoped>
.section {
  margin-top: 2rem;
}
</style>
