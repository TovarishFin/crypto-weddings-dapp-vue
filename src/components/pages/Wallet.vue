<template>
  <div class="padded-element">
    <v-tabs color="synthwaveLight" v-if="!useMetaMask" grow v-model="tabsIndex">
      <v-tab ripple>Wallet</v-tab>
      <v-tab ripple>Settings</v-tab>
      <v-tab v-if="accountReady" ripple>Funding</v-tab>
      <v-tab-item> <wallet-basic /> </v-tab-item>
      <v-tab-item> <wallet-settings /> </v-tab-item>
      <v-tab-item v-if="accountReady"> <wallet-funding /> </v-tab-item>
    </v-tabs>
    <span v-if="useMetaMask" class="display-2">
      <p class="display-2">
        Built in Wallet Disabled
      </p>

      <p></p>
      <p class="body-1">
        Turn off <b class="accent--text">MetaMask</b> in
        <router-link to="/settings">settings</router-link> to access the built
        in wallet.
      </p>

      <p></p
    ></span>
  </div>
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
    ...mapGetters(['walletTabs', 'accountReady', 'useMetaMask']),
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
