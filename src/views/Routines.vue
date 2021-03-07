<template>
  <div class="content">
    <h1>Routines</h1>

    <v-card class="section">
      <v-card-title>New Routine</v-card-title>
      <v-card-text>
        <v-text-field
          dense
          maxlength="50"
          label="Routine Name"
          v-model="newRoutineName"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <SubmitButton
          :onClick="tryCreateRoutine"
          :onSuccess="
            () => {
              newRoutineName = null;
            }
          "
          :disabled="!newRoutineName"
          errorMessage="Failed to create routine. Try again later."
        >
          Create Routine
        </SubmitButton>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SubmitButton from "../components/SubmitButton";

export default {
  components: {
    SubmitButton,
  },
  data: function() {
    return {
      newRoutineName: null,
    };
  },
  created() {},
  computed: {
    ...mapGetters(["userId"]),
  },
  methods: {
    ...mapActions(["createRoutine"]),
    tryCreateRoutine() {
      return this.createRoutine({
        name: this.newRoutineName,
        userId: this.userId,
      });
    },
  },
};
</script>

<style scoped>
.section {
  margin-top: 2rem;
}

.id-warning {
  margin-top: 1rem;
}
</style>
