<template>
  <div>
    <div v-if="exercise">
      <PageHeader>{{ exercise.name }}</PageHeader>
      <v-timeline dense v-if="exercise.sets && exercise.sets.length">
        <Set v-if="prevExercise" dotColor="secondary" class="first-item">
          <template v-slot:icon>
            <v-icon>mdi-arrow-left</v-icon>
          </template>
          <v-btn
            class="action"
            :to="{
              name: routes.activeExercise.name,
              params: {
                exerciseId: prevExercise.id,
              },
            }"
          >
            {{ prevExercise.name }}
          </v-btn>
        </Set>
        <span v-for="(set, index) in exercise.sets" :key="index">
          <Set
            :active="index === currentSetIndex && restTime === null"
            :complete="
              index < currentSetIndex ||
                (index === currentSetIndex && restTime !== null)
            "
            :actions="[
              {
                name: 'undo',
                icon: 'mdi-undo',
                onClick: () => backToSet(index),
                disabled:
                  index >= currentSetIndex ||
                  (index === currentSetIndex && restTime === null),
              },
              {
                name: 'edit',
                icon: 'mdi-pencil',
                color: 'primary',
                onClick: () => {
                  editSet = JSON.parse(JSON.stringify(set));
                  editSetIndex = index;
                },
              },
            ]"
          >
            <template v-slot:icon>
              <span class="set-number">{{ index + 1 }}</span>
            </template>
            <v-row>
              <v-col class="weight cell" cols="5">
                <span class="value">{{ set.weight }}</span>
                <span class="label">lbs</span>
              </v-col>
              <v-col class="divider" cols="2">
                ×
              </v-col>
              <v-col class="reps cell" cols="5">
                <span class="value">{{ set.reps }}</span>
                <span class="label">reps</span>
              </v-col>
            </v-row>
          </Set>
          <Set
            dotColor="accent"
            :active="index === currentSetIndex && restTime !== null"
            :complete="index < currentSetIndex"
          >
            <template v-slot:icon>
              <v-icon>mdi-timer</v-icon>
            </template>
            <div class="set-content">
              <span class="value">{{ set.rest }}</span>
              <span class="label">sec</span>
            </div>
          </Set>
        </span>
        <Set v-if="nextExercise" dotColor="secondary" class="final-item">
          <template v-slot:icon>
            <v-icon>mdi-arrow-right</v-icon>
          </template>
          <v-btn
            class="action"
            :to="{
              name: routes.activeExercise.name,
              params: {
                exerciseId: nextExercise.id,
              },
            }"
          >
            {{ nextExercise.name }}
          </v-btn>
        </Set>
        <Set v-else dotColor="secondary" class="final-item">
          <template v-slot:icon>
            <v-icon>mdi-check</v-icon>
          </template>
          <v-btn
            class="action"
            :to="{
              name: routes.sessions.name,
            }"
          >
            Finish Workout
          </v-btn>
        </Set>
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
          color="primary"
          @click="
            () => {
              restPaused ? resumeRest() : pauseRest();
            }
          "
        >
          <v-icon v-if="restPaused">mdi-play</v-icon>
          <v-icon v-else>mdi-pause</v-icon>
        </v-btn>
        <v-btn fab small color="success" @click="() => stopRest(false)">
          <v-icon>mdi-fast-forward</v-icon>
        </v-btn>
        <v-btn fab small color="error" @click="() => stopRest(true)">
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
import Set from "../components/Set";

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
    Set,
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
        this.stopRest(true);
        this.currentSetIndex = 0;
      }
    },
    restTime: function(newRestTime) {
      if (newRestTime === 0) {
        this.beep(500, 1500);
        this.stopRest();
      } else if (newRestTime === 1) {
        this.beep(250, 1000);
      } else if (newRestTime === 2) {
        this.beep(250, 1000);
      } else if (newRestTime === 3) {
        this.beep(250, 1000);
      } else if (newRestTime < 0) {
        this.stopRest(true);
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
      this.restPaused = false;
      this.originalRestTime = reset ? time : this.originalRestTime;
      this.restTime = time;
      this.restInterval = setInterval(() => {
        this.restTime = this.restTime === null ? null : this.restTime - 1;
      }, 1000);
    },
    pauseRest() {
      if (!this.restPaused) {
        this.restPaused = true;
        clearInterval(this.restInterval);
        this.restInterval = null;
      }
    },
    resumeRest() {
      if (this.restPaused) {
        this.restPaused = false;
        this.startRest(this.restTime);
      }
    },
    stopRest(reset) {
      clearInterval(this.restInterval);
      this.restInterval = null;
      this.restTime = null;
      this.restPaused = false;

      if (reset !== true) {
        this.currentSetIndex++;
      }
    },
    backToSet(index) {
      this.stopRest(true);
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

.set-content .value,
.divider {
  font-size: 1.5em;
}

.set-content .label,
.divider {
  color: gray;
}

.set-content .label {
  margin-left: 0.25rem;
}

.action {
  margin-right: 1rem;
}

.first-item,
.final-item {
  align-items: center;
}

.final-item {
  padding-bottom: 0;
}

.set-number {
  font-weight: bold;
  font-size: 1.25em;
}
</style>
