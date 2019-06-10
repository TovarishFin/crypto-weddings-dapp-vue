<template>
  <v-bottom-sheet v-model="showTransactionsModel">
    <v-list>
      <v-subheader v-if="sentTxs.length === 0">
        No Transactions
      </v-subheader>
      <v-subheader v-if="pendingTxs.length > 0">
        Pending Transactions
      </v-subheader>
      <v-list-tile
        v-for="pendingTx in pendingTxs"
        :key="pendingTx.transactionHash"
        value="true"
        target="_blank"
        :href="txLink(pendingTx.transactionHash)"
      >
        <v-list-tile-title> {{ pendingTx.transactionHash }} </v-list-tile-title>
        <v-list-tile-sub-title>
          description: {{ pendingTx.description }}
        </v-list-tile-sub-title>
      </v-list-tile>
      <v-subheader v-if="completeTxs.length > 0">
        Completed Transactions
      </v-subheader>
      <v-list-tile
        v-for="completeTx in completeTxs"
        :key="completeTx.transactionHash"
        value="true"
        target="_blank"
        :href="txLink(completeTx.transactionHash)"
      >
        <v-list-tile-title>
          {{ completeTx.transactionHash }}
        </v-list-tile-title>
        <v-list-tile-sub-title>
          description: {{ completeTx.description }}
        </v-list-tile-sub-title>
      </v-list-tile>
      <v-subheader v-if="erroredTxs.length > 0">
        Errored Transactions
      </v-subheader>
      <v-list-tile
        v-for="errTx in erroredTxs"
        :key="errTx.transactionHash"
        value="true"
        target="_blank"
        :href="txLink(errTx.transactionHash)"
      >
        <v-list-tile-title>
          {{ errTx.transactionHash }}
        </v-list-tile-title>
        <v-list-tile-sub-title>
          description: {{ errTx.description }}
        </v-list-tile-sub-title>
      </v-list-tile>
    </v-list>
  </v-bottom-sheet>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'sentTxs',
      'pendingTxs',
      'completeTxs',
      'erroredTxs',
      'network',
      'showTransactions'
    ]),
    showTransactionsModel: {
      get() {
        return this.showTransactions
      },
      set(showTransactions) {
        this.setShowTransactions(showTransactions)
      }
    }
  },
  methods: {
    ...mapActions(['setShowTransactions']),
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
