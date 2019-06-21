<template>
  <span>
    <component :is="fianceComponent" />
    <gift-messages />
  </span>
</template>
<script>
import { mapGetters } from 'vuex'
import FianceInProgress from '@/components/wedding/FianceInProgress'
import FianceMarried from '@/components/wedding/FianceMarried'
import GiftMessages from '@/components/wedding/GiftMessages'

export default {
  components: {
    GiftMessages
  },
  computed: {
    ...mapGetters(['userWeddingStage']),
    fianceComponent() {
      return this.userWeddingStage <= 2 ? FianceInProgress : FianceMarried
    }
  }
}
</script>
