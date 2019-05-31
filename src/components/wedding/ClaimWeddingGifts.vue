<template>
  <span>
    <v-btn @click="claimWeddingGifts">
      claim wedding gifts
    </v-btn>
  </span>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['claimWeddingGifts'])
  }
}
</script>
