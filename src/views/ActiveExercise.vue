<template>
  <div>
    <div v-if="exercise">
      <PageHeader>{{ exercise.name }}</PageHeader>
      <v-timeline dense v-if="exercise.sets && exercise.sets.length">
        <v-timeline-item
          v-if="prevExercise"
          color="secondary"
          fill-dot
          class="first-item"
        >
          <template v-slot:icon>
            <v-icon>mdi-arrow-left</v-icon>
          </template>
          <v-btn
            class="edit-button action"
            :to="{
              name: routes.activeExercise.name,
              params: {
                exerciseId: prevExercise.id,
              },
            }"
          >
            {{ prevExercise.name }}
          </v-btn>
        </v-timeline-item>
        <span v-for="(set, index) in exercise.sets" :key="index">
          <v-timeline-item
            fill-dot
            :color="
              index === currentSetIndex && restTime === null
                ? 'primary'
                : 'secondary'
            "
            :class="{
              'text--secondary': index !== currentSetIndex || restTime !== null,
              'complete-set':
                index < currentSetIndex ||
                (index === currentSetIndex && restTime !== null),
            }"
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
                    v-if="
                      index < currentSetIndex ||
                        (index === currentSetIndex && restTime !== null)
                    "
                    class="edit-button action"
                    @click="() => backToSet(index)"
                    icon
                  >
                    <v-icon>mdi-undo</v-icon>
                  </v-btn>
                  <v-btn
                    class="edit-button action"
                    @click="
                      () => {
                        editSet = JSON.parse(JSON.stringify(set));
                        editSetIndex = index;
                      }
                    "
                    icon
                    color="primary"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </v-row>
              </v-col>
            </v-row>
          </v-timeline-item>
          <v-timeline-item
            fill-dot
            :color="
              index === currentSetIndex && restTime !== null
                ? 'accent'
                : 'secondary'
            "
            icon="mdi-timer"
            :class="{
              'text--secondary': index !== currentSetIndex || restTime === null,
              'complete-set': index < currentSetIndex,
            }"
          >
            <v-row align-content="center" class="set-content" cols="6">
              <v-col>
                <v-row>
                  <v-col class="rest cell" cols="5">
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
        <v-timeline-item fill-dot color="secondary" class="final-item">
          <template v-slot:icon>
            <v-icon v-if="nextExercise">mdi-arrow-right</v-icon>
            <v-icon v-else>mdi-check</v-icon>
          </template>
          <v-btn
            v-if="nextExercise"
            class="edit-button action"
            :to="{
              name: routes.activeExercise.name,
              params: {
                exerciseId: nextExercise.id,
              },
            }"
          >
            {{ nextExercise.name }}
          </v-btn>
          <v-btn
            v-else
            class="edit-button action"
            :to="{
              name: routes.sessions.name,
            }"
          >
            Finish Workout
          </v-btn>
        </v-timeline-item>
      </v-timeline>
      <v-btn
        v-show="!setsComplete && restTime === null"
        color="success"
        rounded
        large
        bottom
        right
        fixed
        @click="() => (currentSet ? startRest(currentSet.rest, true) : null)"
      >
        Complete Set
      </v-btn>
      <v-speed-dial
        v-show="!setsComplete && restTime !== null"
        v-model="restFab"
        large
        bottom
        right
        fixed
      >
        <template v-slot:activator>
          <v-btn color="accent" fab large bottom right v-model="restFab">
            <v-progress-circular
              :value="restTime ? (restTime / originalRestTime) * 100 : 0"
              :size="62"
              :width="7"
              :rotate="-90"
            >
              {{ restTime }}
            </v-progress-circular>
          </v-btn>
        </template>
        <v-btn
          fab
          small
          color="success"
          @click="
            () => {
              restPaused = !restPaused;
            }
          "
        >
          <v-icon v-if="restPaused">mdi-play</v-icon>
          <v-icon v-else>mdi-pause</v-icon>
        </v-btn>
        <v-btn
          fab
          small
          color="error"
          @click="
            () => {
              restTime = null;
            }
          "
        >
          <v-icon>mdi-stop</v-icon>
        </v-btn>
      </v-speed-dial>
      <v-btn
        v-show="setsComplete && nextExercise"
        color="success"
        rounded
        large
        bottom
        right
        fixed
        :to="{
          name: routes.activeExercise.name,
          params: {
            exerciseId: nextExercise && nextExercise.id,
          },
        }"
      >
        Next Exercise
      </v-btn>
      <v-btn
        v-show="setsComplete && !nextExercise"
        color="success"
        rounded
        large
        bottom
        right
        fixed
        :to="{
          name: routes.sessions.name,
        }"
      >
        Finish Workout
      </v-btn>
      <EditSetDialog
        :dialogTitle="`Edit Set ${editSetIndex + 1}`"
        v-model="editSet"
        :onSubmit="tryEditSet"
        submitButtonLabel="Save"
      >
      </EditSetDialog>
    </div>
    <SkeletonList v-else />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import SkeletonList from "../components/SkeletonList";
import PageHeader from "../components/PageHeader";
import routes from "../router/routes";
import EditSetDialog from "../components/EditSetDialog";

const AUDIO_CONTEXT = new (window.AudioContext ||
  window.webkitAudioContext ||
  window.audioContext)();

export default {
  props: {
    exerciseId: String,
    nextExercise: Object,
    prevExercise: Object,
  },
  components: {
    SkeletonList,
    PageHeader,
    EditSetDialog,
  },
  data: function() {
    return {
      currentSetIndex: 0,
      restTime: null,
      originalRestTime: null,
      restInterval: null,
      routes,
      editSet: null,
      editSetIndex: null,
      restFab: false,
      restPaused: false,
    };
  },
  created() {
    this.setExerciseId(this.exerciseId);
  },
  destroyed() {
    clearInterval(this.restInterval);
  },
  watch: {
    exerciseId: function(newExerciseId) {
      this.setExerciseId(newExerciseId);

      if (this.restInterval) {
        this.currentSetIndex = -1;
      } else {
        this.restTime = null;
        this.currentSetIndex = 0;
      }
    },
    restTime: function(newRestTime) {
      if (newRestTime === null) {
        clearInterval(this.restInterval);
        this.restInterval = null;
        this.currentSetIndex++;
      } else if (newRestTime === 0) {
        this.beep(500, 1500);
        this.restTime = null;
      } else if (newRestTime === 1) {
        this.beep(250, 1000);
      } else if (newRestTime === 2) {
        this.beep(250, 1000);
      } else if (newRestTime === 3) {
        this.beep(250, 1000);
      } else if (newRestTime < 0) {
        this.restTime = null;
      }
    },
    restPaused: function(newRestPaused) {
      if (newRestPaused) {
        clearInterval(this.restInterval);
        this.restInterval = null;
      } else {
        this.startRest(this.restTime);
      }
    },
  },
  computed: {
    ...mapGetters(["exercise"]),
    setsComplete() {
      return (
        this.exercise &&
        this.exercise.sets &&
        this.currentSetIndex >= this.exercise.sets.length
      );
    },
    currentSet() {
      return (
        this.exercise &&
        this.exercise.sets &&
        this.currentSetIndex >= 0 &&
        this.currentSetIndex < this.exercise.sets.length &&
        this.exercise.sets[this.currentSetIndex]
      );
    },
  },
  methods: {
    ...mapMutations(["setExerciseId"]),
    ...mapActions(["updateExercise"]),
    startRest(time, reset) {
      this.originalRestTime = reset ? time : this.originalRestTime;
      this.restTime = time;
      this.restInterval = setInterval(() => {
        this.restTime = this.restTime === null ? null : this.restTime - 1;
      }, 1000);
    },
    backToSet(index) {
      this.restTime = null;
      this.currentSetIndex = index;
    },
    tryEditSet() {
      const newSets = [...this.exercise.sets];
      newSets.splice(this.editSetIndex, 1, this.editSet);

      return this.updateExercise({
        ...this.exercise,
        sets: newSets,
      }).then(() => {
        this.editSet = null;
      });
    },
    beep: function(duration, frequency) {
      const oscillator = AUDIO_CONTEXT.createOscillator();
      const gainNode = AUDIO_CONTEXT.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(AUDIO_CONTEXT.destination);

      if (frequency) {
        oscillator.frequency.value = frequency;
      }

      gainNode.gain.value = 1;
      oscillator.type = "sine";
      oscillator.start(AUDIO_CONTEXT.currentTime);
      oscillator.stop(AUDIO_CONTEXT.currentTime + (duration || 500) / 1000);
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

.upcoming-set .set-content {
  color: gray;
}

.complete-set .set-content {
  text-decoration: line-through;
  color: gray;
}

.first-item,
.final-item {
  align-items: center;
}

.final-item {
  padding-bottom: 0;
}
</style>
