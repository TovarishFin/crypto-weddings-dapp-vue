<template>
  <v-text-field
    v-if="recognition"
    :error="error"
    :error-messages="errorMessages"
    :value="result"
    :loading="inProgress"
    :prepend-icon="inputIcon"
    @click:prepend="inputAction"
    label="voice results"
    readonly
  />
</template>
<script>
export default {
  data() {
    return {
      recognition: null,
      error: false,
      errorMessages: [],
      inProgress: false,
      result: ''
    }
  },
  props: {
    matches: {
      required: true,
      type: Object
    }
  },
  computed: {
    inputIcon() {
      return this.inProgress ? 'mdi-microphone-off' : 'mdi-microphone'
    },
    inputAction() {
      return this.inProgress ? this.stopListening : this.listen
    }
  },
  mounted() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    this.recognition = SpeechRecognition ? new SpeechRecognition() : null
  },
  methods: {
    setError() {
      this.error = true
      this.errorMessages = ['Please repeat that more clearly']
    },
    clearError() {
      this.error = false
      this.errorMessages = []
    },
    handleStart() {
      this.inProgress = true
    },
    handleEnd() {
      this.inProgress = false

      if (this.error) {
        return this.listen()
      }
    },
    handleResult(e) {
      const result = e.results[0][0]
      this.result = result.transcript.toLowerCase()
      if (result.confidence < 0.8) {
        return this.setError()
      }

      const executeFunction = this.matches[this.result]
      if (executeFunction) {
        executeFunction()
      }

      this.clearError()
    },
    listen() {
      if (this.inProgress) return

      this.recognition.onresult = e => this.handleResult(e)
      this.recognition.onstart = () => this.handleStart()
      this.recognition.onend = () => this.handleEnd()

      this.recognition.start()
    },
    stopListening() {
      this.recognition.stop()
    }
  }
}
</script>
