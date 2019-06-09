<template>
  <span>
    <v-select
      :disabled="useMetaMask"
      v-model="networkModel"
      :items="availableNetworks"
      label="select the network you want to use"
    />

    <v-layout row wrap>
      <v-flex xs9>
        <v-slider
          v-model="gasLimitModel"
          min="21000"
          max="8000000"
          prepend-icon="mdi-gas-station"
        />
      </v-flex>
      <v-flex xs3>
        <v-text-field v-model="gasLimitModel" class="mt-0" type="number" />
      </v-flex>
    </v-layout>

    <v-switch
      v-if="metaMaskInstalled"
      v-model="useMetaMaskModel"
      :label="metamaskMessage"
    />

    <v-switch
      v-model="skipConfirmationsModel"
      :label="skipConfirmationsMessage"
    />

    <v-text-field
      v-model="metaMaskPollingIntervalModel"
      label="interval in milliseconds to check metamask changes"
      type="number"
    />

    <v-text-field
      v-model="customGasPriceModel"
      label="custom gas price in gwei for txs"
      type="number"
    />

    <p class="body-1">
      You can check gas prices
      <a target="_blank" href="https://www.ethgasstation.info/">here</a>
    </p>

    <v-btn color="secondary" @click="clearTransactions">
      clear transaction history
    </v-btn>
  </span>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'network',
      'gasLimit',
      'customGasPrice',
      'availableNetworks',
      'useMetaMask',
      'metaMaskPollingInterval',
      'skipConfirmations'
    ]),
    useMetaMaskModel: {
      get() {
        return this.useMetaMask
      },
      set(useMetaMask) {
        this.setUseMetaMask(useMetaMask)
      }
    },
    networkModel: {
      get() {
        return this.network
      },
      set(network) {
        this.setNetwork(network)
      }
    },
    gasLimitModel: {
      get() {
        return this.gasLimit
      },
      set(gasLimit) {
        this.setGasLimit(gasLimit)
      }
    },
    customGasPriceModel: {
      get() {
        return this.customGasPrice
      },
      set(customGasPrice) {
        this.setCustomGasPrice(customGasPrice)
      }
    },
    metaMaskPollingIntervalModel: {
      get() {
        return this.metaMaskPollingInterval
      },
      set(metaMaskPollingInterval) {
        this.setMetaMaskPollingInterval(metaMaskPollingInterval)
      }
    },
    skipConfirmationsModel: {
      get() {
        return this.skipConfirmations
      },
      set(skipConfirmations) {
        this.setSkipConfirmations(skipConfirmations)
      }
    },
    metaMaskInstalled() {
      return !!window.web3 || !!window.ethereum
    },
    metamaskMessage() {
      return this.useMetaMask ? 'disable MetaMask' : 'enable MetaMask'
    },
    skipConfirmationsMessage() {
      return this.skipConfirmations
        ? 'do not skip confirmations'
        : 'skip confirmations'
    }
  },
  methods: {
    ...mapMutations([
      'setNetwork',
      'setGasLimit',
      'setCustomGasPrice',
      'setPathDerivation',
      'setUseMetaMask',
      'setMetaMaskPollingInterval'
    ]),
    ...mapActions(['clearTransactions', 'setSkipConfirmations'])
  }
}
</script>
