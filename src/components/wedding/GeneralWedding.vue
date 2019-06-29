<template>
  <span>
    <span v-if="isMarried">
      <v-img :src="selectedWedding.weddingPhoto" contain max-height="500">
        <template v-slot:placeholder>
          <v-layout fill-height align-center justify-center ma-0>
            <v-progress-circular indeterminate />
          </v-layout>
        </template>
      </v-img>
      <p class="display-1 text-sm-center mt-2">
        Married on {{ selectedWedding.dateMarried }}
      </p>
    </span>

    <v-layout wrap>
      <v-flex md6 pt-2 pb-2>
        <v-card color="primary">
          <v-card-title>
            <p class="display-1">{{ selectedWedding.p1Name }}</p>
          </v-card-title>

          <v-card-text class="title" font-weight-bold>
            {{
              selectedWedding.p1Answer
                ? `${selectedWedding.p1Name} has said yes!`
                : `${selectedWedding.p1Name} has not answered yet.`
            }}
          </v-card-text>

          <v-card-text class="subheading" font-weight-bold>
            {{ selectedWedding.p1Vows }}
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex md6 pt-2 pb-2>
        <v-card color="accent">
          <v-card-title>
            <p class="display-1">{{ selectedWedding.p2Name }}</p>
          </v-card-title>

          <v-card-text class="title" font-weight-bold>
            {{
              selectedWedding.p2Answer
                ? `${selectedWedding.p2Name} has said yes!`
                : `${selectedWedding.p2Name} has not answered yet.`
            }}
          </v-card-text>

          <v-card-text class="subheading" font-weight-bold>
            {{ selectedWedding.p2Vows }}
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

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
