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
            {{ statusText(selectedWedding.p1Answer, selectedWedding.p1Name) }}
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
            {{ statusText(selectedWedding.p2Answer, selectedWedding.p2Name) }}
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
    },
    statusText(answer, name) {
      switch (true) {
        case !this.isMarried && !answer:
          return `${name} has not answered yet`

        case !this.isMarried && answer:
          return `${name} has said yes!`

        case this.isMarried && answer:
          return `${name} is happily married.`

        case this.isMarried && !answer:
          return `${name} has started a divorce.`

        default:
          return 'sorry a weird error occurred... try refreshing the page...'
      }
    }
  }
}
</script>
