<template>
  <div>
    <v-row align="center">
      <v-col cols="6">
        <v-text-field
          v-model="currentValue"
          type="number"
          :label="label"
          :suffix="suffix"
        />
      </v-col>
      <v-col cols="6" align-self="center">
        <v-row justify="end" class="incrementer-row">
          <v-btn
            class="subtract action"
            icon
            color="error"
            @click="add(-incrementBy)"
          >
            <v-icon>
              mdi-minus
            </v-icon>
          </v-btn>
          <span class="divider text--secondary">
            {{ incrementBy }}
          </span>
          <v-btn
            class="add action"
            icon
            color="primary"
            @click="add(incrementBy)"
          >
            <v-icon>
              mdi-plus
            </v-icon>
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    value: Number,
    label: String,
    suffix: String,
    incrementBy: {
      type: Number,
      default: 5,
    },
  },
  data: function() {
    return {
      currentValue: this.value,
    };
  },
  watch: {
    value: function(newValue) {
      this.currentValue = newValue;
    },
    currentValue: function(newCurrentValue) {
      this.$emit("input", parseFloat(newCurrentValue));
    },
  },
  methods: {
    add(amount) {
      const newValue = this.currentValue + amount;
      this.currentValue = newValue < 0 ? 0 : newValue;
    },
  },
};
</script>

<style scoped>
.incrementer-row {
  align-items: center;
}

.divider {
  font-size: 1.25rem;
}

.action {
  margin-right: 0.25rem;
  margin-left: 0.25rem;
}
</style>
