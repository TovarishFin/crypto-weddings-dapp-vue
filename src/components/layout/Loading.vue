<template>
  <div class="loading-container">
    <div class="loading">
      <v-progress-circular
        indeterminate
        color="accent"
        :size="100"
        :width="10"
      />
      <p class="display-1 text-uppercase pa-5">Loading</p>
    </div>
  </div>
</template>
<style lang="styl" scoped>
@import '~vuetify/src/stylus/settings/_variables'
.loading-container
  height: "calc(100vh - %s)" % ($toolbar-height + $footer-height)
  width: 100%

.loading
  text-align: center
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
</style>
