<template>
  <v-toolbar app>
    <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>
    <v-toolbar-title v-text="name"></v-toolbar-title>
    <v-spacer />
    <v-progress-circular v-show="hasPendingTxs" indeterminate color="primary" />
    <v-btn
      v-if="accountReady"
      @click="toggleShowTransactions"
      color="secondary"
    >
      {{ showTransactionsText }}
    </v-btn>
    <v-btn
      v-if="!accountReady"
      @click="setAccountRequestOpen(true)"
      color="secondary"
    >
      activate account
    </v-btn>
  </v-toolbar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'name',
      'hasPendingTxs',
      'showTransactions',
      'accountReady'
    ]),
    showTransactionsText() {
      return this.showTransactions
        ? `hide ${this.hasPendingTxs ? ' pending' : ''} transactions`
        : `show ${this.hasPendingTxs ? ' pending' : ''} transactions`
    }
  },
  methods: {
    ...mapActions([
      'toggleDrawer',
      'setShowTransactions',
      'setAccountRequestOpen'
    ]),
    toggleShowTransactions() {
      this.setShowTransactions(!this.showTransactions)
    }
  }
}
</script>
