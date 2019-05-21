<template>
  <component :is="page" />
</template>

<script>
import { mapGetters } from 'vuex'
import NoWeb3 from './NoWeb3.vue'

/* eslint-disable vue/no-unused-components */
export default {
  components: {
    NoWeb3
  },
  computed: {
    ...mapGetters(['providerReady']),
    page() {
      return this.providerReady ? 'router-view' : NoWeb3
    }
  }
}
</script>
