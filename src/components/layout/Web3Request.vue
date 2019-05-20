<template>
  <v-dialog v-model="web3RequestOpenModel" persistent width="500">
    <v-card>
      <v-card-title class="headline primary" primary-title>
        Enable MetaMask
      </v-card-title>

      <v-card-text>
        <p class="subheading" v-if="metaMaskInstalled">
          This is a Decentralized Application. It needs <b>MetaMask</b> in order
          to interact with the blockchain. Please click
          <b>"ENABLE METAMASK"</b> below. You will be prompted by MetaMask,
          click confirm and you will be ready to go.
        </p>

        <p class="subheading" v-if="!metaMaskInstalled">
          This is a Decentralized Application. It needs <b>MetaMask</b> in order
          to interact with the blockchain. Please go to
          <a target="_blank" href="https://metamask.io/">metamask.io</a> and
          install MetaMask. Once finished, refresh the page.
        </p>

        <p class="subheading">
          If you do not wish to interact with anything and simply want to look
          around, feel free to click "Don't Enable/Install MetaMask". You can
          Enable at any time by clicking the "Enable MetaMask" button at the top
          right of the screen.
        </p>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="continueWithoutPermission" color="secondary">
          Don't Enable/Install MetaMask
        </v-btn>
        <v-btn
          v-if="!metaMaskInstalled"
          color="primary"
          href="https://metamask.io"
          target="_blank"
        >
          Install MetaMask
        </v-btn>
        <v-btn
          v-if="!!metaMaskInstalled"
          @click="continueWithPermission"
          color="primary"
        >
          Enable MetaMask
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['web3RequestOpen']),
    web3RequestOpenModel: {
      get() {
        return this.web3RequestOpen
      },
      set(web3RequestOpen) {
        this.setWeb3RequestOpen(web3RequestOpen)
      }
    },
    metaMaskInstalled() {
      return !!window.web3 || !!window.ethereum
    }
  },
  methods: {
    ...mapActions(['setWeb3RequestOpen', 'getWeb3Access']),
    continueWithPermission() {
      this.getWeb3Access()
      this.setWeb3RequestOpen(false)
    },
    continueWithoutPermission() {
      this.setWeb3RequestOpen(false)
    }
  }
}
</script>
