<template>
  <span @click="checkRequestAccess"><slot></slot></span>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['hasGrantedWeb3Access'])
  },
  methods: {
    ...mapActions(['setAccountRequestOpen']),
    checkRequestAccess() {
      if (!this.hasGrantedWeb3Access) {
        this.setAccountRequestOpen(true)
      }
    }
  }
}
</script>
