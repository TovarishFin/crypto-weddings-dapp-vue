<template>
  <span>
    <v-text-field
      readonly
      :value="address"
      label="copy your address to clipboard"
      prepend-icon="mdi-content-copy"
      @click:prepend="copyAddressToClipboad"
    />

    <v-img :src="userQrCode" contain width="300">
      <template v-slot:placeholder>
        <v-layout fill-height align-center justify-center ma-0>
          <v-progress-circular indeterminate />
        </v-layout>
      </template>
    </v-img>

    <v-form @submit="validateAndSweepEther" ref="send-form" class="pt-4 pb-4">
      <v-text-field
        v-model="recipient"
        label="address to send ether to"
        :rules="recipientRules"
        type="text"
        required
      />

      <v-btn type="submit">
        sweep ether
      </v-btn>
    </v-form>
  </span>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      recipient: '',
      recipientRules: [
        v => this.isAddress(v) || 'recipient must be a valid ethereum address'
      ]
    }
  },
  computed: {
    ...mapGetters(['address', 'userBalance', 'userQrCode'])
  },
  methods: {
    ...mapActions(['sweepEther', 'createNotification']),
    clearSweepForm() {
      this.$refs['send-form'].reset()
    },
    validateAndSweepEther(e) {
      e.preventDefault()
      if (this.$refs['send-form'].validate()) {
        this.sweepEther(this.recipient)
        this.clearSweepForm()
      }
    },
    copyAddressToClipboad() {
      this.$copyText(this.address)
      this.createNotification('ethereum address copied to clipboard')
    }
  }
}
</script>
