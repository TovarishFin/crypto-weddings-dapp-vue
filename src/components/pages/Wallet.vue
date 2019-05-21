<template>
  <span>
    <v-form ref="wallet-form" class="pt-4 pb-4">
      <v-text-field :value="mnemonic" label="mnemonic" disabled />
      <v-text-field :value="address" label="address" disabled />

      <p class="display-1">password</p>
      <v-text-field
        v-model="password"
        label="password"
        placeholder=""
        :rules="passwordRules"
        type="text"
        required
      />
    </v-form>

    <v-btn @click="generateMnemonic">
      Generate New
    </v-btn>
    <v-btn @click="setWallet">
      Set Wallet
    </v-btn>
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
    ...mapGetters(['address', 'mnemonic', 'accountReady'])
  },
  methods: {
    ...mapActions(['generateMnemonic', 'encryptAndSaveWallet']),
    clearWalletForm() {
      this.$refs['wallet-form'].reset()
    },
    setWallet() {
      if (this.$refs['wallet-form'].validate()) {
        this.encryptAndSaveWallet(this.password)
        this.clearWalletForm()
      }
    }
  },
  mounted() {
    if (!this.accountReady) {
      this.generateMnemonic()
    }
  }
}
</script>
