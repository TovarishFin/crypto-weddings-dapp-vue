<template>
  <v-form ref="vows-form" class="pt-4 pb-4">
    <v-text-field
      v-model="vows"
      label="your vows"
      :rules="vowRules"
      type="text"
      required
    />
    <v-btn @click="validateAndUpdateVows">
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
    ...mapActions(['updateVows']),
    clearVowsForm() {
      this.$refs['vows-form'].reset()
    },
    validateAndUpdateVows() {
      if (this.$refs['vows-form'].validate()) {
        this.updateVows(this.vows)
        this.clearVowsForm()
      }
    }
  }
}
</script>
