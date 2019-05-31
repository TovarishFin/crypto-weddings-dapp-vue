<template>
  <v-form ref="photo-form" class="pt-4 pb-4">
    <v-text-field
      v-model="photo"
      label="wedding photo"
      :rules="photoRules"
      type="text"
      required
    />
    <v-btn @click="validateAndUpdatePhoto">
      update photo
    </v-btn>
  </v-form>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      photo: '',
      photoRules: [v => !!v || 'photo must be non-empty value']
    }
  },
  methods: {
    ...mapActions(['updateWeddingPhoto']),
    clearPhotoForm() {
      this.$refs['photo-form'].reset()
    },
    validateAndUpdatePhoto() {
      if (this.$refs['photo-form'].validate()) {
        this.updateWeddingPhoto(this.photo)
        this.clearPhotoForm()
      }
    }
  }
}
</script>
