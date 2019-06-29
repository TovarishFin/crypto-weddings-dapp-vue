<template>
  <span>
    <v-layout wrap>
      <v-flex md6 pt-2 pb-2>
        <v-card color="primary">
          <v-card-title>
            <p class="display-1">You</p>
          </v-card-title>

          <v-card-text class="title" font-weight-bold>
            {{
              userAnswer ? 'You have said yes!' : 'You have not answered yet.'
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
                ? `${partnerName} has said yes!`
                : `${partnerName} has not answered yet.`
            }}
          </v-card-text>

          <v-card-text class="subheading" font-weight-bold>
            {{ partnerVows }}
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-tabs grow v-model="tabsIndex">
      <v-tab ripple> Update Vows </v-tab>
      <v-tab ripple> Answer Proposal </v-tab>
      <v-tab-item> <update-vows /> </v-tab-item>
      <v-tab-item> <answer-proposal /> </v-tab-item>
    </v-tabs>
  </span>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import UpdateVows from '@/components/wedding/UpdateVows'
import AnswerProposal from '@/components/wedding/AnswerProposal'

export default {
  components: {
    UpdateVows,
    AnswerProposal
  },
  computed: {
    ...mapGetters(['userWedding', 'weddingInProgressTabs', 'address']),
    tabsIndex: {
      get() {
        return this.weddingInProgressTabs
      },
      set(index) {
        return this.setWeddingInProgressTabs(index)
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
    }
  },
  methods: {
    ...mapActions(['setWeddingInProgressTabs'])
  }
}
</script>
