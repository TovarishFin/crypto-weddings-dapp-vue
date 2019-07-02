<template>
  <v-app :dark="useDarkMode" class="synthwave">
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
    RouterHandler,
    AppTransactions
  },
  computed: {
    ...mapGetters(['useDarkMode', 'network'])
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

/* neon text */
.primary-neon
  color: var(--v-primary-lighten2)
  text-shadow:
    0 0 3px var(--v-primary-lighten1),
    0 0 6px var(--v-primary-base),
    0 0 12px var(--v-primary-darken1),
    0 0 24px var(--v-primary-darken2)

.accent-neon
  color: var(--v-accent-lighten2)
  text-shadow:
    0 0 1.5px var(--v-accent-lighten1),
    0 0 3px var(--v-accent-base),
    0 0 6px var(--v-accent-darken1),
    0 0 12px var(--v-accent-darken2)

.primary-neon-button
  border: 1px solid var(--v-primary-lighten2)
  border-radius: 5px
  box-shadow:
    0 0 2px var(--v-primary-lighten1),
    0 0 4px var(--v-primary-base),
    0 0 8px var(--v-primary-darken1),
    0 0 16px var(--v-primary-darken2),
    inset 0 0 2px var(--v-primary-lighten1),
    inset 0 0 4px var(--v-primary-base),
    inset 0 0 8px var(--v-primary-darken1)
  >.v-btn__content
    color: var(--v-primary-lighten2)
    text-shadow:
      0 0 1px var(--v-primary-lighten1),
      0 0 2px var(--v-primary-base),
      0 0 4px var(--v-primary-darken1),
      0 0 8px var(--v-primary-darken2)

.secondary-neon-button
  border: 1px solid var(--v-secondary-lighten2)
  border-radius: 5px
  box-shadow:
    0 0 2px var(--v-secondary-lighten1),
    0 0 4px var(--v-secondary-base),
    0 0 8px var(--v-secondary-darken1),
    0 0 16px var(--v-secondary-darken2),
    inset 0 0 2px var(--v-secondary-lighten1),
    inset 0 0 4px var(--v-secondary-base),
    inset 0 0 8px var(--v-secondary-darken1)
  >.v-btn__content
    color: var(--v-secondary-lighten2)
    text-shadow:
      0 0 1px var(--v-secondary-lighten1),
      0 0 2px var(--v-secondary-base),
      0 0 4px var(--v-secondary-darken1),
      0 0 8px var(--v-secondary-darken2)

.accent-neon-button
  border: 1px solid var(--v-accent-lighten2)
  border-radius: 5px
  box-shadow:
    0 0 2px var(--v-accent-lighten1),
    0 0 4px var(--v-accent-base),
    0 0 8px var(--v-accent-darken1),
    0 0 16px var(--v-accent-darken2),
    inset 0 0 2px var(--v-accent-lighten1),
    inset 0 0 4px var(--v-accent-base),
    inset 0 0 8px var(--v-accent-darken1)
  >.v-btn__content
    color: var(--v-accent-lighten2)
    text-shadow:
      0 0 1px var(--v-accent-lighten1),
      0 0 2px var(--v-accent-base),
      0 0 4px var(--v-accent-darken1),
      0 0 8px var(--v-accent-darken2)
</style>
