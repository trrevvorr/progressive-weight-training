<template>
  <div>
    <div v-if="exercise">
      <PageHeader>{{ exercise.name }}</PageHeader>
      <v-timeline dense v-if="exercise.sets && exercise.sets.length">
        <span v-for="(set, index) in exercise.sets" :key="index">
          <Set
            :active="true"
            :actions="[
              {
                name: 'delete',
                icon: 'mdi-delete',
                onClick: () => tryDeleteSet(index),
                loading: setBeingDeleted === index,
                color: 'error',
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
              <b>{{ index + 1 }}</b>
            </template>
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
          </Set>
          <Set :active="true" dotColor="accent">
            <template v-slot:icon>
              <v-icon>mdi-timer</v-icon>
            </template>
            <div class="rest text--secondary" cols="5">
              <span class="value">{{ set.rest }}</span>
              <span class="label">sec</span>
            </div>
          </Set>
        </span>
        <Set :active="true" dotColor="success" class="final-item">
          <template v-slot:icon color="success">
            <v-icon>mdi-plus</v-icon>
          </template>
          <v-btn color="success" @click="() => (newSet = { ...defaultSet })">
            Add Set
          </v-btn>
        </Set>
      </v-timeline>
      <EditSetDialog
        :dialogTitle="`Edit Set ${editSetIndex + 1}`"
        v-model="editSet"
        :onSubmit="tryEditSet"
        submitButtonLabel="Save"
      >
      </EditSetDialog>
      <EditSetDialog
        dialogTitle="New Set"
        v-model="newSet"
        :onSubmit="tryCreateSet"
        submitButtonLabel="Create"
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
import EditSetDialog from "../components/EditSetDialog";
import Set from "../components/Set";

export default {
  props: {
    exerciseId: String,
  },
  components: {
    SkeletonList,
    PageHeader,
    EditSetDialog,
    Set,
  },
  data: function() {
    return {
      editSet: null,
      editSetIndex: null,
      newSet: null,
      setBeingDeleted: null,
    };
  },
  created() {
    this.setExerciseId(this.exerciseId);
  },
  watch: {
    editSet: function(newEditSet) {
      if (newEditSet === null) {
        this.editSetIndex = null;
      }
    },
  },
  computed: {
    ...mapGetters(["exercise"]),
    defaultSet() {
      return {
        weight:
          this.exercise && this.exercise.sets && this.exercise.sets.length
            ? this.exercise.sets[this.exercise.sets.length - 1].weight
            : 15,
        reps:
          this.exercise && this.exercise.sets && this.exercise.sets.length
            ? this.exercise.sets[this.exercise.sets.length - 1].reps
            : 10,
        rest:
          this.exercise && this.exercise.sets && this.exercise.sets.length
            ? this.exercise.sets[this.exercise.sets.length - 1].rest
            : 60,
      };
    },
  },
  methods: {
    ...mapMutations(["setExerciseId"]),
    ...mapActions(["updateExercise"]),
    tryCreateSet() {
      const existingSets = this.exercise.sets || [];

      return this.updateExercise({
        ...this.exercise,
        sets: [...existingSets, this.newSet],
      }).then(() => (this.newSet = null));
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
    tryDeleteSet(deleteIndex) {
      if (this.setBeingDeleted === null) {
        this.setBeingDeleted = deleteIndex;
        return this.updateExercise({
          ...this.exercise,
          sets: this.exercise.sets.filter((set, index) => index != deleteIndex),
        }).then(() => {
          this.setBeingDeleted = null;
        });
      }
    },
  },
};
</script>

<style scoped>
.cell {
  text-align: center;
}

.cell .value,
.rest .value,
.divider {
  font-size: 1.5rem;
}

.cell .label,
.rest .label {
  margin-left: 0.25rem;
}

.action {
  margin-right: 1rem;
}

.final-item {
  padding-bottom: 0;
}
</style>
