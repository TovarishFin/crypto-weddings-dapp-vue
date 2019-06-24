<template>
  <component :is="page" />
</template>

<script>
import { mapGetters } from 'vuex'
import NoEthereum from './NoEthereum.vue'
import Loading from './Loading.vue'

/* eslint-disable vue/no-unused-components */
export default {
  components: {
    NoEthereum,
    Loading
  },
  computed: {
    ...mapGetters(['providerReady', 'loading']),
    page() {
      switch (true) {
        case this.loading:
          return Loading

        case !this.providerReady:
          return NoEthereum

        case this.providerReady:
          return 'router-view'

        default:
          return Loading
      }
    }
  }
}
</script>
