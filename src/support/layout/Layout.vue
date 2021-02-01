<template>
  <v-main class="grey lighten-3">
    <v-container>
      <v-row>
        <v-col>
          <v-sheet
            rounded="lg"
          >
            <v-fade-transition mode="out-in">
              <v-container fluid>
                <router-view />
              </v-container>
            </v-fade-transition>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: 'Layout',
};
</script>
