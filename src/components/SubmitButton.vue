<template>
  <span>
    <v-btn
      @click="takeAction"
      :disabled="disabled"
      text
      :loading="loading"
      :color="buttonColor"
      :icon="icon"
    >
      <slot />
    </v-btn>
    <v-snackbar v-model="exception" color="red" text>
      {{ exceptionMessage }}
    </v-snackbar>
  </span>
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
    icon: Boolean,
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

      if (this.onClick) {
        this.onClick()
          .then(result => {
            this.onSuccess && this.onSuccess(result);
          })
          .catch(exception => {
            this.exception = true;
            const isError =
              exception && Math.floor(exception.status / 100) === 4;
            this.exceptionMessage = isError
              ? this.errorMessage
              : this.fatalMessage;

            console.error(exception);
            this.onError && this.onError(exception);
          })
          .finally(() => (this.loading = false));
      } else {
        this.$emit("click");
      }
    },
  },
};
</script>
