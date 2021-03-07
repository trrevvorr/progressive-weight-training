<template>
  <div>
    <v-btn
      @click="takeAction"
      :disabled="disabled"
      text
      :loading="loading"
      color="primary"
    >
      <slot />
    </v-btn>
    <v-snackbar v-model="error" color="red" text>
      {{ errorMessage }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    disabled: Boolean,
    onClick: Function,
    onSuccess: Function,
    onError: Function,
    errorMessage: String,
  },
  data: function() {
    return {
      loading: false,
      error: false,
    };
  },
  methods: {
    takeAction() {
      this.loading = true;
      this.error = false;

      this.onClick()
        .then(result => {
          this.onSuccess && this.onSuccess(result);
        })
        .catch(error => {
          this.error = true;
          console.error(error);
          this.onError && this.onError(error);
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>
