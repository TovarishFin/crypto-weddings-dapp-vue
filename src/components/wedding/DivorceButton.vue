<template>
  <v-btn flat class="secondary-neon-button" @click="confirmDivorce" icon>
    <v-icon>mdi-heart-broken</v-icon>
  </v-btn>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['setPendingTransaction']),
    confirmDivorce() {
      this.setPendingTransaction({
        action: 'divorce',
        description: 'submit a divorce',
        requireConfirmation: true
      })
    }
  }
}
</script>
