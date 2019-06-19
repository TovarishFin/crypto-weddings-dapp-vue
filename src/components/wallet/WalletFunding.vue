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
// TODO: show the balance to the user... and perhaps a warning if no balance
import { mapGetters, mapActions } from 'vuex'
import EthAddressDisplay from '@/components/EthAddressDisplay'

export default {
  components: {
    EthAddressDisplay
  },
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
    ...mapActions(['sweepEther']),
    clearSweepForm() {
      this.$refs['send-form'].reset()
    },
    validateAndSweepEther(e) {
      e.preventDefault()
      if (this.$refs['send-form'].validate()) {
        this.sweepEther(this.recipient)
        this.clearSweepForm()
      }
    }
  }
}
</script>
<style lang="styl" scoped>
.centered-img
  margin: auto
</style>
