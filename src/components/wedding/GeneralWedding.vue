<template>
  <span>
    <span v-if="isMarried">
      <p class="display-4">
        Happily Married on:
      </p>
      <p class="display-1">{{ selectedWedding.dateMarried }}</p>
      <v-img :src="selectedWedding.weddingPhoto" contain max-height="300">
        <template v-slot:placeholder>
          <v-layout fill-height align-center justify-center ma-0>
            <v-progress-circular indeterminate />
          </v-layout>
        </template>
      </v-img>
    </span>

    <v-list two-line subheader>
      <v-subheader>{{ selectedWedding.p1Name }}</v-subheader>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>Has Accepted?</v-list-tile-title>
          <v-list-tile-sub-title>
            {{ selectedWedding.p1Answer }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>Vows</v-list-tile-title>
          <v-list-tile-sub-title>
            {{ selectedWedding.p1Vows }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-list two-line subheader>
      <v-subheader>{{ selectedWedding.p2Name }}</v-subheader>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>Has Accepted?</v-list-tile-title>
          <v-list-tile-sub-title>
            {{ selectedWedding.p2Answer }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>Vows</v-list-tile-title>
          <v-list-tile-sub-title>
            {{ selectedWedding.p2Vows }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <send-wedding-gift />
    <gift-messages />
  </span>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import SendWeddingGift from '@/components/wedding/SendWeddingGift.vue'
import GiftMessages from '@/components/wedding/GiftMessages.vue'

export default {
  components: {
    SendWeddingGift,
    GiftMessages
  },
  data() {
    return {
      giftValue: 0,
      giftMessage: '',
      valueRules: [v => !!v || 'value must be more than 0']
    }
  },
  computed: {
    ...mapGetters(['selectedWedding']),
    isMarried() {
      return this.selectedWedding.stage <= 2 ? false : true
    }
  },
  methods: {
    ...mapActions(['sendWeddingGift']),
    clearGiftForm() {
      this.$refs['gift-form'].reset()
    },
    validateAndSendGift() {
      if (this.$refs['gift-form'].validate()) {
        this.sendWeddingGift({
          message: this.giftMessage,
          smallValue: this.giftValue
        })
        this.clearGiftForm()
      }
    }
  }
}
</script>
