<template>
  <v-btn class="neon-border" flat color="primary">
    <span class="neon-text"><slot /></span>
  </v-btn>
</template>
<style lang="styl" scoped>
.neon-border
  border: 1px solid var(--v-primary-lighten2)
  border-radius: 5px
  box-shadow:
    0 0 2px var(--v-primary-lighten1),
    0 0 4px var(--v-primary-base),
    0 0 8px var(--v-primary-darken1),
    0 0 16px var(--v-primary-darken2),
    inset 0 0 2px var(--v-primary-lighten1),
    inset 0 0 4px var(--v-primary-base),
    inset 0 0 8px var(--v-primary-darken1)

.neon-text
  color: var(--v-primary-lighten2)
  text-shadow:
    0 0 1px var(--v-primary-lighten1),
    0 0 2px var(--v-primary-base),
    0 0 4px var(--v-primary-darken1),
    0 0 8px var(--v-primary-darken2)
</style>
