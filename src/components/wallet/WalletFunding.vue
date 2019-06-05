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

    <v-form @submit="validateAndSendEther" ref="send-form" class="pt-4 pb-4">
      <v-text-field
        v-model="recipient"
        label="address to send ether to"
        :rules="recipientRules"
        type="text"
        required
      />

      <v-text-field
        v-model="smallValue"
        label="amount in ether to send"
        :rules="valueRules"
        type="text"
        required
      />

      <v-btn type="submit">
        send ether
      </v-btn>

      <v-btn @click="validateAndSweepEther">
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
      to: '',
      smallValue: 0,
      recipientRules: [
        v => this.isAddress(v) || 'recipient must be a valid ethereum address'
      ],
      valueRules: [v => parseFloat(v) > 0 || 'value must be greater than 0']
    }
  },
  computed: {
    ...mapGetters(['address', 'userBalance', 'userQrCode'])
  },
  methods: {
    ...mapActions(['sendEther', 'sweepEther', 'createNotification']),
    clearSendForm() {
      this.$refs['send-form'].reset()
    },
    validateAndSendEther(e) {
      e.preventDefault()
      if (this.$refs['send-form'].validate()) {
        const { recipient: to, smallValue } = this
        this.sendEther({ to, smallValue })

        this.clearSendForm()
      }
    },
    validateAndSweepEther() {
      this.sweepEther(this.recipient)
    },
    copyAddressToClipboad() {
      this.$copyText(this.address)
      this.createNotification('ethereum address copied to clipboard')
    }
  }
}
</script>
