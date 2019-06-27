<template>
  <span>
    <mnemonic-display readonly :value="mnemonic" />

    <v-textarea
      :rows="$vuetify.breakpoint.xs ? 2 : 1"
      :value="mnemonic"
      label="mnemonic"
      type="password"
      readonly
    />

    <eth-address-display :shorten="$vuetify.breakpoint.xs" :address="address" />

    <v-form @submit="setWallet" ref="wallet-form" class="pb-4">
      <v-text-field
        autofocus
        v-model="password"
        label="password"
        placeholder=""
        :rules="passwordRules"
        type="password"
        required
      />

      <v-btn type="submit">
        Set Wallet
      </v-btn>
    </v-form>
  </span>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MnemonicDisplay from '@/components/MnemonicDisplay'
import EthAddressDisplay from '@/components/EthAddressDisplay'

export default {
  components: {
    MnemonicDisplay,
    EthAddressDisplay
  },
  data() {
    return {
      password: '',
      passwordRules: [
        v => v.length >= 10 || 'password must be at least 10 characters long'
      ]
    }
  },
  computed: {
    ...mapGetters(['address', 'mnemonic'])
  },
  methods: {
    ...mapActions(['encryptAndSaveWallet']),
    clearWalletForm() {
      this.$refs['wallet-form'].reset()
    },
    setWallet(e) {
      e.preventDefault()
      if (this.$refs['wallet-form'].validate()) {
        this.encryptAndSaveWallet(this.password)
        this.clearWalletForm()
      }
    }
  }
}
</script>
