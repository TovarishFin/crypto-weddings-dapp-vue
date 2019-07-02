<template>
  <span>
    <v-btn flat class="primary-neon-button" @click="checkAndAcceptProposal">
      accept
    </v-btn>
    <v-btn flat class="secondary-neon-button" @click="checkAndRejectProposal">
      reject
    </v-btn>

    <br />

    <voice-input :matches="matches" />
  </span>
</template>
<script>
import { mapActions } from 'vuex'
import VoiceInput from '@/components/VoiceInput'

export default {
  components: {
    VoiceInput
  },
  data() {
    return {
      matches: {
        'i do': this.checkAndAcceptProposal,
        'i do not': this.checkAndRejectProposal
      }
    }
  },
  methods: {
    ...mapActions(['setPendingTransaction']),
    checkAndAcceptProposal() {
      this.setPendingTransaction({
        action: 'acceptProposal',
        description: 'Say yes to getting married!'
      })
    },
    checkAndRejectProposal() {
      this.setPendingTransaction({
        action: 'rejectProposal',
        description: 'Say no to getting married!'
      })
    }
  }
}
</script>
