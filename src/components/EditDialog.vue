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
          <NameField v-model="currentValue.name" />
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
        <!-- TODO: how to use @click but also handle errors displayed? -->
        <SubmitButton
          :onClick="onSubmit"
          :disabled="!formValid || !currentValue.name"
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
import NameField from "../components/NameField";

export default {
  props: {
    value: Object,
    dialogTitle: String,
    submitButtonLabel: String,
    onSubmit: Function,
  },
  components: {
    SubmitButton,
    NameField,
  },
  data: function() {
    return {
      dialogOpen: Boolean(this.value),
      currentValue: this.value,
      formValid: false,
    };
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
