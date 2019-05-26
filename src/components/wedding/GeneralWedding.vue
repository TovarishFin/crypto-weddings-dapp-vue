<template>
  <span>
    <v-timeline>
      <v-timeline-item v-for="n in 4" :key="n" large>
        <template v-slot:opposite>
          <span>
            TODO: make this work with events and use event log as "story"
          </span>
        </template>
        <v-card class="elevation-2">
          <v-card-title class="headline">event name</v-card-title>
          <v-card-text>
            this will have a log of events such as saying "i do", "creating the
            wedding", etc...
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </span>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['selectedWedding'])
  }
}
</script>
