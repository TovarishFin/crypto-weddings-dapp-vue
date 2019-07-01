<template>
  <v-btn class="neon-border" flat color="accent">
    <span class="neon-text"><slot /></span>
  </v-btn>
</template>
<style lang="styl" scoped>
.neon-border
  border: 1px solid var(--v-accent-lighten2)
  border-radius: 5px
  box-shadow:
    0 0 2px var(--v-accent-lighten1),
    0 0 4px var(--v-accent-base),
    0 0 8px var(--v-accent-darken1),
    0 0 16px var(--v-accent-darken2),
    inset 0 0 2px var(--v-accent-lighten1),
    inset 0 0 4px var(--v-accent-base),
    inset 0 0 8px var(--v-accent-darken1)

.neon-text
  color: var(--v-accent-lighten2)
  text-shadow:
    0 0 1px var(--v-accent-lighten1),
    0 0 2px var(--v-accent-base),
    0 0 4px var(--v-accent-darken1),
    0 0 8px var(--v-accent-darken2)
</style>
