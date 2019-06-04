<template>
  <span>
    <v-form @submit="setWallet" ref="wallet-form" class="pt-4 pb-4">
      <v-text-field v-model="mnemonicModel" label="mnemonic" disabled />

      <v-text-field :value="address" label="address" disabled />

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
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  data() {
    return {
      customMnemonic: false,
      password: '',
      passwordRules: [v => !!v || 'must be non empty value'],
      pathLevels: [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13'
      ]
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
        return this.pathDerivation.split('/').slice(-1)[0]
      },
      set(pathLevel) {
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
  }
}
</script>
