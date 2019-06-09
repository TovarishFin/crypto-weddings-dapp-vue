<template>
  <span>
    <v-text-field :value="mnemonic" label="mnemonic" readonly />

    <v-text-field :value="address" label="address" readonly />

    <v-form @submit="setWallet" ref="wallet-form" class="pt-4 pb-4">
      <v-text-field
        v-model="password"
        label="password"
        placeholder=""
        :rules="passwordRules"
        type="password"
        required
      />

      <v-btn @click="generateMnemonic">
        Generate New
      </v-btn>

      <v-btn type="submit">
        Set Wallet
      </v-btn>
    </v-form>
  </span>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      password: '',
      passwordRules: [v => !!v || 'must be non empty value']
    }
  },
  computed: {
    ...mapGetters(['address', 'mnemonic', 'accountReady', 'pathDerivation'])
  },
  methods: {
    ...mapActions(['generateMnemonic', 'encryptAndSaveWallet']),
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
