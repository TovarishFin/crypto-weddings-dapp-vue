<template>
  <v-toolbar color="synthwave" app>
    <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>
    <v-toolbar-title v-text="name"></v-toolbar-title>
    <v-spacer />
    <v-progress-circular v-show="hasPendingTxs" indeterminate color="primary" />
    <v-btn
      flat
      class="secondary-neon-button"
      v-if="accountReady && $vuetify.breakpoint.smAndUp"
      @click="toggleShowTransactions"
    >
      {{ showTransactionsText }}
    </v-btn>
    <v-btn
      flat
      class="secondary-neon-button"
      v-if="!accountReady && $vuetify.breakpoint.smAndUp"
      @click="setAccountRequestOpen(true)"
    >
      activate account
    </v-btn>

    <v-btn
      flat
      class="primary-neon-button"
      v-if="accountReady && !$vuetify.breakpoint.smAndUp"
      @click="toggleShowTransactions"
      icon
    >
      <v-icon>
        mdi-format-list-bulleted
      </v-icon>
    </v-btn>
    <v-btn
      flat
      class="primary-neon-button"
      v-if="!accountReady && !$vuetify.breakpoint.smAndUp"
      @click="setAccountRequestOpen(true)"
      icon
    >
      <v-icon>
        mdi-account-plus
      </v-icon>
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
