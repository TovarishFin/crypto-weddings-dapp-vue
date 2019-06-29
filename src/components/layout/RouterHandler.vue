<template>
  <component :is="page" />
</template>

<script>
import { mapGetters } from 'vuex'
import NoEthereum from './NoEthereum'
import Loading from './Loading'
import TxPending from './TxPending'

/* eslint-disable vue/no-unused-components */
export default {
  components: {
    NoEthereum,
    Loading,
    TxPending
  },
  computed: {
    ...mapGetters([
      'providerReady',
      'loading',
      'hasBlockingPendingTransaction'
    ]),
    page() {
      switch (true) {
        case this.loading:
          return Loading

        case !this.providerReady:
          return NoEthereum

        case this.hasBlockingPendingTransaction:
          return TxPending

        case this.providerReady:
          return 'router-view'

        default:
          return Loading
      }
    }
  }
}
</script>
