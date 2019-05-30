<template>
  <span>
    <v-form ref="wallet-form" class="pt-4 pb-4">
      <v-text-field
        v-model="mnemonicModel"
        label="mnemonic"
        :disabled="!customMnemonic"
      />
      <v-text-field :value="address" label="address" disabled />

      <v-text-field
        v-model="password"
        label="password"
        placeholder=""
        :rules="passwordRules"
        type="password"
        required
      />
      <v-checkbox v-model="customMnemonic" label="use custom mnemonic" />
      <v-select
        v-model="pathDerivationModel"
        :items="pathLevels"
        label="which account do you want to use?"
      />
      <v-btn @click="generateMnemonic">
        Generate New
      </v-btn>
      <v-btn @click="setWallet">
        Set Wallet
      </v-btn>
    </v-form>
  </span>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  data() {
    return {
      customMnemonic: false,
      password: '',
      passwordRules: [v => !!v || 'must be non empty value'],
      pathLevels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  },
  computed: {
    ...mapGetters(['address', 'mnemonic', 'accountReady', 'pathDerivation']),
    mnemonicModel: {
      get() {
        return this.mnemonic
      },
      set(val) {
        this.setMnemonic(val)
      }
    },
    pathDerivationModel: {
      get() {
        return parseInt(this.pathDerivation.slice(-1))
      },
      set(pathLevel) {
        this.pathLevel = pathLevel
        this.setPathDerivation(`m/44'/60'/0'/0/${pathLevel}`)
      }
    }
  },
  methods: {
    ...mapActions(['generateMnemonic', 'encryptAndSaveWallet']),
    ...mapMutations(['setMnemonic', 'setPathDerivation']),
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
