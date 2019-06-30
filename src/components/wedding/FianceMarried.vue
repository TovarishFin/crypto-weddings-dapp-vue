<template>
  <span>
    <v-img :src="userWedding.weddingPhoto" contain max-height="500">
      <template v-slot:placeholder>
        <v-layout fill-height align-center justify-center ma-0>
          <v-progress-circular indeterminate />
        </v-layout>
      </template>
    </v-img>
    <p class="display-1 text-sm-center mt-2">
      Married on {{ userWedding.dateMarried }}
    </p>

    <p v-if="giftsClaimable">
      You have a claimable gift balance of {{ userWedding.balance }} ether!
    </p>

    <v-layout wrap>
      <v-flex md6 pt-2 pb-2>
        <v-card color="primary">
          <v-card-title>
            <p class="display-1">You</p>
          </v-card-title>

          <v-card-text class="title" font-weight-bold>
            {{
              userAnswer
                ? 'You are happily married.'
                : 'You have started a divorce.'
            }}
          </v-card-text>

          <v-card-text class="subheading" font-weight-bold>
            {{ userVows }}
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex md6 pt-2 pb-2>
        <v-card color="accent">
          <v-card-title>
            <p class="display-1">{{ partnerName }}</p>
          </v-card-title>

          <v-card-text class="title" font-weight-bold>
            {{
              partnerAnswer
                ? `${partnerName} is happily married.`
                : `${partnerName} has started a divorce.`
            }}
          </v-card-text>

          <v-card-text class="subheading" font-weight-bold>
            {{ partnerVows }}
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-tabs grow v-model="tabsIndex">
      <v-tab ripple>Set Wedding Photo</v-tab>
      <v-tab v-if="giftsClaimable" ripple>Claim Wedding Gifts</v-tab>
      <v-tab-item> <update-wedding-photo /> </v-tab-item>
      <v-tab-item v-if="giftsClaimable"> <claim-wedding-gifts /> </v-tab-item>
    </v-tabs>
    <divorce-button />
  </span>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import UpdateWeddingPhoto from './UpdateWeddingPhoto'
import ClaimWeddingGifts from './ClaimWeddingGifts'
import DivorceButton from './DivorceButton'

export default {
  components: {
    UpdateWeddingPhoto,
    ClaimWeddingGifts,
    DivorceButton
  },
  computed: {
    ...mapGetters(['userWedding', 'weddingMarriedTabs', 'address']),
    tabsIndex: {
      get() {
        return this.weddingMarriedTabs
      },
      set(index) {
        return this.setWeddingMarriedTabs(index)
      }
    },
    userIsPartner1() {
      return this.address === this.userWedding.partner1
    },
    userAnswer() {
      const { p1Answer, p2Answer } = this.userWedding
      return this.userIsPartner1 ? p1Answer : p2Answer
    },
    userVows() {
      const { p1Vows, p2Vows } = this.userWedding
      return this.userIsPartner1 ? p1Vows : p2Vows
    },
    partnerAnswer() {
      const { p1Answer, p2Answer } = this.userWedding
      return this.userIsPartner1 ? p2Answer : p1Answer
    },
    partnerVows() {
      const { p1Vows, p2Vows } = this.userWedding
      return this.userIsPartner1 ? p2Vows : p1Vows
    },
    partnerName() {
      const { p1Name, p2Name } = this.userWedding
      return this.userIsPartner1 ? p2Name : p1Name
    },
    giftsClaimable() {
      return parseFloat(this.userWedding.balance) > 0
    }
  },
  methods: {
    ...mapMutations(['setWeddingMarriedTabs'])
  }
}
</script>
