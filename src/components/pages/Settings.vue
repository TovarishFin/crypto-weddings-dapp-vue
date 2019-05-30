<template>
  <span>
    <v-select
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
  </span>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters(['network', 'gasLimit', 'availableNetworks']),
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
    }
  },
  methods: {
    // TODO: implement pathDerivation...
    ...mapMutations(['setNetwork', 'setGasLimit', 'setPathDerivation'])
  }
}
</script>
