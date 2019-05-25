<template>
  <v-layout column align-center>
    <v-flex xs4>
      <v-progress-circular
        indeterminate
        color="primary"
        :size="100"
        :width="10"
      />
    </v-flex>
    <v-flex ma-4>
      <p class="display-1 text-uppercase">Connecting to blockchain...</p>
    </v-flex>
  </v-layout>
</template>
