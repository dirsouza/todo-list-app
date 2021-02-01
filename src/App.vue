<template>
  <v-app id="inspire">
    <app-bar />

    <router-view />
  </v-app>
</template>

<script>
import AppBar from 'Support/components/AppBar.vue';

export default {
  name: 'App',

  components: {
    AppBar,
  },
};
</script>
