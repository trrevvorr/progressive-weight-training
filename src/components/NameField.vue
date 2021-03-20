<template>
  <v-text-field
    counter
    dense
    maxlength="40"
    :rules="[rules.nameIsPlainText]"
    :label="label"
    v-model="currentValue"
  ></v-text-field>
</template>

<script>
export default {
  props: {
    value: String,
    label: {
      type: String,
      default: "Name",
    },
    validationPattern: {
      type: String,
      default: "^[\\w -/]+$",
    },
  },
  data: function() {
    return {
      currentValue: this.value,
      rules: {
        nameIsPlainText: value => {
          const pattern = new RegExp(this.validationPattern);
          return pattern.test(value) || "name contains invalid characters";
        },
      },
    };
  },
  watch: {
    value: function(newValue) {
      this.currentValue = newValue;
    },
    currentValue: function(newCurrentValue) {
      this.$emit("input", newCurrentValue);
    },
  },
};
</script>
