<template>
  <span>
    <span v-if="userHasWedding">
      <p class="display-2">
        Wedding Options
      </p>

      <v-form @submit="validateAndUpdateUserPermissions" ref="ban-form">
        <qr-code-input
          v-model="addressToUpdate"
          label="address to ban/unban"
          :rules="addressRules"
          type="text"
          required
        />

        <v-radio-group v-model="permissionStatus">
          <v-radio label="unban" :value="false" />
          <v-radio label="ban" :value="true" />
        </v-radio-group>

        <v-btn flat class="primary-neon-button" type="submit">update</v-btn>
      </v-form>

      <v-form
        @submit="validateAndUpdateShouldHideGiftEvents"
        ref="hide-gift-events-form"
      >
        <v-radio-group v-model="shouldHideGiftEventsModel">
          <v-radio label="show" :value="false" />
          <v-radio label="hide" :value="true" />
        </v-radio-group>

        <v-btn flat class="primary-neon-button" type="submit">update</v-btn>
      </v-form>

      <v-form @submit="validateAndUpdateMinGiftAmount" ref="gift-amount-form">
        <p>current minimum gift amount: {{ userWedding.minGiftAmount }}</p>
        <v-text-field
          v-model="minGiftAmount"
          label="minimum gift amount in ether"
          type="number"
          required
        />

        <v-btn flat class="primary-neon-button" type="submit">update</v-btn>
      </v-form>
    </span>

    <span v-if="!userHasWedding">
      <p>You cannot set wedding settings if you do not have a wedding!</p>
    </span>
  </span>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import QrCodeInput from '@/components/QrCodeInput'

export default {
  components: {
    QrCodeInput
  },
  data() {
    return {
      addressToUpdate: '',
      permissionStatus: false,
      shouldHideGiftEventsModel: false,
      minGiftAmount: 0,
      addressRules: [v => this.isAddress(v) || 'must be a valid address']
    }
  },
  computed: {
    ...mapGetters(['userWedding', 'userWeddingCursor']),
    userHasWedding() {
      return (
        !!this.userWeddingCursor && this.userWeddingCursor !== this.addressZero
      )
    }
  },
  methods: {
    ...mapActions(['setPendingTransaction']),
    validateAndUpdateUserPermissions(e) {
      e.preventDefault()
      if (this.$refs['ban-form'].validate()) {
        this.setPendingTransaction({
          action: 'updateUserPermissions',
          payload: {
            user: this.addressToUpdate,
            banned: this.permissionStatus
          },
          description: `${this.permissionStatus ? 'ban user' : 'unban user'}`
        })

        this.refs['ban-form'].reset()
      }
    },
    validateAndUpdateMinGiftAmount(e) {
      e.preventDefault()
      this.setPendingTransaction({
        action: 'updateMinGiftAmount',
        payload: this.minGiftAmount,
        description: `update minimum gift amount to ${this.minGiftAmount} ether`
      })
    },
    validateAndUpdateShouldHideGiftEvents(e) {
      e.preventDefault()
      this.setPendingTransaction({
        action: 'updateShouldHideGiftEvents',
        payload: this.shouldHideGiftEventsModel,
        description: `${
          this.shouldHideGiftEventsModel
            ? 'hide wedding gift messages'
            : 'show wedding gift messages'
        }`
      })
    }
  }
}
</script>
