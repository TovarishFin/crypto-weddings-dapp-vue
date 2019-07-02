<template>
  <span>
    <v-text-field
      :prepend-icon="inputIcon"
      @click:prepend="inputIconAction"
      :label="label"
      :rules="rules"
      :type="type"
      :required="required"
      :value="value"
      @input="handleInput"
    />

    <v-dialog v-model="showQrCodeReader" width="500" persistent>
      <v-card>
        <v-card-title class="headline primary" primary-title>
          Scan QR Code
        </v-card-title>
        <v-card-text v-show="ready">
          <qrcode-stream
            v-if="showQrCodeReader"
            :camera="camera"
            @decode="handleDecode"
            @init="handleInit"
          />
        </v-card-text>
        <v-card-text v-show="!ready">
          <p>
            please accept the camera permissions pretty please with a cherry on
            top...
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn flat class="secondary-neon-button" @click="closeQrCodeScanner">
            cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>
<script>
// eslint-disable-next-line import/named
import { QrcodeStream } from 'vue-qrcode-reader'

export default {
  components: {
    QrcodeStream
  },
  data() {
    return {
      ready: false,
      camera: 'auto',
      showQrCodeReader: false
    }
  },
  props: {
    label: {
      type: String,
      required: false
    },
    rules: {
      type: Array,
      required: false
    },
    type: {
      type: String,
      required: false
    },
    required: {
      type: Boolean,
      required: false
    },
    value: String
  },
  computed: {
    inputIcon() {
      return this.showQrCodeReader ? 'mdi-cancel' : 'mdi-qrcode-scan'
    },
    inputIconAction() {
      return this.showQrCodeReader
        ? this.closeQrCodeScanner
        : this.openQrCodeScanner
    }
  },
  methods: {
    handleInput(input) {
      this.$emit('input', input)
    },
    openQrCodeScanner() {
      this.camera = 'auto'
      this.showQrCodeReader = true
    },
    handleDecode(value) {
      this.$emit('input', value)
      this.showQrCodeReader = false
      this.camera = 'off'
      this.ready = false
    },
    async handleInit(promise) {
      try {
        await promise
        this.ready = true
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
      }
    },
    closeQrCodeScanner() {
      this.showQrCodeReader = false
      this.ready = false
    }
  }
}
</script>
