<template>
  <div>
    <div v-if="exercise">
      <PageHeader>{{ exercise.name }}</PageHeader>
      <v-timeline dense v-if="exercise.sets && exercise.sets.length">
        <span v-for="(set, index) in exercise.sets" :key="index">
          <v-timeline-item fill-dot color="primary">
            <template v-slot:icon>
              <b>{{ index + 1 }}</b>
            </template>
            <v-row align-content="center">
              <v-col cols="6">
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
                  <SubmitButton
                    class="delete-button action"
                    :onClick="() => tryDeleteSet(index)"
                    errorMessage="Invalid input."
                    fatalMessage="Failed to delete set. Try again later."
                    icon
                    buttonColor="error"
                  >
                    <v-icon>
                      mdi-delete
                    </v-icon>
                  </SubmitButton>
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
                    <v-icon>
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                </v-row>
              </v-col>
            </v-row>
          </v-timeline-item>
          <v-timeline-item fill-dot color="accent" icon="mdi-timer">
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
        <v-timeline-item fill-dot color="success" class="final-item">
          <template v-slot:icon color="success">
            <v-icon>mdi-plus</v-icon>
          </template>
          <v-btn color="success" @click="() => (newSet = { ...defaultSet })">
            Add Set
          </v-btn>
        </v-timeline-item>
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
import SubmitButton from "../components/SubmitButton";

export default {
  props: {
    exerciseId: String,
  },
  components: {
    SkeletonList,
    PageHeader,
    EditSetDialog,
    SubmitButton,
  },
  data: function() {
    return {
      editSet: null,
      editSetIndex: null,
      newSet: null,
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
      return this.updateExercise({
        ...this.exercise,
        sets: this.exercise.sets.filter((set, index) => index != deleteIndex),
      });
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

.final-item {
  padding-bottom: 0;
}
</style>
