<template>
  <v-text-field
    counter
    dense
    maxlength="20"
    :rules="[rules.nameIsPlainText]"
    label="Name"
    v-model="currentValue"
  ></v-text-field>
</template>

<script>
export default {
  props: {
    value: String,
  },
  data: function() {
    return {
      currentValue: this.value,
      rules: {
        nameIsPlainText: value => {
          const pattern = /^[\w ]+$/;
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
