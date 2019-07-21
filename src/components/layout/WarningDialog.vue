<template>
  <v-dialog
    :fullscreen="$vuetify.breakpoint.xsOnly"
    v-model="warningDialogModel"
    width="500"
    persistent
    scrollable
    ref="confirm-dialog"
    style="z-index: 9999;"
  >
    <v-card>
      <v-card-title class="headline warning black--text" primary-title>
        Warning! Please Read!
      </v-card-title>

      <v-card-text>
        <component :is="warningComponent" />
      </v-card-text>

      <v-card-actions>
        <v-btn @click="setWarningDialogOpen(false)" color="secondary">
          I Understand
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import MnemonicWarning from '@/components/layout/warnings/MnemonicWarning'
import PrivacyWarning from '@/components/layout/warnings/PrivacyWarning'

export default {
  components: {
    MnemonicWarning,
    PrivacyWarning
  },
  computed: {
    ...mapGetters(['warningDialogOpen', 'warningComponent']),
    warningDialogModel: {
      get() {
        return this.warningDialogOpen
      },
      set(open) {
        this.setWarningDialogOpen(open)
      }
    }
  },
  methods: {
    ...mapMutations(['setWarningDialogOpen'])
  }
}
</script>
<style lang="styl" scoped>
.centered-img
  margin: auto
</style>
