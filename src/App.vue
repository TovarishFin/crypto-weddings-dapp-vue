<template>
  <v-app :dark="useDarkMode">
    <app-drawer />
    <app-toolbar />

    <v-content>
      <v-container fluid pa-0 class="full-height">
        <v-slide-y-transition mode="out-in">
          <router-handler />
        </v-slide-y-transition>
      </v-container>
    </v-content>

    <app-notifier />

    <account-request />
    <confirm-transaction />
    <warning-dialog />
    <app-transactions />

    <app-footer />
  </v-app>
</template>

<script>
import AppDrawer from '@/components/layout/AppDrawer'
import AppToolbar from '@/components/layout/AppToolbar'
import AppFooter from '@/components/layout/AppFooter'
import AppNotifier from '@/components/layout/AppNotifier'
import AccountRequest from '@/components/layout/AccountRequest'
import ConfirmTransaction from '@/components/layout/ConfirmTransaction'
import WarningDialog from '@/components/layout/WarningDialog'
import RouterHandler from '@/components/layout/RouterHandler'
import AppTransactions from '@/components/Transactions'
import store from '@/store'
import { mapGetters } from 'vuex'

export default {
  components: {
    AppDrawer,
    AppToolbar,
    AppFooter,
    AppNotifier,
    AccountRequest,
    ConfirmTransaction,
    WarningDialog,
    RouterHandler,
    AppTransactions
  },
  computed: {
    ...mapGetters(['useDarkMode'])
  },
  beforeCreate() {
    store.dispatch('bootstrapEth')
  }
}
</script>
<style lang="styl">
@import '~vuetify/src/stylus/settings/_variables'
.padded-element
  padding: $spacer

.full-height-container
  min-height: "calc(100vh - %s)" % ($toolbar-height + $footer-height)
.notifier
  position: fixed
  bottom: 20px
  left: 50%
  transform: translatex(-50%)

.warning-text
  color: red
</style>
