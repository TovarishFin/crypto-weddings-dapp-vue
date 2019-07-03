<template>
  <v-text-field
    class="neon-input"
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
    },
    container: {
      type: null
    }
  },
  methods: {
    ...mapActions(['createNotification']),
    copyAddressToClipboad() {
      this.container
        ? this.$copyText(this.address, this.container)
        : this.$copyText(this.address)
      this.createNotification('ethereum address copied to clipboard')
    }
  }
}
</script>
<style lang="styl" scoped>
.neon-input
  >>> .v-icon:hover
    color: var(--v-accent-lighten2) !important
    text-shadow:
      0 0 1px var(--v-accent-lighten1),
      0 0 4px var(--v-accent-darken1)
  >>> .primary--text
    color: var(--v-primary-lighten2) !important
    text-shadow:
      0 0 1px var(--v-primary-lighten1),
      0 0 4px var(--v-primary-darken1)
  >>> .v-input__slot::after
    border-color: var(--v-primary-lighten2) !important
    box-shadow:
      0 0 2px var(--v-primary-lighten1),
      0 0 4px var(--v-primary-base),
      0 0 8px var(--v-primary-darken1),
      0 0 16px var(--v-primary-darken2),
      inset 0 0 2px var(--v-primary-lighten1),
      inset 0 0 4px var(--v-primary-base),
      inset 0 0 8px var(--v-primary-darken1)
  >>> .v-input__slot:hover::before,
  >>> .v-input__slot:active::before
    box-shadow:
      0 0 2px var(--v-primary-lighten1),
      0 0 4px var(--v-primary-base),
      0 0 8px var(--v-primary-darken1),
      0 0 16px var(--v-primary-darken2),
      inset 0 0 2px var(--v-primary-lighten1),
      inset 0 0 4px var(--v-primary-base),
      inset 0 0 8px var(--v-primary-darken1)
</style>
