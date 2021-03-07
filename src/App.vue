<template>
  <v-app>
    <v-navigation-drawer app> </v-navigation-drawer>

    <v-app-bar app color="primary">
      Progressive Weight Training
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view class="body" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>
