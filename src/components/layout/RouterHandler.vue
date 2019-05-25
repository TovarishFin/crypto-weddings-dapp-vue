<template>
  <component :is="page" />
</template>

<script>
import { mapGetters } from 'vuex'
import NoEthereum from './NoEthereum.vue'

/* eslint-disable vue/no-unused-components */
export default {
  components: {
    NoEthereum
  },
  computed: {
    ...mapGetters(['providerReady']),
    page() {
      return this.providerReady ? 'router-view' : NoEthereum
    }
  }
}
</script>
