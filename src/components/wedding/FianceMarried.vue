<template>
  <span>
    <p class="display-4">
      Happily Married on:
    </p>
    <p class="display-1">{{ userWedding.dateMarried }}</p>
    <v-img :src="userWedding.weddingPhoto" contain max-height="300">
      <template v-slot:placeholder>
        <v-layout fill-height align-center justify-center ma-0>
          <v-progress-circular indeterminate />
        </v-layout>
      </template>
    </v-img>

    <p v-if="giftsClaimable">
      You have a claimable gift balance of {{ userWedding.balance }} ether!
    </p>

    <v-list two-line subheader>
      <v-subheader>You</v-subheader>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>Has Accepted?</v-list-tile-title>
          <v-list-tile-sub-title>
            {{ userAnswer }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>Vows</v-list-tile-title>
          <v-list-tile-sub-title>
            {{ userVows }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-list two-line subheader>
      <v-subheader>{{ partnerName }}</v-subheader>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>Has Accepted?</v-list-tile-title>
          <v-list-tile-sub-title>
            {{ partnerAnswer }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>Vows</v-list-tile-title>
          <v-list-tile-sub-title>
            {{ partnerVows }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

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
