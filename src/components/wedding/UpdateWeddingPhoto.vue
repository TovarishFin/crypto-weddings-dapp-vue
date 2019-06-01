<template>
  <v-form @submit="validateAndUpdatePhoto" ref="photo-form" class="pt-4 pb-4">
    <v-text-field
      v-model="photo"
      label="wedding photo"
      :rules="photoRules"
      type="text"
      required
    />
    <v-btn type="submit">
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
    ...mapActions(['setPendingTransaction']),
    clearPhotoForm() {
      this.$refs['photo-form'].reset()
    },
    validateAndUpdatePhoto(e) {
      e.preventDefault()
      if (this.$refs['photo-form'].validate()) {
        this.setPendingTransaction({
          action: 'updateWeddingPhoto',
          payload: this.photo,
          description: 'update your wedding photo on the blockchain'
        })
        this.clearPhotoForm()
      }
    }
  }
}
</script>
