<template>
  <span>
    <p class="subheading mt-4">Your Current Balance is: 𝝣 {{ userBalance }}</p>

    <eth-address-display :shorten="$vuetify.breakpoint.xs" :address="address" />

    <p class="title text-xs-center text-sm-left">
      Your Address as a QR Code
    </p>

    <p class="subheading text-xs-center text-sm-left">
      use for easy address sharing
    </p>

    <v-img
      :class="$vuetify.breakpoint.xs ? 'centered-img' : ''"
      :src="userQrCode"
      width="300"
      contain
    >
    </v-img>

    <v-form @submit="validateAndSweepEther" ref="sweep-form" class="pt-4 pb-4">
      <qr-code-input
        v-model="sweepDestination"
        label="address sweep ether to"
        :rules="recipientRules"
        type="text"
        required
      />

      <v-btn type="submit">
        sweep ether
      </v-btn>
    </v-form>

    <v-form @submit="validateAndSendEther" ref="send-form" class="pt-4 pb-4">
      <qr-code-input
        v-model="recipient"
        label="address to send ether to"
        :rules="recipientRules"
        type="text"
        required
      />

      <v-text-field
        v-model="sendAmount"
        label="amount to send in ether"
        :rules="etherRules"
        type="text"
        required
      />

      <v-btn type="submit">
        send ether
      </v-btn>
    </v-form>
  </span>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { utils } from 'ethers'
import EthAddressDisplay from '@/components/EthAddressDisplay'
import QrCodeInput from '@/components/QrCodeInput'

export default {
  components: {
    EthAddressDisplay,
    QrCodeInput
  },
  data() {
    return {
      recipient: '',
      sweepDestination: '',
      sendAmount: '0.0',
      recipientRules: [
        v => this.isAddress(v) || 'recipient must be a valid ethereum address'
      ],
      etherRules: [
        v => this.validateEtherValue(v) || 'value must be more than 0'
      ]
    }
  },
  computed: {
    ...mapGetters(['address', 'userBalance', 'userQrCode'])
  },
  methods: {
    ...mapActions(['sweepEther', 'sendEther']),
    clearSweepForm() {
      this.$refs['sweep-form'].reset()
    },
    clearSendForm() {
      this.$refs['send-form'].reset()
    },
    validateAndSweepEther(e) {
      e.preventDefault()
      if (this.$refs['sweep-form'].validate()) {
        this.sweepEther(this.sweepDestination)
        this.clearSweepForm()
      }
    },
    validateAndSendEther(e) {
      e.preventDefault()
      if (this.$refs['send-form'].validate()) {
        this.sendEther({
          to: this.recipient,
          smallValue: this.sendAmount
        })
        this.clearSweepForm()
      }
    },
    validateEtherValue(value) {
      const valueString = value ? value.toString() : '0.0'
      const bigValue = utils.parseEther(valueString)

      return bigValue.gt(utils.parseEther('0.0'))
    }
  }
}
</script>
<style lang="styl" scoped>
.centered-img
  margin: auto
</style>
