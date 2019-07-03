<template>
  <v-textarea
    class="neon-input"
    :rows="$vuetify.breakpoint.xs ? 2 : 1"
    :value="hideableText"
    :readonly="readonly"
    :disabled="disabled"
    prepend-icon="mdi-content-copy"
    @click:prepend="copyMnemonicToClipboad"
    :append-icon="showIcon"
    @click:append="toggleShow"
    label="mnemonic"
    @input="handleInput"
  />
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    readonly: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    },
    value: {
      type: String
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    ...mapActions(['createNotification']),
    toggleShow() {
      this.show = !this.show
    },
    copyMnemonicToClipboad() {
      this.container
        ? this.$copyText(this.value, this.container)
        : this.$copyText(this.value)
      this.createNotification('mnemonic copied to clipboard')
    },
    handleInput(input) {
      this.$emit('input', input)
    }
  },
  computed: {
    showIcon() {
      return this.show ? 'mdi-eye-off' : 'mdi-eye'
    },
    hideableText() {
      return this.show ? this.value : 'mnemonic hidden click right icon to show'
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
