<template>
  <v-textarea
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
