<template>
  <v-app dark>
    <app-drawer />
    <app-toolbar />

    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <router-handler />
        </v-slide-y-transition>
      </v-container>
    </v-content>

    <app-notifier />

    <web3-request />
    <app-transactions />

    <app-footer />
  </v-app>
</template>

<script>
import AppDrawer from '@/components/layout/AppDrawer'
import AppToolbar from '@/components/layout/AppToolbar'
import AppFooter from '@/components/layout/AppFooter'
import AppNotifier from '@/components/layout/AppNotifier'
import Web3Request from '@/components/layout/Web3Request'
import RouterHandler from '@/components/layout/RouterHandler'
import AppTransactions from '@/components/Transactions'
import store from '@/store'

export default {
  components: {
    AppDrawer,
    AppToolbar,
    AppFooter,
    AppNotifier,
    Web3Request,
    RouterHandler,
    AppTransactions
  },
  beforeCreate() {
    store.dispatch('bootstrapEth')
  },
  watch: {
    $route() {
      const coinbaseReferrer = this.$route.query.ref
      if (this.isAddress(coinbaseReferrer)) {
        store.dispatch('setCoinbaseReferrer', coinbaseReferrer)
      }
    }
  }
}
</script>
