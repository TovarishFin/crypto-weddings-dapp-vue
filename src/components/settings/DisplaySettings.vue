<template>
  <span>
    <v-switch v-model="useDarkModeModel" :label="useDarkModeMessage" />

    <v-switch v-model="showParticlesModel" :label="showParticlesMessage" />
  </span>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters(['showParticles', 'useDarkMode']),
    useDarkModeModel: {
      get() {
        return this.useDarkMode
      },
      set(useDarkMode) {
        this.setUseDarkMode(useDarkMode)
      }
    },
    useDarkModeMessage() {
      return this.useDarkMode ? 'use light mode' : 'use dark mode'
    },
    showParticlesModel: {
      get() {
        return this.showParticles
      },
      set(showParticles) {
        this.setShowParticles(showParticles)
      }
    },
    showParticlesMessage() {
      return this.showParticles
        ? 'show synthwave grid on home page'
        : 'show particles on home page'
    }
  },
  methods: {
    ...mapMutations(['setShowParticles', 'setUseDarkMode'])
  }
}
</script>
