<template>
  <span @click="checkRequestAccess"><slot></slot></span>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['hasUnlockedAccount'])
  },
  methods: {
    ...mapActions(['setAccountRequestOpen']),
    checkRequestAccess() {
      if (!this.hasUnlockedAccount) {
        this.setAccountRequestOpen(true)
      }
    }
  }
}
</script>
