<template>
  <span>
    <component :is="fianceComponent" />
  </span>
</template>
<script>
import { mapGetters } from 'vuex'
import FianceInProgress from '@/components/wedding/FianceInProgress'
import FianceMarried from '@/components/wedding/FianceMarried'

export default {
  computed: {
    ...mapGetters(['userWeddingStage']),
    fianceComponent() {
      return this.userWeddingStage <= 2 ? FianceInProgress : FianceMarried
    }
  }
}
</script>
