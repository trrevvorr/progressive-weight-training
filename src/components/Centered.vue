<template>
  <div class="centered-message">
    <slot></slot>
  </div>
</template>

<style scoped>
.centered-message {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  padding: 2rem;
  text-align: center;
}
</style>
