<template>
  <v-form @submit="validateAndUpdateVows" ref="vows-form" class="pt-4 pb-4">
    <v-text-field
      v-model="vows"
      label="your vows"
      :rules="vowRules"
      type="text"
      required
    />
    <v-btn flat class="secondary-neon-button" type="submit">
      set vows
    </v-btn>
  </v-form>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      vows: '',
      vowRules: [v => !!v || 'vows must be non-empty value']
    }
  },
  methods: {
    ...mapActions(['setPendingTransaction']),
    clearVowsForm() {
      this.$refs['vows-form'].reset()
    },
    validateAndUpdateVows(e) {
      e.preventDefault()
      if (this.$refs['vows-form'].validate()) {
        this.setPendingTransaction({
          action: 'updateVows',
          payload: this.vows,
          description: 'update your wedding vows'
        })
        this.clearVowsForm()
      }
    }
  }
}
</script>
