<template>
  <v-dialog v-model="dialogOpen">
    <!-- pass through v-dialog slots -->
    <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>

    <v-card v-if="currentValue">
      <v-card-title>{{ dialogTitle }}</v-card-title>
      <v-card-text>
        <v-form v-model="formValid">
          <NumberField
            v-model="currentValue.weight"
            label="Weight"
            suffix="lbs"
          />
          <NumberField
            v-model="currentValue.reps"
            label="Reps"
            suffix="reps"
            :incrementBy="1"
          />
          <NumberField v-model="currentValue.rest" label="Rest" suffix="sec" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          @click="
            () => {
              dialogOpen = false;
            }
          "
        >
          Cancel
        </v-btn>
        <SubmitButton
          :onClick="onSubmit"
          :disabled="!(formValid && inputsValid)"
          errorMessage="Invalid input."
          fatalMessage="Failed to save changes. Try again later."
        >
          {{ submitButtonLabel }}
        </SubmitButton>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import SubmitButton from "../components/SubmitButton";
import NumberField from "../components/NumberField";

export default {
  props: {
    value: Object,
    dialogTitle: String,
    submitButtonLabel: String,
    onSubmit: Function,
  },
  components: {
    SubmitButton,
    NumberField,
  },
  data: function() {
    return {
      dialogOpen: Boolean(this.value),
      currentValue: this.value,
      formValid: false,
    };
  },
  computed: {
    inputsValid() {
      return Object.values(this.currentValue).reduce(
        (allValid, value) => allValid && (value === 0 || value > 0),
        true,
      );
    },
  },
  watch: {
    value: function(newValue) {
      this.dialogOpen = Boolean(newValue);
      this.currentValue = newValue;
    },
    currentValue: function(newCurrentValue) {
      this.$emit("input", newCurrentValue);
    },
    dialogOpen: function(newDialogOpen) {
      if (!newDialogOpen) {
        this.currentValue = null;
      }
    },
  },
  methods: {},
};
</script>

<style scoped></style>
