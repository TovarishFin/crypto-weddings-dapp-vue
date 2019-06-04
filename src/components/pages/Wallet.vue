<template>
  <span>
    <v-tabs grow v-model="tabsIndex">
      <v-tab ripple>Wallet</v-tab>
      <v-tab ripple>Settings</v-tab>
      <v-tab ripple>Funding</v-tab>
      <v-tab-item> <wallet-basic /> </v-tab-item>
      <v-tab-item> <wallet-settings /> </v-tab-item>
      <v-tab-item> <wallet-funding /> </v-tab-item>
    </v-tabs>
  </span>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import WalletBasic from '@/components/wallet/WalletBasic'
import WalletSettings from '@/components/wallet/WalletSettings'
import WalletFunding from '@/components/wallet/WalletFunding'

export default {
  components: {
    WalletBasic,
    WalletSettings,
    WalletFunding
  },
  computed: {
    ...mapGetters(['walletTabs', 'accountReady']),
    tabsIndex: {
      get() {
        return this.walletTabs
      },
      set(index) {
        return this.setWalletTabs(index)
      }
    }
  },
  methods: {
    ...mapActions(['setWalletTabs', 'generateMnemonic'])
  },
  mounted() {
    if (!this.accountReady) {
      this.generateMnemonic()
    }
  }
}
</script>
