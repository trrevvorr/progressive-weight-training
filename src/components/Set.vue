<template>
  <v-timeline-item
    fill-dot
    :large="active"
    :color="dynamicDotColor"
    :class="{ set: true, active: active }"
  >
    <template v-slot:icon>
      <span class="dot-container">
        <slot class="dot-icon" name="icon"></slot>
        <v-icon v-if="complete" class="complete-icon">mdi-check-circle</v-icon>
      </span>
    </template>
    <v-row align-content="center">
      <v-col
        :cols="enabledActions.length ? 7 : 12"
        class="set-content"
        :style="{ color: fontColor }"
      >
        <slot></slot>
      </v-col>
      <v-col
        v-if="enabledActions.length"
        class="actions"
        cols="5"
        align-self="center"
      >
        <v-row align="end" justify="end">
          <v-btn
            v-for="action in enabledActions"
            :key="action.name"
            class="action"
            icon
            @click="action.onClick"
            :title="action.name"
            :color="action.color"
            :loading="action.loading"
          >
            <v-icon>{{ action.icon }}</v-icon>
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-timeline-item>
</template>

<script>
export default {
  props: {
    dotColor: {
      type: String,
      default: "primary",
    },
    complete: Boolean,
    active: Boolean,
    actions: Array,
  },
  computed: {
    dynamicDotColor() {
      return this.complete || !this.active ? "secondary" : this.dotColor;
    },
    fontColor() {
      return this.complete ? "gray" : null;
    },
    enabledActions() {
      return this.actions
        ? this.actions.filter(action => !action.disabled)
        : [];
    },
  },
};
</script>

<style scoped>
.action {
  margin-right: 1rem;
}

.dot-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.complete-icon {
  position: absolute;
  top: -8px;
  right: -8px;
}

.set {
  align-items: center;
}
.active.set {
  font-size: 1.2rem;
}
</style>
