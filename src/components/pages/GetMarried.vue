<template>
  <v-form
    @submit="validateAndStartWedding"
    ref="wedding-form"
    class="pt-4 pb-4"
  >
    <v-text-field
      v-model="name1"
      label="your name"
      :rules="nameRules"
      type="text"
      required
    />
    <v-text-field
      v-model="name2"
      label="partner name"
      :rules="nameRules"
      type="text"
      required
    />

    <qr-code-input
      v-model="partnerAddress"
      label="partner address"
      :rules="addressRules"
      type="text"
      required
    />

    <v-select
      v-model="weddingType"
      :items="weddingTypes"
      label="wedding type"
      required
    />
    <v-btn type="submit">
      create wedding
    </v-btn>
  </v-form>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { weddingTypeToEnum } from '@/utils/data'
import QrCodeInput from '@/components/QrCodeInput'

export default {
  data() {
    return {
      name1: '',
      name2: '',
      partnerAddress: '',
      weddingTypes: [
        'OtherAndOther',
        'Traditional',
        'ManAndMan',
        'WomanAndWoman',
        'ManAndOther',
        'WomanAndOther'
      ],
      weddingType: '',
      nameRules: [v => !!v || 'name must be non-empty value'],
      addressRules: [v => this.isAddress(v) || 'must be a valid address']
    }
  },
  components: {
    QrCodeInput
  },
  computed: {
    ...mapGetters(['address'])
  },
  methods: {
    ...mapActions(['setPendingTransaction']),
    clearWeddingForm() {
      this.$refs['wedding-form'].reset()
    },
    validateAndStartWedding(e) {
      e.preventDefault()
      if (this.$refs['wedding-form'].validate()) {
        this.setPendingTransaction({
          action: 'startWedding',
          payload: {
            name1: this.name1,
            name2: this.name2,
            partner2: this.partnerAddress,
            weddingType: weddingTypeToEnum[this.weddingType]
          },
          description: 'start a wedding on the blockchain'
        })
        this.clearWeddingForm()
      }
    }
  }
}
</script>
