<template>
  <span>
    <v-select
      class="pt-4"
      v-model="pathDerivationModel"
      :items="pathLevels"
      label="which account do you want to use from this mnemonic?"
    />

    <v-form @submit="setWallet" ref="wallet-form" class="pb-4">
      <mnemonic-display v-model="mnemonicModel" :readonly="!customMnemonic" />

      <eth-address-display
        :shorten="$vuetify.breakpoint.xs"
        :address="address"
      />

      <v-text-field
        v-model="password"
        label="password"
        placeholder=""
        :rules="passwordRules"
        type="password"
        required
      />
      <v-checkbox v-model="customMnemonic" label="use custom mnemonic" />

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
import MnemonicDisplay from '@/components/MnemonicDisplay'
import EthAddressDisplay from '@/components/EthAddressDisplay'

export default {
  components: {
    MnemonicDisplay,
    EthAddressDisplay
  },
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
    ...mapGetters(['address', 'mnemonic', 'pathDerivation']),
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
    ...mapActions(['encryptAndSaveWallet', 'generateMnemonic']),
    ...mapMutations(['setMnemonic', 'setPathDerivation']),
    clearWalletForm() {
      this.password = ''
      this.$refs['wallet-form'].resetValidation()
    },
    setWallet(e) {
      e.preventDefault()

      if (this.$refs['wallet-form'].validate()) {
        this.encryptAndSaveWallet(this.password)
      }
    }
  }
}
</script>
