<template>
  <span>
    <app-stats />
    <p class="display-4">Rock Paper Scissors Ethereum</p>
    <p class="headline">
      Possibly the most over-engineered rock paper scissors game in the world...
    </p>
    <v-tabs grow v-model="tabsIndex">
      <v-tab ripple> Deposit / Withdraw </v-tab>
      <v-tab ripple> Join </v-tab>
      <v-tab ripple> Create </v-tab>
      <v-tab-item> <bank /> </v-tab-item>
      <v-tab-item> <joinable-games /> </v-tab-item>
      <v-tab-item> <create-game /> </v-tab-item>
    </v-tabs>
  </span>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import JoinableGames from '../JoinableGames'
import CreateGame from '../CreateGame'
import Bank from './Bank'
import AppStats from '../AppStats'

export default {
  components: {
    AppStats,
    JoinableGames,
    CreateGame,
    Bank
  },
  computed: {
    ...mapGetters(['homeTabs']),
    tabsIndex: {
      get() {
        return this.homeTabs
      },
      set(index) {
        return this.setHomeTabs(index)
      }
    }
  },
  methods: {
    ...mapActions(['setHomeTabs'])
  }
}
</script>
