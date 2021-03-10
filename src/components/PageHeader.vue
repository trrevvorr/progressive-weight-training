<template>
  <h1><slot /></h1>
</template>

<script>
export default {
  props: {
    text: String,
  },
};
</script>

<style scoped>
h1 {
  margin-top: 1rem;
  margin-bottom: 2rem;
}
</style>
