<template>
  <div>
    <PageHeader v-if="exercise">{{ exercise.name }}</PageHeader>
    <!-- <router-view v-if="exercise" :exercise="exercise"></router-view> -->
    <SkeletonList v-else />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import SkeletonList from "../components/SkeletonList";
import PageHeader from "../components/PageHeader";

export default {
  props: {
    exerciseId: String,
  },
  components: {
    SkeletonList,
    PageHeader,
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
