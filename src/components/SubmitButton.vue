<template>
  <div>
    <v-btn
      @click="takeAction"
      :disabled="disabled"
      text
      :loading="loading"
      :color="buttonColor"
    >
      <slot />
    </v-btn>
    <v-snackbar v-model="exception" color="red" text>
      {{ exceptionMessage }}
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
    fatalMessage: String,
    errorMessage: String,
    buttonColor: {
      type: String,
      default: "primary",
    },
  },
  data: function() {
    return {
      loading: false,
      exception: false,
      exceptionMessage: "",
    };
  },
  methods: {
    takeAction() {
      this.loading = true;
      this.exception = false;

      this.onClick()
        .then(result => {
          this.onSuccess && this.onSuccess(result);
        })
        .catch(exception => {
          this.exception = true;
          const isError = exception && Math.floor(exception.status / 100) === 4;
          this.exceptionMessage = isError
            ? this.errorMessage
            : this.fatalMessage;

          console.error(exception);
          this.onError && this.onError(exception);
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>
