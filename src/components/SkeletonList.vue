<template>
  <div>
    <v-skeleton-loader
      class="section-header"
      type="heading"
    ></v-skeleton-loader>
    <v-skeleton-loader
      v-for="n in numItems"
      :key="n"
      class="section"
      type="article, actions"
    ></v-skeleton-loader>
  </div>
</template>

<script>
export default {
  props: {
    numItems: {
      type: Number,
      default: 2,
    },
  },
};
</script>

<style scoped>
.section-header {
  margin-top: 1rem;
  margin-bottom: 2rem;
}
.section {
  margin-top: 1rem;
}
</style>
