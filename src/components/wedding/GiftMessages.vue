<template>
  <span>
    <p v-if="selectedWedding.shouldHideGiftEvents">
      wedding gift messages disabled by wedding owners
    </p>
    <span v-if="!selectedWedding.shouldHideGiftEvents">
      <v-checkbox v-model="showMessages" label="show messages" />
      <v-list two-line subheader v-if="showMessages">
        <v-subheader>Gift Messages</v-subheader>

        <v-list-tile
          v-for="(giftEvent, i) in selectedWedding.giftEvents"
          :key="`${giftEvent.gifter}-${i}`"
        >
          <v-list-tile-content>
            <v-list-tile-title>
              from address: {{ giftEvent.gifter }}
            </v-list-tile-title>
            <v-list-tile-sub-title>
              {{ giftEvent.message }}
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </span>
  </span>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      showMessages: true
    }
  },
  computed: {
    ...mapGetters(['selectedWedding'])
  }
}
</script>
