<template>
  <v-text-field
    readonly
    :value="shorten ? (address ? shortenAddress(address) : '') : address"
    label="copy your address to clipboard"
    prepend-icon="mdi-content-copy"
    @click:prepend="copyAddressToClipboad"
  />
</template>
<script>
import { mapActions } from 'vuex'

export default {
  props: {
    shorten: Boolean,
    address: {
      type: String
    }
  },
  methods: {
    ...mapActions(['createNotification']),
    copyAddressToClipboad() {
      this.$copyText(this.address)
      this.createNotification('ethereum address copied to clipboard')
    }
  }
}
</script>
