import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import VuexPersistence from 'vuex-persist'
import network from './network'
import layout from './layout'
import route from './route'
import bank from './bank'
import rockPaperScissors from './rockPaperScissors'
import statistics from './statistics'
import contractEvents from './contractEvents'
import stateWatchers from './plugins/stateWatchers'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({
    rockPaperScissors: {
      coinbaseReferrer: state.rockPaperScissors.coinbaseReferrer,
      choiceCommits: state.rockPaperScissors.choiceCommits
    },
    layout: state.layout
  })
})

export default new Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    network,
    layout,
    route,
    bank,
    rockPaperScissors,
    statistics,
    contractEvents
  },
  plugins: [stateWatchers, vuexLocal.plugin]
})
