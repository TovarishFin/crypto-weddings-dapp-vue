<template>
  <div class="loading-container">
    <div class="loading">
      <v-progress-circular
        indeterminate
        color="primary"
        :size="100"
        :width="10"
      />
      <p class="display-1 text-uppercase pa-5">Transaction Pending</p>
      <p class="body-1">
        This transaction must complete before using other features of the DApp.
      </p>
      <p class="body-1">
        Do not Reload the page right now.
      </p>
      <p class="caption">
        You can see your transaction
        <a :href="txLink(blockingPendingTransactionHash)" target="_blank">
          here
        </a>
      </p>

      <v-btn color="primary" @click="setBlockingPendingTransactionHash(null)">
        clear transaction
      </v-btn>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters(['blockingPendingTransactionHash'])
  },
  methods: {
    ...mapMutations(['setBlockingPendingTransactionHash']),
    txLink(txHash) {
      switch (this.network) {
        case 'ropsten':
          return `https://ropsten.etherscan.io/tx/${txHash}`
        case 'rinkeby':
          return `https://rinkeby.etherscan.io/tx/${txHash}`
        case 'kovan':
          return `https://kovan.etherscan.io/tx/${txHash}`
        case 'mainnet':
          return `https://etherscan.io/tx/${txHash}`
        default:
          return `https://etherscan.io/tx/${txHash}`
      }
    }
  }
}
</script>
<style lang="styl" scoped>
@import '~vuetify/src/stylus/settings/_variables'
.loading-container
  height: "calc(100vh - %s)" % ($toolbar-height + $footer-height)
  width: 100%

.loading
  text-align: center
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
</style>
