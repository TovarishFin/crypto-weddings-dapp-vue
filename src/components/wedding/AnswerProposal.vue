<template>
  <span>
    <v-btn @click="acceptProposal">
      accept
    </v-btn>
    <v-btn @click="rejectProposal">
      reject
    </v-btn>
  </span>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['acceptProposal', 'rejectProposal'])
  }
}
</script>
