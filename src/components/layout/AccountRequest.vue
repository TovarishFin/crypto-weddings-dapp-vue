<template>
  <v-dialog
    :fullscreen="$vuetify.breakpoint.xsOnly"
    v-model="accountRequestOpenModel"
    width="500"
    persistent
  >
    <v-card>
      <v-card-title class="headline primary" primary-title>
        Activate Account
      </v-card-title>

      <v-card-text v-if="!useMetaMask">
        <v-switch
          v-if="metaMaskInstalled"
          v-model="useMetaMaskModel"
          :label="metamaskMessage"
        />
        <p class="subheading" v-if="encryptedMnemonicExists">
          An encrypted account has been detected. Please enter your password to
          continue.
        </p>

        <p class="subheading" v-if="!encryptedMnemonicExists">
          You need to setup an account in order to do stuff.
        </p>

        <p class="subheading">
          If you do not wish to interact with anything and simply want to look
          around, feel free to click "Don't Activate". You can Activate at any
          time by clicking the "Activate Account" button at the top right of the
          screen.
        </p>
      </v-card-text>
      <v-card-text v-if="useMetaMask">
        <v-switch
          v-if="metaMaskInstalled"
          v-model="useMetaMaskModel"
          :label="metamaskMessage"
        />
        <p class="subheading">
          In order to use MetMask you need to give permission. Click "Activate
          MetaMask" below.
        </p>
      </v-card-text>

      <v-form
        @submit="unlockWallet"
        v-show="encryptedMnemonicExists && !useMetaMask"
        ref="password-form"
        class="pa-2"
      >
        <v-text-field
          outline
          v-model="password"
          label="password"
          placeholder=""
          :rules="passwordRules"
          type="password"
          ref="pass"
          required
        />
      </v-form>
      <v-card-actions v-if="!useMetaMask">
        <v-btn
          flat
          class="secondary-neon-button"
          @click="continueWithoutPermission"
        >
          Don't Activate
        </v-btn>
        <v-btn
          flat
          class="primary-neon-button"
          v-if="encryptedMnemonicExists"
          @click="unlockWallet"
        >
          Unlock Account
        </v-btn>
        <v-btn
          flat
          class="primary-neon-button"
          @click="setAccountRequestOpen(false)"
          v-if="!encryptedMnemonicExists"
          color="primary"
          to="/wallet"
        >
          Create Account
        </v-btn>
      </v-card-actions>
      <v-card-actions v-if="useMetaMask">
        <v-btn
          flat
          class="secondary-neon-button"
          @click="continueWithoutPermission"
        >
          Don't Activate
        </v-btn>

        <v-btn flat class="primary-neon-button" @click="setupWeb3Provider">
          activate MetaMask
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  data() {
    return {
      password: '',
      passwordRules: [v => !!v || 'must be non empty value']
    }
  },
  computed: {
    ...mapGetters([
      'accountRequestOpen',
      'encryptedMnemonicExists',
      'useMetaMask'
    ]),
    accountRequestOpenModel: {
      get() {
        return this.accountRequestOpen
      },
      set(accountRequestOpen) {
        this.setAccountRequestOpen(accountRequestOpen)
      }
    },
    useMetaMaskModel: {
      get() {
        return this.useMetaMask
      },
      set(useMetaMask) {
        this.setUseMetaMask(useMetaMask)
      }
    },
    metaMaskInstalled() {
      return !!window.web3 || !!window.ethereum
    },
    metamaskMessage() {
      return this.useMetaMask ? 'disable MetaMask' : 'enable MetaMask'
    }
  },
  methods: {
    ...mapActions([
      'setAccountRequestOpen',
      'decryptAndLoadWallet',
      'setupWeb3Provider'
    ]),
    ...mapMutations(['setUseMetaMask']),
    unlockWallet(e) {
      e.preventDefault()
      if (this.$refs['password-form'].validate()) {
        this.decryptAndLoadWallet(this.password)
        this.clearWalletForm()
      }
    },
    continueWithoutPermission() {
      this.setAccountRequestOpen(false)
    },
    clearWalletForm() {
      this.$refs['password-form'].reset()
    }
  },
  mounted() {
    if (this.encryptedMnemonicExists && !this.useMetaMask) {
      this.$nextTick(this.$refs.pass.focus)
    }
  }
}
</script>
