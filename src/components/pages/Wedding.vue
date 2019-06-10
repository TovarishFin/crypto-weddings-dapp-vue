<template>
  <div class="padded-element">
    <component :is="weddingComponent" />
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import NoWedding from '@/components/wedding/NoWedding'
import GeneralWedding from '@/components/wedding/GeneralWedding'
import FianceWedding from '@/components/wedding/FianceWedding'

export default {
  computed: {
    ...mapGetters(['weddingCursor', 'weddingAddressOfUser', 'weddingExists']),
    currentWeddingExists() {
      return this.weddingExists(this.$route.params.address)
    },
    weddingComponent() {
      switch (true) {
        case this.weddingCursor === this.weddingAddressOfUser:
          return FianceWedding
        case this.currentWeddingExists:
          return GeneralWedding
        default:
          return NoWedding
      }
    }
  },
  methods: {
    ...mapActions(['getWeddingExists']),
    ...mapMutations(['setWeddingCursor'])
  },
  beforeRouteEnter(to, _, next) {
    const { address } = to.params

    next(vm => {
      if (vm.isAddress(address)) {
        vm.setWeddingCursor(address)
      }
    })
  },
  beforeRouteUpdate(to, _, next) {
    const { address } = to.params

    next(vm => {
      if (vm.isAddress(address)) {
        vm.setWeddingCursor(address)
      }
    })
  }
}
</script>
