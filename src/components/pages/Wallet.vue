<template>
  <span>
    <v-form ref="wallet-form" class="pt-4 pb-4">
      <v-text-field
        v-model="mnemonicModel"
        label="mnemonic"
        :disabled="!customMnemonic"
      />
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

    <v-checkbox v-model="customMnemonic" label="use custom mnemonic" />
    <v-btn @click="generateMnemonic">
      Generate New
    </v-btn>
    <v-btn @click="setWallet">
      Set Wallet
    </v-btn>
  </span>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  data() {
    return {
      customMnemonic: false,
      password: '',
      passwordRules: [v => !!v || 'must be non empty value']
    }
  },
  computed: {
    ...mapGetters(['address', 'mnemonic', 'accountReady']),
    mnemonicModel: {
      get() {
        return this.mnemonic
      },
      set(val) {
        this.setMnemonic(val)
      }
    }
  },
  methods: {
    ...mapActions(['generateMnemonic', 'encryptAndSaveWallet']),
    ...mapMutations(['setMnemonic']),
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
