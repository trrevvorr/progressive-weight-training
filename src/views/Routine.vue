<template>
  <div>
    <router-view v-if="routine" :routine="routine"></router-view>
    <SkeletonList v-else />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import SkeletonList from "../components/SkeletonList";

export default {
  props: {
    routineId: String,
  },
  components: {
    SkeletonList,
  },
  data: function() {
    return {
      routine: null,
    };
  },
  created() {
    this.setRoutineId(this.routineId);
    this.routine = this.getRoutine;
  },
  computed: {
    ...mapGetters({ getRoutine: "routine" }),
  },
  methods: {
    ...mapMutations(["setRoutineId"]),
  },
};
</script>

<style scoped>
.section {
  margin-top: 2rem;
}
</style>
