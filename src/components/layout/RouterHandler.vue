<template>
  <component :is="page" />
</template>

<script>
import { mapGetters } from 'vuex'
import NoWeb3 from './NoWeb3.vue'
import NoAccount from './NoAccount.vue'

/* eslint-disable vue/no-unused-components */
export default {
  components: {
    NoWeb3,
    NoAccount
  },
  computed: {
    ...mapGetters([
      'coinbaseReady',
      'web3Ready',
      'ethReady',
      'hasGrantedWeb3Access'
    ]),
    page() {
      switch (true) {
        case !this.web3Ready || !this.ethReady:
          return NoWeb3

        case this.hasGrantedWeb3Access && !this.coinbaseReady:
          return NoAccount

        default:
          return 'router-view'
      }
    }
  }
}
</script>
