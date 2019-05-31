<template>
  <v-dialog v-model="confirmTransactionModel" persistent width="500">
    <v-card v-if="userHasGas">
      <v-card-title class="headline primary" primary-title>
        Confirm Ethereum Transaction
      </v-card-title>

      <v-card-text>
        <p class="subheading">
          Please confirm that you wish to create an ethereum transaction to do
          the following:
        </p>

        <p class="title">
          {{ pendingActionDescription }}
        </p>

        <p class="subheading">
          This is your last chance to cancel.
        </p>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="confirmTransaction" color="primary">
          Confirm
        </v-btn>
        <v-btn @click="cancelTransaction" color="cancel">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-if="!userHasGas">
      <v-card-title class="headline primary" primary-title>
        You Need Ether to Use Ethereum!
      </v-card-title>

      <v-card-text>
        <p class="subheading">
          Send ether to your account either through the qr code below or direcly
          using the address.
        </p>
        <v-img :src="userQrCode" />
        <p class="subheading">address: {{ address }}</p>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :href="buyEthLink" target="_blank" color="primary">
          Buy Ether from X
        </v-btn>
        <v-btn @click="cancelTransaction" color="cancel">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      buyEthLink:
        'https://duckduckgo.com/?q=buy+ether+with+credit+card&t=ffab&ia=web'
    }
  },
  computed: {
    ...mapGetters([
      'confirmTransactionOpen',
      'pendingActionDescription',
      'pendingPayload',
      'userHasGas',
      'userQrCode',
      'address'
    ]),
    confirmTransactionModel: {
      get() {
        return this.confirmTransactionOpen
      },
      set(open) {
        this.setConfirmTransactionOpen(open)
      }
    }
  },
  methods: {
    ...mapActions([
      'setConfirmTransactionOpen',
      'confirmTransaction',
      'cancelTransaction'
    ])
  }
}
</script>
