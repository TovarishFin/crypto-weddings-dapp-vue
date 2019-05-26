<template>
  <v-dialog v-model="accountRequestOpenModel" persistent width="500">
    <v-card>
      <v-card-title class="headline primary" primary-title>
        Activate Account
      </v-card-title>

      <v-card-text>
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

      <v-divider v-if="!encryptedMnemonicExists"></v-divider>

      <v-form
        @submit="unlockWallet"
        v-if="encryptedMnemonicExists"
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
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="continueWithoutPermission" color="secondary">
          Don't Activate Account
        </v-btn>
        <v-btn
          v-if="encryptedMnemonicExists"
          @click="unlockWallet"
          color="primary"
        >
          Unlock Account
        </v-btn>
        <v-btn v-if="!encryptedMnemonicExists" color="primary" to="/wallet">
          Create Account
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
    ...mapGetters(['accountRequestOpen', 'encryptedMnemonicExists']),
    accountRequestOpenModel: {
      get() {
        return this.accountRequestOpen
      },
      set(accountRequestOpen) {
        this.setAccountRequestOpen(accountRequestOpen)
      }
    },
    // we leave this for now because we might want to enable metamask connections later as well
    metaMaskInstalled() {
      return !!window.web3 || !!window.ethereum
    }
  },
  methods: {
    ...mapActions(['setAccountRequestOpen', 'decryptAndLoadWallet']),
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
    if (this.encryptedMnemonicExists) {
      this.$nextTick(this.$refs.pass.focus)
    }
  }
}
</script>
