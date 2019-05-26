<template>
  <span>
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
      <v-subheader>Your Partner</v-subheader>

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
      <v-tab ripple> Set Vows </v-tab>
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
  data() {
    return {
      vows: '',
      vowRules: [v => !!v || 'vows must be non-empty value']
    }
  },
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
    }
  },
  methods: {
    ...mapActions([
      'updateVows',
      'acceptProposal',
      'rejectProposal',
      'setWeddingInProgressTabs'
    ]),
    clearVowsForm() {
      this.$refs['vows-form'].reset()
    },
    validateAndUpdateVows() {
      if (this.$refs['vows-form'].validate()) {
        this.updateVows(this.vows)
        this.clearVowsForm()
      }
    }
  }
}
</script>
