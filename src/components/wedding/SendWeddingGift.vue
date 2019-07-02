<template>
  <v-form @submit="validateAndSendGift" ref="gift-form" class="pt-4 pb-4">
    <p class="body-1">
      minimum gift amount: {{ selectedWedding.minGiftAmount }}
    </p>
    <v-text-field
      v-model="giftMessage"
      label="message (optional)"
      type="text"
    />

    <v-text-field
      v-model="giftValue"
      label="value in ether to send"
      :rules="valueRules"
      type="number"
      required
    />
    <v-btn flat class="secondary-neon-button" type="submit">
      send gift
    </v-btn>
  </v-form>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { utils } from 'ethers'

export default {
  data() {
    return {
      giftValue: 0,
      giftMessage: '',
      valueRules: [v => this.checkValue(v) || 'value must be more than 0']
    }
  },
  methods: {
    ...mapActions(['setPendingTransaction']),
    clearGiftForm() {
      this.$refs['gift-form'].reset()
    },
    validateAndSendGift(e) {
      e.preventDefault()
      if (this.$refs['gift-form'].validate()) {
        this.setPendingTransaction({
          action: 'sendWeddingGift',
          payload: {
            message: this.giftMessage,
            smallValue: this.giftValue
          },
          description: `send a wedding gift of: ${
            this.giftValue
          } ether with a message as: ${this.giftMessage}.`
        })
        this.clearGiftForm()
      }
    },
    checkValue(value = '0.0') {
      const valueString = value.toString()
      const bigValue = utils.parseEther(valueString)

      const { minGiftAmount } = this.selectedWedding
      const bigMinGiftAmount = minGiftAmount
        ? utils.parseEther(minGiftAmount)
        : utils.parseEther('0.0')

      return bigValue.gte(bigMinGiftAmount)
    }
  },
  computed: {
    ...mapGetters(['selectedWedding'])
  }
}
</script>
