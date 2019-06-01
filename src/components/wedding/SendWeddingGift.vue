<template>
  <v-form @submit="validateAndSendGift" ref="gift-form" class="pt-4 pb-4">
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
    <v-btn type="submit">
      send gift
    </v-btn>
  </v-form>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      giftValue: 0,
      giftMessage: '',
      valueRules: [v => !!v || 'value must be more than 0']
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
    }
  }
}
</script>
