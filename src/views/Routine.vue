<template>
  <div>
    <router-view v-if="routine" :routine="routine"></router-view>
    <div v-else>
      <v-skeleton-loader class="section" type="heading"></v-skeleton-loader>
      <v-skeleton-loader
        class="section"
        type="article, actions"
      ></v-skeleton-loader>
      <v-skeleton-loader
        class="section"
        type="article, actions"
      ></v-skeleton-loader>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  props: {
    routineId: String,
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
