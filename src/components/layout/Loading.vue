<template>
  <v-layout column align-center>
    <v-flex xs4>
      <v-progress-circular
        indeterminate
        color="accent"
        :size="100"
        :width="10"
      />
    </v-flex>
    <v-flex ma-4>
      <p class="display-1 text-uppercase">Loading...</p>
    </v-flex>
  </v-layout>
</template>
