<template>
  <div>
    <h1 v-if="exercise">{{ exercise.name }}</h1>
    <!-- <router-view v-if="exercise" :exercise="exercise"></router-view> -->
    <SkeletonList v-else />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import SkeletonList from "../components/SkeletonList";

export default {
  props: {
    exerciseId: String,
  },
  components: {
    SkeletonList,
  },
  data: function() {
    return {
      exercise: null,
    };
  },
  created() {
    this.setExerciseId(this.exerciseId);
    this.exercise = this.getExercise;
  },
  computed: {
    ...mapGetters({ getExercise: "exercise" }),
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
