<template>
  <div>
    <div v-if="exercise">
      <PageHeader>{{ exercise.name }}</PageHeader>
      <v-timeline dense v-if="exercise.sets && exercise.sets.length">
        <span v-for="(set, index) in exercise.sets" :key="index">
          <v-timeline-item
            fill-dot
            color="primary"
            :class="{ complete: index < currentSet }"
          >
            <template v-slot:icon>
              <b>{{ index + 1 }}</b>
            </template>
            <v-row align-content="center">
              <v-col cols="6" class="set-content">
                <v-row>
                  <v-col class="weight cell" cols="5">
                    <span class="value">{{ set.weight }}</span>
                    <span class="label text--secondary">lbs</span>
                  </v-col>
                  <v-col class="divider text--secondary" cols="2">
                    ×
                  </v-col>
                  <v-col class="reps cell" cols="5">
                    <span class="value">{{ set.reps }}</span>
                    <span class="label text--secondary">reps</span>
                  </v-col>
                </v-row>
              </v-col>
              <v-col class="actions" cols="6" align-self="center">
                <v-row align="end" justify="end">
                  <v-btn
                    v-if="index === currentSet"
                    class="edit-button action"
                    color="green"
                    @click="nextSet"
                  >
                    Done
                  </v-btn>
                  <v-btn
                    v-if="index === currentSet - 1"
                    class="edit-button action"
                    @click="previousSet"
                  >
                    Undo
                  </v-btn>
                </v-row>
              </v-col>
            </v-row>
          </v-timeline-item>
          <v-timeline-item fill-dot color="secondary" icon="mdi-timer">
            <v-row align-content="center" cols="6">
              <v-col>
                <v-row>
                  <v-col class="rest cell text--secondary" cols="5">
                    <span class="value">{{ set.rest }}</span>
                    <span class="label text--secondary">sec</span>
                  </v-col>
                  <v-col cols="7" />
                </v-row>
              </v-col>
              <v-col cols="6"> </v-col>
            </v-row>
          </v-timeline-item>
        </span>
      </v-timeline>
      <v-btn
        v-if="
          nextExerciseId &&
            exercise &&
            exercise.sets &&
            currentSet >= exercise.sets.length
        "
        color="green"
        fab
        large
        bottom
        right
        fixed
        :to="{
          name: routes.activeExercise.name,
          params: {
            exerciseId: nextExerciseId,
          },
        }"
      >
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
      <v-btn
        v-if="
          !nextExerciseId &&
            (!exercise || !exercise.sets || currentSet >= exercise.sets.length)
        "
        color="green"
        fab
        large
        bottom
        right
        fixed
        :to="{
          name: routes.sessions.name,
        }"
      >
        <v-icon>mdi-check</v-icon>
      </v-btn>
    </div>
    <SkeletonList v-else />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import SkeletonList from "../components/SkeletonList";
import PageHeader from "../components/PageHeader";
import routes from "../router/routes";

export default {
  props: {
    exerciseId: String,
    nextExerciseId: String,
    prevExerciseId: String,
  },
  components: {
    SkeletonList,
    PageHeader,
  },
  data: function() {
    return {
      currentSet: 0,
      routes,
    };
  },
  created() {
    this.setExerciseId(this.exerciseId);
  },
  watch: {
    exerciseId: function(newExerciseId) {
      this.setExerciseId(newExerciseId);
      this.currentSet = 0;
    },
  },
  computed: {
    ...mapGetters(["exercise"]),
  },
  methods: {
    ...mapMutations(["setExerciseId"]),
    nextSet() {
      this.currentSet++;
    },
    previousSet() {
      this.currentSet = this.currentSet == 0 ? 0 : this.currentSet - 1;
    },
  },
};
</script>

<style scoped>
.cell {
  text-align: center;
}

.cell .value,
.divider {
  font-size: 1.5rem;
}

.cell .label {
  margin-left: 0.25rem;
}

.action {
  margin-right: 1rem;
}

.complete .set-content {
  text-decoration: line-through;
  opacity: 50%;
}
</style>
