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
    <v-flex xs12>
      <p class="display-1 text-uppercase">Web3 is Loading...</p>
    </v-flex>
  </v-layout>
</template>
